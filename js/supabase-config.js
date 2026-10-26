/**
 * Supabase 기본 설정 파일
 * 이곳에 Supabase URL과 Key를 입력해두면, 앱을 켤 때마다 
 * 로그인이나 백업 버튼을 누를 필요 없이 일반 웹 서비스처럼 100% 자동 동기화됩니다.
 */

const SUPABASE_DEFAULT_CONFIG = {
  url: '',      // 예: 'https://xyzcompany.supabase.co'
  key: '',      // 예: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...'
  userId: 'whoau0' // 사용자 고유 계정 ID
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUPABASE_DEFAULT_CONFIG };
}
