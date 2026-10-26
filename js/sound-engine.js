/**
 * Sound & Speech Engine
 * Web Audio API를 활용한 효과음 및
 * Web Speech API(ja-JP)를 활용한 인공지능 일본어 음성 재생기
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.ttsEnabled = true;
    this.jpVoice = null;
    this.initVoices();
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  initVoices() {
    if ('speechSynthesis' in window) {
      const load = () => {
        const voices = window.speechSynthesis.getVoices();
        // 선호하는 고음질 일본어 음성 우선 선택
        this.jpVoice = voices.find(v => 
          (v.lang.startsWith('ja') || v.lang.includes('JP')) && 
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Haruka') || v.name.includes('Ayumi') || v.name.includes('Kyoko') || v.name.includes('Otoya'))
        ) || voices.find(v => v.lang.startsWith('ja') || v.lang.includes('JP')) || null;
      };
      load();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = load;
      }
    }
  }

  // 텍스트 정제 (로마자 괄호, 점 기호 등 제거하여 깨끗한 일본어 음성으로 변환)
  cleanJapaneseText(rawText) {
    if (!rawText) return '';
    return rawText
      .replace(/\(.*?\)/g, '')    // (hitotsu) 등 괄호 안 로마자 제거
      .replace(/\[.*?\]/g, '')    // 대괄호 제거
      .replace(/・/g, '')         // 오쿠리가나 구분 점 제거 (예: ひと・つ -> ひとつ)
      .replace(/-/g, '')          // 하이픈 제거
      .trim();
  }

  // 일본어 AI 음성(TTS) 읽기
  speak(rawText, onEndCallback = null) {
    if (!this.ttsEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // 이전 발음 중단

      const cleanText = this.cleanJapaneseText(rawText);
      if (!cleanText) return;

      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.lang = 'ja-JP';
      utter.rate = 0.85; // 학습용 또렷한 속도
      utter.pitch = 1.0;

      if (!this.jpVoice) {
        this.initVoices();
      }
      if (this.jpVoice) {
        utter.voice = this.jpVoice;
      }

      if (onEndCallback) {
        utter.onend = onEndCallback;
        utter.onerror = onEndCallback;
      }

      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn('TTS error:', e);
      if (onEndCallback) onEndCallback();
    }
  }

  // 정답 효과음 (맑은 2화음 딩동)
  playCorrect() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // C5 -> E5
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // G5
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, now + 0.12);
      gain2.gain.setValueAtTime(0.25, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.45);
    } catch (e) {}
  }

  // 오답 효과음
  playIncorrect() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(146.83, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  // 카드 뒤집기 사운드
  playFlip() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // 축하 팡파레
  playCelebration() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.35);
      });
    } catch (e) {}
  }
}

window.soundEngine = new SoundEngine();
