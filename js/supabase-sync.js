/**
 * Supabase Zero-Click Realtime Auto-Sync Manager
 * 일반 웹 서비스 DB처럼 사용자가 버튼을 누르지 않아도
 * 1) 앱 접속 시 자동으로 클라우드에서 최신 학습 기록을 불러오고 (Auto-Load)
 * 2) 문제를 풀 때마다 백그라운드에서 실시간 자동 저장 (Debounced Auto-Save)
 */

class SupabaseSyncManager {
  constructor() {
    this.client = null;
    this.saveTimeout = null;
    this.statusEl = null;

    // 1. 설정 로드: config.js 기본값 우선 적용 (없을 경우 localStorage)
    const defaults = typeof SUPABASE_DEFAULT_CONFIG !== 'undefined' ? SUPABASE_DEFAULT_CONFIG : {};
    const saved = JSON.parse(localStorage.getItem('jlpt_supabase_config') || '{}');

    this.config = {
      url: defaults.url || saved.url || '',
      key: defaults.key || saved.key || '',
      userId: defaults.userId || saved.userId || 'whoau0'
    };

    if (this.config.url && this.config.key) {
      this.initClient();
    }
  }

  initClient() {
    if (typeof window.supabase === 'undefined') {
      console.warn('Supabase SDK 로드 대기 중');
      return false;
    }
    try {
      this.client = window.supabase.createClient(this.config.url, this.config.key);
      this.updateStatusBadge('connected');
      return true;
    } catch (e) {
      console.error('Supabase 연결 실패:', e);
      this.updateStatusBadge('error');
      return false;
    }
  }

  isReady() {
    if (!this.client && this.config.url && this.config.key) {
      this.initClient();
    }
    return !!this.client;
  }

  // 상태 배지 업데이트 (화면 상단에 노션/구글닥스처럼 '저장됨' 표시)
  updateStatusBadge(status) {
    if (!this.statusEl) {
      this.statusEl = document.getElementById('cloudAutoSyncStatus');
    }
    if (!this.statusEl) return;

    if (status === 'saving') {
      this.statusEl.innerHTML = `<span class="sync-dot saving"></span><span class="sync-text">DB 저장 중...</span>`;
      this.statusEl.title = 'Supabase 클라우드 DB에 자동 저장 중입니다.';
    } else if (status === 'saved') {
      this.statusEl.innerHTML = `<span class="sync-dot saved"></span><span class="sync-text">DB 자동 저장됨</span>`;
      this.statusEl.title = '최신 학습 기록이 Supabase에 안전하게 보관되었습니다.';
    } else if (status === 'connected') {
      this.statusEl.innerHTML = `<span class="sync-dot saved"></span><span class="sync-text">DB 실시간 연동</span>`;
    } else if (status === 'error') {
      this.statusEl.innerHTML = `<span class="sync-dot error"></span><span class="sync-text">DB 연결 확인</span>`;
    } else {
      this.statusEl.innerHTML = `<span class="sync-dot off"></span><span class="sync-text">로컬 저장 모드</span>`;
    }
  }

  // 1. 앱 시작 시 클라우드에서 자동으로 최신 기록 가져오기 (Auto-Load)
  async syncOnStartup(app) {
    if (!this.isReady()) {
      this.updateStatusBadge('offline');
      return;
    }

    try {
      this.updateStatusBadge('saving');
      const { data, error } = await this.client
        .from('jlpt_study_records')
        .select('*')
        .eq('user_id', this.config.userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        // 클라우드에 기존 기록이 있는 경우: 로컬 데이터와 지능적 병합
        const cloudLearned = new Set(data.learned_kanji || []);
        const localLearned = app.learned || new Set();
        // 양쪽 모두 합침
        const mergedLearned = new Set([...localLearned, ...cloudLearned]);

        // 오답노트 병합
        const cloudWrong = data.wrong_map || {};
        const localWrong = app.wrongMap || {};
        const mergedWrong = { ...localWrong, ...cloudWrong };

        // 통계 병합 (더 많이 푼 기록 채택)
        const cloudStats = data.stats || {};
        const localStats = app.stats || {};
        const mergedStats = {
          totalSolved: Math.max(localStats.totalSolved || 0, cloudStats.totalSolved || 0),
          correctCount: Math.max(localStats.correctCount || 0, cloudStats.correctCount || 0),
          streak: Math.max(localStats.streak || 0, cloudStats.streak || 0),
          maxStreak: Math.max(localStats.maxStreak || 0, cloudStats.maxStreak || 0)
        };

        app.learned = mergedLearned;
        app.wrongMap = mergedWrong;
        app.stats = mergedStats;

        // 로컬스토리지에도 최신 동기화 결과 저장 (오프라인 대비)
        localStorage.setItem('jlpt_learned', JSON.stringify([...app.learned]));
        localStorage.setItem('jlpt_wrong', JSON.stringify(app.wrongMap));
        localStorage.setItem('jlpt_stats', JSON.stringify(app.stats));

        app.updateStatsUI();
        app.renderCurrentView();
        console.log('✅ Supabase 클라우드 기록 자동 동기화 완료!');
      } else {
        // 클라우드에 아직 기록이 없으면 현재 로컬 데이터를 클라우드에 첫 등록
        await this.pushToDatabase(app);
      }
      this.updateStatusBadge('saved');
    } catch (e) {
      console.warn('자동 로드 중 오류:', e);
      this.updateStatusBadge('connected');
    }
  }

  // 2. 학습할 때마다 백그라운드 자동 저장 (Debounce: 800ms)
  scheduleAutoSave(appData) {
    if (!this.isReady()) return;

    this.updateStatusBadge('saving');

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(async () => {
      await this.pushToDatabase(appData);
    }, 800);
  }

  // 실제 데이터베이스로 전송
  async pushToDatabase(appData) {
    if (!this.isReady()) return;

    try {
      const payload = {
        user_id: this.config.userId,
        learned_kanji: Array.from(appData.learned || []),
        wrong_map: appData.wrongMap || {},
        stats: appData.stats || {},
        updated_at: new Date().toISOString()
      };

      const { error } = await this.client
        .from('jlpt_study_records')
        .upsert(payload, { onConflict: 'user_id' });

      if (error) throw error;
      this.updateStatusBadge('saved');
    } catch (e) {
      console.error('Supabase 자동 저장 실패:', e);
      this.updateStatusBadge('error');
    }
  }

  saveConfig(url, key, userId) {
    this.config.url = url.trim();
    this.config.key = key.trim();
    this.config.userId = userId.trim() || 'whoau0';
    localStorage.setItem('jlpt_supabase_config', JSON.stringify(this.config));
    return this.initClient();
  }
}

window.supabaseSync = new SupabaseSyncManager();
