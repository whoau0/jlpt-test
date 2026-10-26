/**
 * JLPT 기타 등급(N4, N3, N2, N1) 및 일본어 상용한자(2,136자) 로드맵 데이터
 * nihongokanji.com 사이트의 상용한자 체계 및 649번 '再'(다시 재) 수록
 */

const JLPT_OTHER_LEVELS = {
  N4: {
    title: "JLPT N4 기초 상급 한자 (약 181자)",
    description: "N5 기본 한자 103자에 이어 일상생활의 기본 대화와 기초 문맥 파악에 필요한 필수 한자군입니다.",
    sampleKanji: [
      {
        id: 201,
        kanji: "開",
        meaning: "열",
        sound: "개",
        kunyomi: "あ・く, ひら・く (aku, hiraku)",
        onyomi: "カイ (kai)",
        strokes: 12,
        radical: "門 (문문)",
        category: "동작",
        tip: "양손으로 빗장을 풀고 문(門)을 활짝 '열다'입니다.",
        examples: [
          { word: "開ける", reading: "あける", meaning: "열다" },
          { word: "開会", reading: "かいかい", meaning: "개회" }
        ]
      },
      {
        id: 202,
        kanji: "閉",
        meaning: "닫을",
        sound: "폐",
        kunyomi: "し・める, と・じる (shimeru, tojiru)",
        onyomi: "ヘイ (hei)",
        strokes: 11,
        radical: "門 (문문)",
        category: "동작",
        tip: "문(門) 사이에 빗장(才)을 걸어 단단히 '닫다'입니다.",
        examples: [
          { word: "閉める", reading: "しめる", meaning: "닫다" },
          { word: "閉店", reading: "へいてん", meaning: "폐점" }
        ]
      },
      {
        id: 203,
        kanji: "待",
        meaning: "기다릴",
        sound: "대",
        kunyomi: "ま・つ (matsu)",
        onyomi: "タイ (tai)",
        strokes: 9,
        radical: "彳 (두인변)",
        category: "동작",
        tip: "거리(彳) 관청(寺) 앞에서 차분히 발걸음을 멈추고 누군가를 '기다리다'입니다.",
        examples: [
          { word: "待つ", reading: "まつ", meaning: "기다리다" },
          { word: "期待", reading: "きたい", meaning: "기대" }
        ]
      },
      {
        id: 204,
        kanji: "持",
        meaning: "가질, 쥘",
        sound: "지",
        kunyomi: "も・つ (motsu)",
        onyomi: "ジ (ji)",
        strokes: 9,
        radical: "手 (손수)",
        category: "동작",
        tip: "손(扌)으로 법도(寺)를 지키듯 소중한 물건을 손에 꼭 '쥐고 가지다'입니다.",
        examples: [
          { word: "持つ", reading: "もつ", meaning: "가지다, 들다" },
          { word: "気持ち", reading: "きもち", meaning: "기분, 마음" }
        ]
      },
      {
        id: 205,
        kanji: "走",
        meaning: "달릴",
        sound: "주",
        kunyomi: "はし・る (hashiru)",
        onyomi: "ソウ (sou)",
        strokes: 7,
        radical: "走 (달릴주)",
        category: "동작",
        tip: "흙먼지(土)를 일으키며 발(止)을 굴려 힘차게 앞으로 '달리다'입니다.",
        examples: [
          { word: "走る", reading: "はしる", meaning: "달리다" },
          { word: "走者", reading: "そうしゃ", meaning: "주자" }
        ]
      },
      {
        id: 206,
        kanji: "起",
        meaning: "일어날",
        sound: "기",
        kunyomi: "お・きる, お・こす (okiru, okosu)",
        onyomi: "キ (ki)",
        strokes: 10,
        radical: "走 (달릴주)",
        category: "동작",
        tip: "몸을 일으켜 달려갈(走) 준비를 마치고 자리에서 '일어나다'입니다.",
        examples: [
          { word: "起きる", reading: "おきる", meaning: "일어나다" },
          { word: "早起き", reading: "はやおき", meaning: "일찍 일어남" }
        ]
      },
      {
        id: 207,
        kanji: "使",
        meaning: "부릴, 쓸",
        sound: "사",
        kunyomi: "つか・う (tsukau)",
        onyomi: "シ (shi)",
        strokes: 8,
        radical: "人 (사람인)",
        category: "동작",
        tip: "사람(亻)에게 벼슬과 직책(吏)을 맡겨 일을 시키고 도구를 '사용하다'입니다.",
        examples: [
          { word: "使う", reading: "つかう", meaning: "사용하다, 쓰다" },
          { word: "大使館", reading: "たいしかん", meaning: "대사관" }
        ]
      },
      {
        id: 208,
        kanji: "作",
        meaning: "지을, 만들",
        sound: "작",
        kunyomi: "つく・る (tsukuru)",
        onyomi: "サク, サ (saku, sa)",
        strokes: 7,
        radical: "人 (사람인)",
        category: "동작",
        tip: "사람(亻)이 옷깃을 여미듯 정성을 다해 새로운 물건을 '만들다'입니다.",
        examples: [
          { word: "作る", reading: "つくる", meaning: "만들다" },
          { word: "作文", reading: "さくぶん", meaning: "작문" }
        ]
      }
    ]
  },
  N3: {
    title: "JLPT N3 중급 필수 한자 (약 370자)",
    description: "일상적인 상황뿐 아니라 다소 폭넓은 주제의 문장을 이해하기 위한 중급 한자입니다.",
    sampleKanji: [
      {
        id: 649,
        kanji: "再",
        meaning: "두 번, 다시",
        sound: "재",
        kunyomi: "ふたた・び (futatabi)",
        onyomi: "サイ, サ (sai, sa)",
        strokes: 6,
        radical: "冂 (멀경)",
        category: "부사/상태",
        tip: "nihongokanji.com 649번 수록 한자! 물고기가 수면 위로 입을 뻐끔뻐끔 올렸다 내렸다를 거듭하듯 '다시, 거듭해서'라는 뜻을 지닙니다.",
        examples: [
          { word: "再び", reading: "ふたたび", meaning: "다시, 재차" },
          { word: "再開", reading: "さいかい", meaning: "재개 (다시 시작함)" },
          { word: "再生", reading: "さいせい", meaning: "재생" }
        ]
      },
      {
        id: 302,
        kanji: "情",
        meaning: "뜻, 정",
        sound: "정",
        kunyomi: "なさ・け (nasake)",
        onyomi: "ジョウ, セイ (jou)",
        strokes: 11,
        radical: "心 (마음심)",
        category: "마음",
        tip: "마음(忄)속에 푸른(青) 생명수처럼 샘솟는 따뜻한 '감정과 정'입니다.",
        examples: [
          { word: "情報", reading: "じょうほう", meaning: "정보" },
          { word: "感情", reading: "かんじょう", meaning: "감정" }
        ]
      }
    ]
  },
  N2: {
    title: "JLPT N2 비즈니스 & 준상급 한자 (약 370자)",
    description: "신문, 잡지의 기사나 해설 등 폭넓은 시사 교양과 비즈니스 일본어에 필요한 한자입니다.",
    sampleKanji: [
      {
        id: 401,
        kanji: "経",
        meaning: "지날, 경영할",
        sound: "경",
        kunyomi: "へ・る (heru)",
        onyomi: "ケイ, キョウ (kei)",
        strokes: 11,
        radical: "糸 (실사)",
        category: "사회/경제",
        tip: "베틀의 날실(糸)처럼 사물의 질서와 흐름을 곧게 펴 '경영하다, 지나다'입니다.",
        examples: [
          { word: "経済", reading: "けいざい", meaning: "경제" },
          { word: "経験", reading: "けいけん", meaning: "경험" }
        ]
      }
    ]
  },
  N1: {
    title: "JLPT N1 최고급 & 상용한자 완성 (약 1,000자)",
    description: "논설문, 학술, 문학, 전문 비즈니스 영역에서 심도 있는 의사소통에 쓰이는 최고 등급 한자입니다.",
    sampleKanji: [
      {
        id: 501,
        kanji: "鑑",
        meaning: "거울, 감정할",
        sound: "감",
        kunyomi: "かがみ, かんが・みる (kagami)",
        onyomi: "カン (kan)",
        strokes: 23,
        radical: "金 (쇠금)",
        category: "고급",
        tip: "쇠(金)를 닦아 만든 거울에 자신을 비추어보고 사물의 진위를 '감정하다'입니다.",
        examples: [
          { word: "鑑賞", reading: "かんしょう", meaning: "감상 (예술 등)" },
          { word: "印鑑", reading: "いんかん", meaning: "인감" }
        ]
      }
    ]
  }
};
