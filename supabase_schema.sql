-- =========================================================
-- JLPT 학습 기록 저장을 위한 Supabase 테이블 생성 SQL
-- Supabase Dashboard -> SQL Editor 에서 복사 후 Run을 눌러주세요.
-- =========================================================

-- 1. 학습 기록 테이블 생성
CREATE TABLE IF NOT EXISTS public.jlpt_study_records (
    user_id TEXT PRIMARY KEY,                       -- 사용자 아이디 (기본값: whoau0)
    learned_kanji JSONB DEFAULT '[]'::jsonb,        -- 암기 완료한 한자 ID 배열
    wrong_map JSONB DEFAULT '{}'::jsonb,            -- 오답노트 한자별 틀린 횟수
    stats JSONB DEFAULT '{"totalSolved": 0, "correctCount": 0, "streak": 0, "maxStreak": 0}'::jsonb, -- 통계
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 모든 사용자가 편리하게 읽기/쓰기 가능하도록 RLS(보안정책) 허용
ALTER TABLE public.jlpt_study_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read and write"
ON public.jlpt_study_records
FOR ALL
USING (true)
WITH CHECK (true);
