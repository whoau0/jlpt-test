/**
 * JLPT Kanji Master App Core Logic
 */

class KanjiApp {
  constructor() {
    this.currentLevel = 'N5';
    this.kanjiList = [...JLPT_N5_KANJI];
    this.currentTab = 'flashcard';
    
    // User progress state (Persisted in localStorage)
    this.learned = new Set(JSON.parse(localStorage.getItem('jlpt_learned') || '[]'));
    this.wrongMap = JSON.parse(localStorage.getItem('jlpt_wrong') || '{}'); // { kanjiId: count }
    this.stats = JSON.parse(localStorage.getItem('jlpt_stats') || JSON.stringify({
      totalSolved: 0,
      correctCount: 0,
      streak: 0,
      maxStreak: 0
    }));

    // Flashcard state
    this.fcIndex = 0;
    this.fcList = [...this.kanjiList];

    // Quiz state (Choice)
    this.quizCurrent = null;
    this.quizAnswered = false;

    // Blank Quiz state
    this.blankCurrent = null;
    this.blankAnswered = false;

    // Weakness mode state
    this.isWeaknessMode = false;
    this.weaknessList = [];
    this.weaknessIndex = 0;

    this.initDOM();
    this.bindEvents();
    this.updateStatsUI();
    this.renderCurrentView();
  }

  saveStorage() {
    localStorage.setItem('jlpt_learned', JSON.stringify([...this.learned]));
    localStorage.setItem('jlpt_wrong', JSON.stringify(this.wrongMap));
    localStorage.setItem('jlpt_stats', JSON.stringify(this.stats));

    // Supabase 자동 동기화 (연결된 경우 백그라운드 자동 업로드)
    if (window.supabaseSync && window.supabaseSync.isConnected && window.supabaseSync.config.autoSync) {
      window.supabaseSync.uploadRecord({
        learned: this.learned,
        wrongMap: this.wrongMap,
        stats: this.stats
      });
    }
  }

  initDOM() {
    // Top Stats Elements
    this.elLearnedCount = document.getElementById('statLearnedCount');
    this.elAccuracy = document.getElementById('statAccuracy');
    this.elStreak = document.getElementById('statStreak');
    this.elWrongBadge = document.getElementById('statWrongBadge');
    this.elWrongNavDot = document.getElementById('wrongNavDot');

    // Navigation & Grade
    this.gradePills = document.querySelectorAll('.grade-pill');
    this.navItems = document.querySelectorAll('.nav-item');
    this.viewPanels = document.querySelectorAll('.view-panel');

    // Flashcard Elements
    this.fcCard = document.getElementById('flashcard');
    this.fcKanji = document.getElementById('fcKanji');
    this.fcStrokes = document.getElementById('fcStrokes');
    this.fcCategory = document.getElementById('fcCategory');
    this.fcMeaning = document.getElementById('fcMeaning');
    this.fcSound = document.getElementById('fcSound');
    this.fcKunyomi = document.getElementById('fcKunyomi');
    this.fcOnyomi = document.getElementById('fcOnyomi');
    this.fcTip = document.getElementById('fcTip');
    this.fcExamples = document.getElementById('fcExamples');
    this.fcCurrentIdx = document.getElementById('fcCurrentIdx');
    this.fcTotalCount = document.getElementById('fcTotalCount');

    // Choice Quiz Elements
    this.quizTypeBadge = document.getElementById('quizTypeBadge');
    this.quizQuestionTitle = document.getElementById('quizQuestionTitle');
    this.quizTargetKanji = document.getElementById('quizTargetKanji');
    this.quizSubCue = document.getElementById('quizSubCue');
    this.quizOptionsWrap = document.getElementById('quizOptionsWrap');
    this.quizFeedback = document.getElementById('quizFeedback');
    this.btnNextQuiz = document.getElementById('btnNextQuiz');

    // Blank Quiz Elements
    this.blankTypeBadge = document.getElementById('blankTypeBadge');
    this.blankTargetKanji = document.getElementById('blankTargetKanji');
    this.blankCue = document.getElementById('blankCue');
    this.blankInput = document.getElementById('blankInput');
    this.blankQuickChars = document.getElementById('blankQuickChars');
    this.blankFeedback = document.getElementById('blankFeedback');
    this.btnNextBlank = document.getElementById('btnNextBlank');

    // Wrong Notebook Elements
    this.wrongTotalCount = document.getElementById('wrongTotalCount');
    this.wrongListWrap = document.getElementById('wrongListWrap');

    // Dictionary Elements
    this.kanjiGrid = document.getElementById('kanjiGrid');
    this.dictSearchInput = document.getElementById('dictSearchInput');
    this.filterChips = document.querySelectorAll('.filter-chip');

    // Modal Elements
    this.modalOverlay = document.getElementById('detailModalOverlay');
    this.modalContent = document.getElementById('modalContent');
  }

  bindEvents() {
    // Navigation Tabs
    this.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Grade Switch
    this.gradePills.forEach(pill => {
      pill.addEventListener('click', () => {
        const level = pill.dataset.level;
        this.switchLevel(level);
      });
    });

    // Sound and Theme toggles
    document.getElementById('btnToggleTheme').addEventListener('click', () => this.toggleTheme());
    document.getElementById('btnToggleSound').addEventListener('click', (e) => this.toggleSound(e.currentTarget));
    
    // Flashcard Big Kanji Voice Play
    document.getElementById('btnSpeakCard').addEventListener('click', (e) => {
      e.stopPropagation();
      const k = this.fcList[this.fcIndex];
      if (k) this.playVoiceWithEffect(k.kanji, e.currentTarget);
    });

    // 훈독(뜻으로 읽기) AI 음성 재생
    const speakKunHandler = (e) => {
      e.stopPropagation();
      const k = this.fcList[this.fcIndex];
      if (k && k.kunyomi) {
        const btn = document.getElementById('btnSpeakKun');
        this.playVoiceWithEffect(k.kunyomi, btn);
      }
    };
    document.getElementById('rowFcKun').addEventListener('click', speakKunHandler);
    document.getElementById('btnSpeakKun').addEventListener('click', speakKunHandler);

    // 음독(소리로 읽기) AI 음성 재생
    const speakOnHandler = (e) => {
      e.stopPropagation();
      const k = this.fcList[this.fcIndex];
      if (k && k.onyomi) {
        const btn = document.getElementById('btnSpeakOn');
        this.playVoiceWithEffect(k.onyomi, btn);
      }
    };
    document.getElementById('rowFcOn').addEventListener('click', speakOnHandler);
    document.getElementById('btnSpeakOn').addEventListener('click', speakOnHandler);

    // Flashcard Front Click -> Flip to Back
    const fcFront = document.querySelector('.card-front');
    if (fcFront) {
      fcFront.addEventListener('click', (e) => {
        // 소리 버튼 클릭 시에는 뒤집지 않음
        if (e.target.closest('#btnSpeakCard')) return;
        this.fcCard.classList.add('is-flipped');
        window.soundEngine.playFlip();
      });
    }

    // Flashcard Back -> 앞면으로 뒤집기 핸들러
    const flipBackToFront = (e) => {
      if (e) e.stopPropagation();
      this.fcCard.classList.remove('is-flipped');
      window.soundEngine.playFlip();
    };

    document.getElementById('btnFlipBack')?.addEventListener('click', flipBackToFront);
    document.getElementById('btnFlipBackBottom')?.addEventListener('click', flipBackToFront);

    // 카드 뒷면 내부 클릭 시에는 카드 뒤집힘 방지 (버블링 차단)
    const fcBack = document.querySelector('.card-back');
    if (fcBack) {
      fcBack.addEventListener('click', (e) => {
        // 어휘나 텍스트를 누를 때 카드가 멋대로 뒤집히지 않도록 전파 차단
        e.stopPropagation();
      });
    }

    document.getElementById('btnFcAgain')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.onFlashcardAnswer(false);
    });

    document.getElementById('btnFcKnow')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.onFlashcardAnswer(true);
    });

    // Choice Quiz Actions
    this.btnNextQuiz?.addEventListener('click', () => this.generateChoiceQuiz());

    // Blank Quiz Actions
    document.getElementById('blankQuizForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.checkBlankAnswer();
    });

    this.btnNextBlank?.addEventListener('click', () => this.generateBlankQuiz());

    // Wrong Notebook Actions
    document.getElementById('btnPracticeWrong')?.addEventListener('click', () => {
      this.startWeaknessPractice();
    });

    document.getElementById('btnClearWrong')?.addEventListener('click', () => {
      if (confirm('오답 목록을 모두 초기화하시겠습니까?')) {
        this.wrongMap = {};
        this.saveStorage();
        this.updateStatsUI();
        this.renderWrongNotebook();
      }
    });

    // Dictionary Search & Filters
    this.dictSearchInput?.addEventListener('input', (e) => {
      this.renderDictionary(e.target.value.trim());
    });

    this.filterChips?.forEach(chip => {
      chip.addEventListener('click', () => {
        this.filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.renderDictionary(this.dictSearchInput.value.trim());
      });
    });

    // Modal Close (이벤트 위임 방식으로 안전하게 처리)
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target.closest('.btn-close-modal') || e.target === this.modalOverlay) {
          this.modalOverlay.classList.remove('open');
        }
      });
    }

    // Supabase Cloud Modal Bindings
    this.bindCloudModal();
  }

  bindCloudModal() {
    const cloudModal = document.getElementById('cloudModalOverlay');
    const btnOpen = document.getElementById('btnOpenCloudModal');
    const btnClose = document.getElementById('btnCloseCloudModal');
    const btnSave = document.getElementById('btnSaveCloudConfig');
    const btnUpload = document.getElementById('btnCloudUpload');
    const btnDownload = document.getElementById('btnCloudDownload');

    const urlInput = document.getElementById('supabaseUrlInput');
    const keyInput = document.getElementById('supabaseKeyInput');
    const userInput = document.getElementById('supabaseUserInput');
    const statusText = document.getElementById('cloudStatusText');
    const statusDot = document.getElementById('cloudStatusDot');

    const updateStatusUI = () => {
      const sync = window.supabaseSync;
      if (sync && sync.isConnected) {
        statusText.textContent = '클라우드 연결 완료 (동기화 활성)';
        statusText.style.color = 'var(--success)';
        statusDot.style.background = 'var(--success)';
      } else {
        statusText.textContent = '로컬 모드 (미연결)';
        statusText.style.color = 'var(--text-sub)';
        statusDot.style.background = '#94a3b8';
      }
    };

    if (btnOpen) {
      btnOpen.addEventListener('click', () => {
        const sync = window.supabaseSync;
        if (sync && sync.config) {
          urlInput.value = sync.config.url || '';
          keyInput.value = sync.config.key || '';
          userInput.value = sync.config.userId || 'whoau0';
        }
        updateStatusUI();
        cloudModal.classList.add('open');
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', () => cloudModal.classList.remove('open'));
    }

    if (cloudModal) {
      cloudModal.addEventListener('click', (e) => {
        if (e.target === cloudModal) cloudModal.classList.remove('open');
      });
    }

    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const url = urlInput.value.trim();
        const key = keyInput.value.trim();
        const userId = userInput.value.trim() || 'whoau0';

        if (!url || !key) {
          alert('Supabase URL과 Anon Public Key를 모두 입력해 주세요.');
          return;
        }

        const success = window.supabaseSync.saveConfig(url, key, userId, true);
        if (success) {
          alert('✅ Supabase 연결 설정이 완료되었습니다!');
          updateStatusUI();
        } else {
          alert('⚠️ 연결 설정에 실패했습니다. URL과 Key를 확인해 주세요.');
        }
      });
    }

    if (btnUpload) {
      btnUpload.addEventListener('click', async () => {
        btnUpload.disabled = true;
        btnUpload.textContent = '업로드 중...';
        const res = await window.supabaseSync.uploadRecord({
          learned: this.learned,
          wrongMap: this.wrongMap,
          stats: this.stats
        });
        alert(res.message);
        btnUpload.disabled = false;
        btnUpload.textContent = '⬆️ 클라우드에 백업';
      });
    }

    if (btnDownload) {
      btnDownload.addEventListener('click', async () => {
        if (!confirm('클라우드 기록을 불러오시겠습니까? 현재 기기의 데이터가 클라우드 기록으로 갱신됩니다.')) return;
        btnDownload.disabled = true;
        btnDownload.textContent = '다운로드 중...';
        const res = await window.supabaseSync.downloadRecord();
        if (res.success && res.data) {
          this.learned = new Set(res.data.learned || []);
          this.wrongMap = res.data.wrongMap || {};
          this.stats = res.data.stats || this.stats;
          this.saveStorage();
          this.updateStatsUI();
          this.renderCurrentView();
          alert(`✅ 클라우드 기록 복원 완료! (마지막 저장: ${new Date(res.updatedAt).toLocaleString()})`);
          cloudModal.classList.remove('open');
        } else {
          alert(res.message);
        }
        btnDownload.disabled = false;
        btnDownload.textContent = '⬇️ 클라우드에서 복원';
      });
    }
  }

  switchTab(tab) {
    this.currentTab = tab;
    this.navItems.forEach(n => {
      n.classList.toggle('active', n.dataset.tab === tab);
    });
    this.viewPanels.forEach(p => {
      p.classList.toggle('active', p.id === `view-${tab}`);
    });
    this.renderCurrentView();
  }

  switchLevel(level) {
    this.currentLevel = level;
    this.gradePills.forEach(p => p.classList.toggle('active', p.dataset.level === level));
    
    if (level === 'N5') {
      this.kanjiList = [...JLPT_N5_KANJI];
    } else if (JLPT_OTHER_LEVELS[level]) {
      this.kanjiList = [...JLPT_OTHER_LEVELS[level].sampleKanji];
    }
    
    this.fcList = [...this.kanjiList];
    this.fcIndex = 0;
    this.updateStatsUI();
    this.renderCurrentView();
  }

  toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('jlpt_theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('jlpt_theme', 'dark');
    }
  }

  toggleSound(btn) {
    window.soundEngine.soundEnabled = !window.soundEngine.soundEnabled;
    btn.classList.toggle('active', window.soundEngine.soundEnabled);
  }

  updateStatsUI() {
    const total = this.kanjiList.length;
    let learnedInLevel = 0;
    this.kanjiList.forEach(k => {
      if (this.learned.has(k.id)) learnedInLevel++;
    });

    this.elLearnedCount.textContent = `${learnedInLevel}/${total}`;
    
    const accuracy = this.stats.totalSolved > 0 
      ? Math.round((this.stats.correctCount / this.stats.totalSolved) * 100) 
      : 0;
    this.elAccuracy.textContent = `${accuracy}%`;
    this.elStreak.textContent = `${this.stats.streak}연속`;

    const wrongCount = Object.keys(this.wrongMap).length;
    this.elWrongBadge.textContent = `${wrongCount}개`;

    if (wrongCount > 0) {
      this.elWrongNavDot.style.display = 'block';
      this.elWrongNavDot.textContent = wrongCount;
    } else {
      this.elWrongNavDot.style.display = 'none';
    }
  }

  renderCurrentView() {
    if (this.currentTab === 'flashcard') {
      this.renderFlashcard();
    } else if (this.currentTab === 'quiz') {
      if (!this.quizCurrent) this.generateChoiceQuiz();
    } else if (this.currentTab === 'blank') {
      if (!this.blankCurrent) this.generateBlankQuiz();
    } else if (this.currentTab === 'wrong') {
      this.renderWrongNotebook();
    } else if (this.currentTab === 'dict') {
      this.renderDictionary();
    }
  }

  // ==========================================
  // 1. FLASHCARD LOGIC
  // ==========================================
  renderFlashcard() {
    if (this.fcList.length === 0) {
      this.fcKanji.textContent = "완료!";
      return;
    }
    const item = this.fcList[this.fcIndex];
    this.fcCard.classList.remove('is-flipped');

    this.fcKanji.textContent = item.kanji;
    this.fcStrokes.textContent = `${item.strokes}획 · ${item.radical}`;
    this.fcCategory.textContent = item.category || '기초';

    this.fcMeaning.textContent = item.meaning;
    this.fcSound.textContent = item.sound;
    this.fcKunyomi.textContent = item.kunyomi || '-';
    this.fcOnyomi.textContent = item.onyomi || '-';
    this.fcTip.textContent = item.tip || '한자의 모양과 뜻을 연결하여 외워보세요.';

    this.fcCurrentIdx.textContent = this.fcIndex + 1;
    this.fcTotalCount.textContent = this.fcList.length;

    // Examples render
    let exHtml = '';
    if (item.examples && item.examples.length > 0) {
      exHtml = item.examples.map(ex => `
        <div class="example-item" onclick="app.playExampleVoice(event, '${ex.word}', this.querySelector('.btn-example-play'))" title="단어 AI 음성 듣기">
          <strong>${ex.word} <span style="font-weight:normal;color:var(--text-sub);">(${ex.reading})</span></strong>
          <div style="display:flex;align-items:center;gap:6px;">
            <span>${ex.meaning}</span>
            <button type="button" class="btn-example-play" title="발음 듣기">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
            </button>
          </div>
        </div>
      `).join('');
    }
    this.fcExamples.innerHTML = exHtml;
  }

  // 실전 어휘 클릭 시 카드 뒤집힘 방지 및 음성 재생
  playExampleVoice(event, rawText, btnElement = null) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.playVoiceWithEffect(rawText, btnElement);
  }

  // AI 음성 재생 헬퍼 (버튼 파동 애니메이션 효과 포함)
  playVoiceWithEffect(rawText, btnElement = null) {
    if (!rawText) return;
    if (btnElement) {
      btnElement.classList.add('is-playing');
    }
    window.soundEngine.speak(rawText, () => {
      if (btnElement) {
        btnElement.classList.remove('is-playing');
      }
    });
  }

  onFlashcardAnswer(isKnown) {
    const item = this.fcList[this.fcIndex];
    if (isKnown) {
      this.learned.add(item.id);
      window.soundEngine.playCorrect();
    } else {
      this.wrongMap[item.id] = (this.wrongMap[item.id] || 0) + 1;
      window.soundEngine.playIncorrect();
    }
    this.saveStorage();
    this.updateStatsUI();

    // Next card
    this.fcIndex = (this.fcIndex + 1) % this.fcList.length;
    this.renderFlashcard();
  }

  // ==========================================
  // 2. 4지선다 객관식 퀴즈 (Choice Quiz)
  // ==========================================
  generateChoiceQuiz() {
    this.quizAnswered = false;
    this.quizFeedback.classList.remove('show', 'correct', 'incorrect');
    this.btnNextQuiz.style.display = 'none';

    // Pick a random kanji
    let pool = this.isWeaknessMode ? this.weaknessList : this.kanjiList;
    if (pool.length === 0) pool = this.kanjiList;
    
    const target = pool[Math.floor(Math.random() * pool.length)];
    this.quizCurrent = target;

    // Pick quiz subtype:
    // 0: 한자 -> 한국어 뜻/음
    // 1: 한자 -> 일본어 훈독(히라가나)
    // 2: 한자 -> 일본어 음독(가타카나)
    // 3: 뜻/독음 -> 한자 찾기 (역방향)
    const types = ['meaning', 'kunyomi', 'onyomi', 'reverse'];
    const selectedType = types[Math.floor(Math.random() * types.length)];

    let questionTitle = "";
    let mainDisplay = "";
    let subCue = "";
    let correctAnswer = "";
    let wrongOptions = [];

    if (selectedType === 'meaning') {
      this.quizTypeBadge.textContent = "뜻 · 음 맞히기";
      questionTitle = "다음 한자의 올바른 한국어 훈/음은?";
      mainDisplay = target.kanji;
      subCue = `(${target.strokes}획)`;
      correctAnswer = `${target.meaning} ${target.sound}`;

      const otherKanjis = this.kanjiList.filter(k => k.id !== target.id);
      this.shuffle(otherKanjis).slice(0, 3).forEach(k => {
        wrongOptions.push(`${k.meaning} ${k.sound}`);
      });

    } else if (selectedType === 'kunyomi') {
      this.quizTypeBadge.textContent = "훈독 (訓読み) 맞히기";
      questionTitle = "다음 한자의 훈독(뜻으로 읽기)은?";
      mainDisplay = target.kanji;
      subCue = `[${target.meaning} ${target.sound}]`;
      correctAnswer = target.kunyomi ? target.kunyomi.split(' ')[0] : '없음';

      const otherKanjis = this.kanjiList.filter(k => k.id !== target.id && k.kunyomi);
      this.shuffle(otherKanjis).slice(0, 3).forEach(k => {
        wrongOptions.push(k.kunyomi.split(' ')[0]);
      });

    } else if (selectedType === 'onyomi') {
      this.quizTypeBadge.textContent = "음독 (音読み) 맞히기";
      questionTitle = "다음 한자의 음독(소리로 읽기)은?";
      mainDisplay = target.kanji;
      subCue = `[${target.meaning} ${target.sound}]`;
      correctAnswer = target.onyomi ? target.onyomi.split(' ')[0] : '없음';

      const otherKanjis = this.kanjiList.filter(k => k.id !== target.id && k.onyomi);
      this.shuffle(otherKanjis).slice(0, 3).forEach(k => {
        wrongOptions.push(k.onyomi.split(' ')[0]);
      });

    } else {
      this.quizTypeBadge.textContent = "한자 찾기 (역방향)";
      questionTitle = "다음 뜻과 발음에 해당하는 한자는?";
      mainDisplay = `"${target.meaning} ${target.sound}"`;
      subCue = `훈: ${target.kunyomi || '-'} / 음: ${target.onyomi || '-'}`;
      correctAnswer = target.kanji;

      const otherKanjis = this.kanjiList.filter(k => k.id !== target.id);
      this.shuffle(otherKanjis).slice(0, 3).forEach(k => {
        wrongOptions.push(k.kanji);
      });
    }

    this.quizQuestionTitle.textContent = questionTitle;
    this.quizTargetKanji.textContent = mainDisplay;
    this.quizSubCue.textContent = subCue;

    const allOptions = this.shuffle([correctAnswer, ...wrongOptions]);
    this.quizOptionsWrap.innerHTML = '';

    allOptions.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span>${opt}</span><span class="icon-indicator"></span>`;
      btn.addEventListener('click', () => this.handleChoiceAnswer(btn, opt === correctAnswer, target, correctAnswer));
      this.quizOptionsWrap.appendChild(btn);
    });
  }

  handleChoiceAnswer(selectedBtn, isCorrect, kanjiObj, correctAnswerText) {
    if (this.quizAnswered) return;
    this.quizAnswered = true;

    this.stats.totalSolved++;
    if (isCorrect) {
      this.stats.correctCount++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.maxStreak) this.stats.maxStreak = this.stats.streak;
      this.learned.add(kanjiObj.id);

      if (this.wrongMap[kanjiObj.id]) {
        this.wrongMap[kanjiObj.id]--;
        if (this.wrongMap[kanjiObj.id] <= 0) delete this.wrongMap[kanjiObj.id];
      }

      selectedBtn.classList.add('correct');
      window.soundEngine.playCorrect();
      this.showQuizFeedback(true, kanjiObj);
      if (this.stats.streak % 5 === 0) this.triggerConfetti();
    } else {
      this.stats.streak = 0;
      this.wrongMap[kanjiObj.id] = (this.wrongMap[kanjiObj.id] || 0) + 1;
      selectedBtn.classList.add('incorrect');

      // Highlight the right answer
      const allBtns = this.quizOptionsWrap.querySelectorAll('.option-btn');
      allBtns.forEach(b => {
        if (b.textContent.trim().startsWith(correctAnswerText)) {
          b.classList.add('correct');
        }
      });

      window.soundEngine.playIncorrect();
      this.showQuizFeedback(false, kanjiObj);
    }

    this.saveStorage();
    this.updateStatsUI();
    this.btnNextQuiz.style.display = 'flex';
  }

  showQuizFeedback(isCorrect, kanjiObj) {
    this.quizFeedback.className = `quiz-feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
    const title = isCorrect ? '🎉 정답입니다!' : '💡 아쉽네요! 다시 기억해봐요';
    
    const kunClean = kanjiObj.kunyomi || '';
    const onClean = kanjiObj.onyomi || '';

    this.quizFeedback.innerHTML = `
      <div class="feedback-title">${title}</div>
      <div class="feedback-detail">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <span style="font-size:1.1rem;"><strong>${kanjiObj.kanji}</strong>: [${kanjiObj.meaning} ${kanjiObj.sound}]</span>
          <button onclick="app.playVoiceWithEffect('${kanjiObj.kanji}', this)" class="btn-voice-play" style="width:28px;height:28px;" title="한자 소리">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
          </button>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.03);padding:4px 8px;border-radius:6px;">
            <span>훈독 (뜻): <b>${kanjiObj.kunyomi || '-'}</b></span>
            ${kunClean ? `<button onclick="app.playVoiceWithEffect('${kunClean}', this)" style="border:none;background:none;color:var(--primary);cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:3px;">🔊 듣기</button>` : ''}
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.03);padding:4px 8px;border-radius:6px;">
            <span>음독 (소리): <b>${kanjiObj.onyomi || '-'}</b></span>
            ${onClean ? `<button onclick="app.playVoiceWithEffect('${onClean}', this)" style="border:none;background:none;color:var(--primary);cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:3px;">🔊 듣기</button>` : ''}
          </div>
        </div>
        <div style="margin-top:6px;color:var(--text-sub);font-size:0.82rem;">${kanjiObj.tip || ''}</div>
      </div>
    `;
    window.soundEngine.speak(kanjiObj.kanji);
  }

  // ==========================================
  // 3. 주관식 빈칸 퀴즈 (Blank Quiz)
  // ==========================================
  generateBlankQuiz() {
    this.blankAnswered = false;
    this.blankInput.value = '';
    this.blankInput.disabled = false;
    this.blankFeedback.classList.remove('show', 'correct', 'incorrect');
    this.btnNextBlank.style.display = 'none';

    let pool = this.isWeaknessMode ? this.weaknessList : this.kanjiList;
    if (pool.length === 0) pool = this.kanjiList;
    const target = pool[Math.floor(Math.random() * pool.length)];
    this.blankCurrent = target;

    // Modes:
    // 0: 의미 빈칸 (예: [日] -> 뜻: [  ], 음: 일)
    // 1: 훈독 빈칸 (예: [水] -> 훈독: [  ])
    // 2: 음독 빈칸 (예: [学] -> 음독: [  ])
    const mode = Math.floor(Math.random() * 3);
    this.blankMode = mode;

    this.blankTargetKanji.textContent = target.kanji;
    let expectedAnswer = '';
    let cueText = '';

    if (mode === 0) {
      this.blankTypeBadge.textContent = "의미(뜻) 빈칸 채우기";
      cueText = `한국어 뜻을 적어주세요 (음: ${target.sound})`;
      expectedAnswer = target.meaning;
      this.blankInput.placeholder = "예: " + target.meaning.slice(0, 1) + "...";
    } else if (mode === 1) {
      this.blankTypeBadge.textContent = "훈독(히라가나) 빈칸 채우기";
      cueText = `[${target.meaning} ${target.sound}]의 훈독을 적어주세요`;
      const cleanKun = target.kunyomi.split(' ')[0].replace(/・/g, '');
      expectedAnswer = cleanKun;
      this.blankInput.placeholder = "히라가나로 입력 (예: " + cleanKun.slice(0, 1) + "...)";
    } else {
      this.blankTypeBadge.textContent = "음독(발음) 빈칸 채우기";
      cueText = `[${target.meaning} ${target.sound}]의 음독을 적어주세요`;
      const cleanOn = target.onyomi.split(' ')[0].replace(/,/g, '');
      expectedAnswer = cleanOn;
      this.blankInput.placeholder = "가타카나/한글 입력";
    }

    this.blankCue.textContent = cueText;
    this.blankExpected = expectedAnswer;

    // Fast character chips (Hint)
    this.renderQuickChars(expectedAnswer);
    this.blankInput.focus();
  }

  renderQuickChars(answer) {
    this.blankQuickChars.innerHTML = '';
    const chars = answer.split('').filter(c => c.trim().length > 0);
    const distractors = ['か', 'し', 'た', 'ま', 'み', 'ん', 'つ', 'い'];
    const mixed = this.shuffle([...new Set([...chars, ...distractors])]).slice(0, 8);

    mixed.forEach(ch => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'char-chip';
      chip.textContent = ch;
      chip.addEventListener('click', () => {
        if (!this.blankAnswered) {
          this.blankInput.value += ch;
          this.blankInput.focus();
        }
      });
      this.blankQuickChars.appendChild(chip);
    });
  }

  checkBlankAnswer() {
    if (this.blankAnswered) return;
    const userInput = this.blankInput.value.trim().toLowerCase().replace(/\s+/g, '');
    const cleanExpected = this.blankExpected.trim().toLowerCase().replace(/[\s・,]/g, '');

    // Allow relaxed matching (e.g. for meaning, check if included)
    let isCorrect = false;
    if (userInput === cleanExpected) {
      isCorrect = true;
    } else if (this.blankMode === 0 && cleanExpected.includes(userInput) && userInput.length >= 1) {
      isCorrect = true;
    }

    this.blankAnswered = true;
    this.blankInput.disabled = true;
    this.stats.totalSolved++;

    const target = this.blankCurrent;
    if (isCorrect) {
      this.stats.correctCount++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.maxStreak) this.stats.maxStreak = this.stats.streak;
      this.learned.add(target.id);
      if (this.wrongMap[target.id]) {
        this.wrongMap[target.id]--;
        if (this.wrongMap[target.id] <= 0) delete this.wrongMap[target.id];
      }
      window.soundEngine.playCorrect();
      this.showBlankFeedback(true, target, cleanExpected);
    } else {
      this.stats.streak = 0;
      this.wrongMap[target.id] = (this.wrongMap[target.id] || 0) + 1;
      window.soundEngine.playIncorrect();
      this.showBlankFeedback(false, target, cleanExpected);
    }

    this.saveStorage();
    this.updateStatsUI();
    this.btnNextBlank.style.display = 'flex';
  }

  showBlankFeedback(isCorrect, target, correctText) {
    this.blankFeedback.className = `quiz-feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
    const title = isCorrect ? '🎉 정확합니다!' : '💡 정답을 확인하세요!';
    const kunClean = target.kunyomi || '';
    const onClean = target.onyomi || '';

    this.blankFeedback.innerHTML = `
      <div class="feedback-title">${title}</div>
      <div class="feedback-detail">
        <div style="font-size:1.05rem;margin-bottom:6px;">정답: <b style="color:var(--primary);">${correctText}</b></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
          <span>한자: <strong>${target.kanji}</strong> [${target.meaning} ${target.sound}]</span>
          <button onclick="app.playVoiceWithEffect('${target.kanji}', this)" class="btn-voice-play" style="width:28px;height:28px;" title="한자 소리">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
          </button>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.03);padding:4px 8px;border-radius:6px;">
            <span>훈독 (뜻): <b>${target.kunyomi || '-'}</b></span>
            ${kunClean ? `<button onclick="app.playVoiceWithEffect('${kunClean}', this)" style="border:none;background:none;color:var(--primary);cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:3px;">🔊 듣기</button>` : ''}
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.03);padding:4px 8px;border-radius:6px;">
            <span>음독 (소리): <b>${target.onyomi || '-'}</b></span>
            ${onClean ? `<button onclick="app.playVoiceWithEffect('${onClean}', this)" style="border:none;background:none;color:var(--primary);cursor:pointer;font-size:0.8rem;display:flex;align-items:center;gap:3px;">🔊 듣기</button>` : ''}
          </div>
        </div>
      </div>
    `;
    window.soundEngine.speak(target.kanji);
  }

  // ==========================================
  // 4. 오답노트 & 무한 반복 클리닉 (Weakness clinic)
  // ==========================================
  renderWrongNotebook() {
    const wrongIds = Object.keys(this.wrongMap);
    this.wrongTotalCount.textContent = wrongIds.length;

    if (wrongIds.length === 0) {
      this.wrongListWrap.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🏆</div>
          <h3>오답노트가 비어있습니다!</h3>
          <p style="margin-top:6px;font-size:0.88rem;">퀴즈나 플래시카드에서 틀린 한자가 이곳에 자동으로 수집됩니다.</p>
        </div>
      `;
      return;
    }

    let html = '';
    wrongIds.forEach(id => {
      const k = this.kanjiList.find(item => item.id == id);
      if (!k) return;
      const count = this.wrongMap[id];
      html += `
        <div class="wrong-item" onclick="app.openDetailModal(${k.id})">
          <div style="display:flex;align-items:center;">
            <div class="wrong-kanji">${k.kanji}</div>
            <div class="wrong-info">
              <div class="wrong-meaning">${k.meaning} ${k.sound}</div>
              <div class="wrong-reading">훈: ${k.kunyomi || '-'} / 음: ${k.onyomi || '-'}</div>
            </div>
          </div>
          <div class="wrong-retry-chip">${count}회 오답</div>
        </div>
      `;
    });
    this.wrongListWrap.innerHTML = html;
  }

  startWeaknessPractice() {
    const wrongIds = Object.keys(this.wrongMap);
    if (wrongIds.length === 0) {
      alert('오답노트에 수집된 한자가 없습니다. 퀴즈를 먼저 풀어보세요!');
      return;
    }
    this.isWeaknessMode = true;
    this.weaknessList = this.kanjiList.filter(k => this.wrongMap[k.id]);
    alert(`오답노트에 있는 ${this.weaknessList.length}개 한자를 집중 반복합니다!`);
    this.switchTab('quiz');
    this.generateChoiceQuiz();
  }

  // ==========================================
  // 5. 한자 사전 & 전체 검색 (Dictionary)
  // ==========================================
  renderDictionary(query = '') {
    const activeChip = document.querySelector('.filter-chip.active');
    const category = activeChip ? activeChip.dataset.cat : 'all';

    let filtered = this.kanjiList.filter(k => {
      // Category filter
      if (category !== 'all' && k.category !== category) return false;
      // Search query
      if (query) {
        const q = query.toLowerCase();
        return (
          k.kanji.includes(q) ||
          k.meaning.toLowerCase().includes(q) ||
          k.sound.toLowerCase().includes(q) ||
          (k.kunyomi && k.kunyomi.toLowerCase().includes(q)) ||
          (k.onyomi && k.onyomi.toLowerCase().includes(q))
        );
      }
      return true;
    });

    if (filtered.length === 0) {
      this.kanjiGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🔍</div>
          <p>검색 결과가 없습니다.</p>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(k => {
      const isLearned = this.learned.has(k.id);
      const isWrong = !!this.wrongMap[k.id];
      let badgeClass = '';
      if (isWrong) badgeClass = 'wrong';
      else if (isLearned) badgeClass = 'learned';

      html += `
        <div class="kanji-cell ${isLearned ? 'learned' : ''} ${isWrong ? 'has-wrong' : ''}" onclick="app.openDetailModal(${k.id})">
          ${badgeClass ? `<span class="cell-badge ${badgeClass}"></span>` : ''}
          <div class="cell-char">${k.kanji}</div>
          <div class="cell-sound">${k.meaning} ${k.sound}</div>
        </div>
      `;
    });
    this.kanjiGrid.innerHTML = html;
  }

  // ==========================================
  // MODAL DETAIL POPUP
  // ==========================================
  openDetailModal(kanjiId) {
    const k = this.kanjiList.find(item => item.id == kanjiId);
    if (!k) return;

    let exHtml = '';
    if (k.examples && k.examples.length > 0) {
      exHtml = k.examples.map(ex => `
        <div class="example-item" onclick="app.playExampleVoice(event, '${ex.word}', this.querySelector('.btn-example-play'))" title="단어 AI 음성 듣기">
          <strong>${ex.word} <span style="font-weight:normal;color:var(--text-sub);">(${ex.reading})</span></strong>
          <div style="display:flex;align-items:center;gap:6px;">
            <span>${ex.meaning}</span>
            <button type="button" class="btn-example-play" title="발음 듣기">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
            </button>
          </div>
        </div>
      `).join('');
    }

    const kunClean = k.kunyomi || '';
    const onClean = k.onyomi || '';

    this.modalContent.innerHTML = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div>
          <span class="badge-n5">${this.currentLevel}</span>
          <span style="font-size:0.8rem;color:var(--text-sub);margin-left:6px;">${k.category} · ${k.strokes}획</span>
        </div>
        <button class="btn-close-modal" onclick="app.modalOverlay.classList.remove('open')">✕</button>
      </div>

      <div style="display:flex;align-items:center;gap:16px;">
        <div style="font-family:var(--font-kanji);font-size:4.5rem;font-weight:800;color:var(--text-main);">${k.kanji}</div>
        <div>
          <h2 style="font-size:1.4rem;font-weight:800;">${k.meaning} ${k.sound}</h2>
          <p style="font-size:0.85rem;color:var(--text-sub);margin-top:2px;">부수: ${k.radical}</p>
          <button onclick="app.playVoiceWithEffect('${k.kanji}', this)" style="margin-top:6px;padding:4px 12px;border-radius:var(--radius-full);border:1px solid var(--border);background:var(--bg-main);font-size:0.82rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:5px;color:var(--primary);">
            🔊 한자 음성 듣기
          </button>
        </div>
      </div>

      <div class="reading-row" onclick="app.playVoiceWithEffect('${kunClean}', this.querySelector('.btn-voice-play'))" title="훈독 AI 음성 듣기">
        <div style="flex:1;">
          <div class="reading-tag">훈독 (뜻으로 읽기) 🔊</div>
          <div class="reading-val">${k.kunyomi || '-'}</div>
        </div>
        <button type="button" class="btn-voice-play" title="훈독 소리 듣기">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>
        </button>
      </div>

      <div class="reading-row" onclick="app.playVoiceWithEffect('${onClean}', this.querySelector('.btn-voice-play'))" title="음독 AI 음성 듣기">
        <div style="flex:1;">
          <div class="reading-tag">음독 (소리로 읽기) 🔊</div>
          <div class="reading-val">${k.onyomi || '-'}</div>
        </div>
        <button type="button" class="btn-voice-play" title="음독 소리 듣기">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>
        </button>
      </div>

      <div class="tip-box">
        <strong>💡 어원 및 연상 암기 비결:</strong><br>
        ${k.tip || '한자의 모양을 이야기로 연상하여 오래 기억하세요.'}
      </div>

      <div>
        <h4 style="font-size:0.9rem;margin-bottom:6px;font-weight:700;">실전 대표 단어 (터치 시 발음 재생)</h4>
        <div class="examples-box">${exHtml}</div>
      </div>
    `;

    this.modalOverlay.classList.add('open');
  }

  // Helper utils
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  triggerConfetti() {
    window.soundEngine.playCelebration();
    // Simple canvas confetti
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const pieces = [];
    const colors = ['#4f46e5', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14 - 3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // gravity
        p.rotation += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      frame++;
      if (frame < 60) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    animate();
  }
}

// Global audio helper fallback
window.playExampleVoice = function(event, word, btn) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  if (window.app && window.app.playExampleVoice) {
    window.app.playExampleVoice(event, word, btn);
  } else if (window.soundEngine) {
    window.soundEngine.speak(word);
  }
};

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  // Theme check
  const savedTheme = localStorage.getItem('jlpt_theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  try {
    window.app = new KanjiApp();
  } catch (err) {
    console.error('App init error:', err);
  }
});
