/**
 * Supabase 기본 설정 파일
 * 사용자의 Supabase 프로젝트 정보가 안전하게 내장되어 있어
 * 별도의 설정이나 로그인, 백업 버튼 클릭 없이 100% 자동 동기화됩니다.
 */

const SUPABASE_DEFAULT_CONFIG = {
  url: 'https://fmjggxjjaitsuddkkwxr.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtamdneGpqYWl0c3VkZGtrd3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MjgyMjUsImV4cCI6MjEwODMwNDIyNX0.yPBWELCtjo954RaeiRUA4_svSCSaRiFzFzUStamGM8A',
  userId: 'whoau0'
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUPABASE_DEFAULT_CONFIG };
}
