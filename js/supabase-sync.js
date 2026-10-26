/**
 * Supabase Cloud Sync Manager
 * 클라우드 데이터베이스(Supabase)와 로컬 학습 기록 실시간 양방향 동기화
 */

class SupabaseSyncManager {
  constructor() {
    this.client = null;
    this.config = JSON.parse(localStorage.getItem('jlpt_supabase_config') || 'null') || {
      url: '',
      key: '',
      userId: 'whoau0',
      autoSync: true
    };
    this.isConnected = false;

    if (this.config.url && this.config.key) {
      this.initClient();
    }
  }

  initClient() {
    if (typeof window.supabase === 'undefined') {
      console.warn('Supabase JS SDK가 로드되지 않았습니다.');
      return false;
    }
    try {
      this.client = window.supabase.createClient(this.config.url, this.config.key);
      this.isConnected = true;
      return true;
    } catch (e) {
      console.error('Supabase 클라이언트 생성 실패:', e);
      this.isConnected = false;
      return false;
    }
  }

  saveConfig(url, key, userId, autoSync = true) {
    this.config = { url: url.trim(), key: key.trim(), userId: userId.trim() || 'whoau0', autoSync };
    localStorage.setItem('jlpt_supabase_config', JSON.stringify(this.config));
    return this.initClient();
  }

  // Supabase에 현재 학습 기록 업로드 (Upsert)
  async uploadRecord(appData) {
    if (!this.isConnected || !this.client) {
      return { success: false, message: 'Supabase가 연결되어 있지 않습니다.' };
    }

    try {
      const payload = {
        user_id: this.config.userId,
        learned_kanji: Array.from(appData.learned || []),
        wrong_map: appData.wrongMap || {},
        stats: appData.stats || {},
        updated_at: new Date().toISOString()
      };

      const { data, error } = await this.client
        .from('jlpt_study_records')
        .upsert(payload, { onConflict: 'user_id' });

      if (error) throw error;
      return { success: true, message: '클라우드에 학습 기록이 저장되었습니다!' };
    } catch (e) {
      console.error('Supabase 저장 오류:', e);
      return { success: false, message: '저장 실패: ' + e.message };
    }
  }

  // Supabase에서 이전 학습 기록 불러오기
  async downloadRecord() {
    if (!this.isConnected || !this.client) {
      return { success: false, message: 'Supabase가 연결되어 있지 않습니다.' };
    }

    try {
      const { data, error } = await this.client
        .from('jlpt_study_records')
        .select('*')
        .eq('user_id', this.config.userId)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return { success: false, message: '저장된 클라우드 기록이 없습니다.' };
      }

      return {
        success: true,
        data: {
          learned: data.learned_kanji || [],
          wrongMap: data.wrong_map || {},
          stats: data.stats || { totalSolved: 0, correctCount: 0, streak: 0, maxStreak: 0 }
        },
        updatedAt: data.updated_at
      };
    } catch (e) {
      console.error('Supabase 불러오기 오류:', e);
      return { success: false, message: '불러오기 실패: ' + e.message };
    }
  }
}

window.supabaseSync = new SupabaseSyncManager();
