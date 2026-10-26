/**
 * JLPT N5 필수 한자 103자 전체 정밀 데이터베이스
 * 각 한자별: 한국어 훈/음, 훈독(히라가나), 음독(가타카나), 부수, 획수, 
 * nihongokanji 스타일 연상 암기 팁(tip), 실전 대표 단어 2~3개
 */

const JLPT_N5_KANJI = [
  // 1. 숫자 & 기본 단위 (15자)
  {
    id: 1,
    kanji: "一",
    meaning: "하나",
    sound: "일",
    kunyomi: "ひと・つ (hitotsu)",
    onyomi: "イチ, イツ (ichi, itsu)",
    strokes: 1,
    radical: "一 (한일)",
    category: "숫자/단위",
    tip: "손가락 하나를 옆으로 눕혀 놓은 모양에서 '하나'를 뜻합니다.",
    examples: [
      { word: "一つ", reading: "ひとつ", meaning: "한 개, 하나" },
      { word: "一日", reading: "ついたち / いちにち", meaning: "1일 / 하루" },
      { word: "一人", reading: "ひとり", meaning: "한 사람, 혼자" }
    ]
  },
  {
    id: 2,
    kanji: "二",
    meaning: "둘",
    sound: "이",
    kunyomi: "ふた・つ (futatsu)",
    onyomi: "ニ, ジ (ni, ji)",
    strokes: 2,
    radical: "二 (두이)",
    category: "숫자/단위",
    tip: "손가락 두 개를 가로로 나란히 놓은 모습에서 숫자 '둘'을 나타냅니다.",
    examples: [
      { word: "二つ", reading: "ふたつ", meaning: "두 개, 둘" },
      { word: "二日", reading: "ふつか", meaning: "2일, 이틀" },
      { word: "二人", reading: "ふたり", meaning: "두 사람, 둘이서" }
    ]
  },
  {
    id: 3,
    kanji: "三",
    meaning: "셋",
    sound: "삼",
    kunyomi: "みっ・つ, み・つ (mittsu, mitsu)",
    onyomi: "サン (san)",
    strokes: 3,
    radical: "一 (한일)",
    category: "숫자/단위",
    tip: "손가락 세 개를 나란히 눕힌 모습에서 숫자 '셋'을 뜻합니다.",
    examples: [
      { word: "三つ", reading: "みっつ", meaning: "세 개, 셋" },
      { word: "三日", reading: "みっか", meaning: "3일, 사흘" },
      { word: "三年", reading: "さんねん", meaning: "3년" }
    ]
  },
  {
    id: 4,
    kanji: "四",
    meaning: "넷",
    sound: "사",
    kunyomi: "よっ・つ, よ・つ, よん, よ (yottsu, yon)",
    onyomi: "シ (shi)",
    strokes: 5,
    radical: "囗 (큰입구몸)",
    category: "숫자/단위",
    tip: "입(口) 안에 혀나 숨결(八)이 나뉘어 나가는 모습을 본떠 '넷'으로 빌려 썼습니다.",
    examples: [
      { word: "四つ", reading: "よっつ", meaning: "네 개" },
      { word: "四日", reading: "よっか", meaning: "4일, 나흘" },
      { word: "四人", reading: "よにん", meaning: "네 사람" }
    ]
  },
  {
    id: 5,
    kanji: "五",
    meaning: "다섯",
    sound: "오",
    kunyomi: "いつ・つ, いつ (itsutsu)",
    onyomi: "ゴ (go)",
    strokes: 4,
    radical: "二 (두이)",
    category: "숫자/단위",
    tip: "두 선(하늘과 땅) 사이에 실패 모양의 교차하는 선이 얽혀있는 다섯을 뜻합니다.",
    examples: [
      { word: "五つ", reading: "いつつ", meaning: "다섯 개" },
      { word: "五日", reading: "いつか", meaning: "5일, 닷새" },
      { word: "五月", reading: "ごがつ", meaning: "5월" }
    ]
  },
  {
    id: 6,
    kanji: "六",
    meaning: "여섯",
    sound: "육",
    kunyomi: "むっ・つ, むい (muttsu, mui)",
    onyomi: "ロク, リク (roku)",
    strokes: 4,
    radical: "八 (여덟팔)",
    category: "숫자/단위",
    tip: "집의 지붕과 기둥 모양에서 유래하여 숫자 '여섯'을 의미하게 되었습니다.",
    examples: [
      { word: "六つ", reading: "むっつ", meaning: "여섯 개" },
      { word: "六日", reading: "むいか", meaning: "6일, 엿새" },
      { word: "六月", reading: "ろくがつ", meaning: "6월" }
    ]
  },
  {
    id: 7,
    kanji: "七",
    meaning: "일곱",
    sound: "칠",
    kunyomi: "なな・つ, なな, なの (nanatsu, nana)",
    onyomi: "シチ (shichi)",
    strokes: 2,
    radical: "一 (한일)",
    category: "숫자/단위",
    tip: "선을 칼로 자르는 모습에서 유래하여 숫자 '일곱'을 가리킵니다.",
    examples: [
      { word: "七つ", reading: "ななつ", meaning: "일곱 개" },
      { word: "七日", reading: "なのか", meaning: "7일, 이레" },
      { word: "七時", reading: "しちじ", meaning: "7시" }
    ]
  },
  {
    id: 8,
    kanji: "八",
    meaning: "여덟",
    sound: "팔",
    kunyomi: "やっ・つ, よう (yattsu, you)",
    onyomi: "ハチ (hachi)",
    strokes: 2,
    radical: "八 (여덟팔)",
    category: "숫자/단위",
    tip: "두 갈래로 서로 등지고 나뉘어 벌어지는 모양에서 '여덟'을 나타냅니다.",
    examples: [
      { word: "八つ", reading: "やっつ", meaning: "여덟 개" },
      { word: "八日", reading: "ようか", meaning: "8일, 여드레" },
      { word: "八百屋", reading: "やおや", meaning: "채소가게" }
    ]
  },
  {
    id: 9,
    kanji: "九",
    meaning: "아홉",
    sound: "구",
    kunyomi: "ここの・つ (kokonotsu)",
    onyomi: "キュウ, ク (kyuu, ku)",
    strokes: 2,
    radical: "乙 (새을)",
    category: "숫자/단위",
    tip: "팔을 구부려 꺾은 모양 또는 뱀이 몸을 웅크린 모습에서 '아홉'을 나타냅니다.",
    examples: [
      { word: "九つ", reading: "ここのつ", meaning: "아홉 개" },
      { word: "九日", reading: "ここのか", meaning: "9일, 아흐레" },
      { word: "九時", reading: "くじ", meaning: "9시" }
    ]
  },
  {
    id: 10,
    kanji: "十",
    meaning: "열",
    sound: "십",
    kunyomi: "とお, と (too)",
    onyomi: "ジュウ, ジッ (juu)",
    strokes: 2,
    radical: "十 (열십)",
    category: "숫자/단위",
    tip: "가로와 세로가 완전히 만나 완성된 수, 동서남북을 모두 아우르는 '열'입니다.",
    examples: [
      { word: "十", reading: "とお / じゅう", meaning: "열, 10" },
      { word: "十日", reading: "とおか", meaning: "10일, 열흘" },
      { word: "十分", reading: "じゅっぷん", meaning: "10분" }
    ]
  },
  {
    id: 11,
    kanji: "百",
    meaning: "일백",
    sound: "백",
    kunyomi: "もも (momo)",
    onyomi: "ヒャク (hyaku)",
    strokes: 6,
    radical: "白 (흰백)",
    category: "숫자/단위",
    tip: "하나(一)와 흰 백(白)이 합쳐져 가득 찬 큰 수 '백'을 뜻합니다.",
    examples: [
      { word: "百", reading: "ひゃく", meaning: "100, 백" },
      { word: "三百", reading: "さんびゃく", meaning: "300" },
      { word: "六百", reading: "ろっぴゃく", meaning: "600" }
    ]
  },
  {
    id: 12,
    kanji: "千",
    meaning: "일천",
    sound: "천",
    kunyomi: "ち (chi)",
    onyomi: "セン (sen)",
    strokes: 3,
    radical: "十 (열십)",
    category: "숫자/단위",
    tip: "사람(人)의 다리에 획을 더해 수많은 사람들의 수 '천'을 의미합니다.",
    examples: [
      { word: "千", reading: "せん", meaning: "1000, 천" },
      { word: "三千", reading: "さんぜん", meaning: "3000" },
      { word: "千円", reading: "せんえん", meaning: "1,000엔" }
    ]
  },
  {
    id: 13,
    kanji: "万",
    meaning: "일만",
    sound: "만",
    kunyomi: "よろず (yorozu)",
    onyomi: "マン, バン (man, ban)",
    strokes: 3,
    radical: "一 (한일)",
    category: "숫자/단위",
    tip: "수많은 전갈 떼의 형상에서 유래하여 엄청나게 많은 수 '만'을 뜻합니다.",
    examples: [
      { word: "一万", reading: "いちまん", meaning: "1만, 10,000" },
      { word: "万年筆", reading: "まんねんひつ", meaning: "만년필" },
      { word: "万歳", reading: "ばんざい", meaning: "만세" }
    ]
  },
  {
    id: 14,
    kanji: "円",
    meaning: "둥글/엔",
    sound: "원",
    kunyomi: "まる・い (marui)",
    onyomi: "エン (en)",
    strokes: 4,
    radical: "冂 (멀경)",
    category: "숫자/단위",
    tip: "둥근 동전의 외곽 테두리를 상형화하여 일본 화폐 단위 '엔(円)'을 나타냅니다.",
    examples: [
      { word: "円", reading: "えん", meaning: "엔(일본 화폐)" },
      { word: "百円", reading: "ひゃくえん", meaning: "100엔" },
      { word: "円い", reading: "まるい", meaning: "둥글다" }
    ]
  },
  {
    id: 15,
    kanji: "半",
    meaning: "반",
    sound: "반",
    kunyomi: "なか・ば (nakaba)",
    onyomi: "ハン (han)",
    strokes: 5,
    radical: "十 (열십)",
    category: "숫자/단위",
    tip: "소(牛)를 칼(八)로 정확히 반으로 가른 모습에서 '절반, 반'을 뜻합니다.",
    examples: [
      { word: "半分", reading: "はんぶん", meaning: "절반, 반" },
      { word: "一時半", reading: "いちじはん", meaning: "1시 반" },
      { word: "半年", reading: "はんとし / はんねん", meaning: "반년" }
    ]
  },

  // 2. 시간 & 달력 & 주기 (13자)
  {
    id: 16,
    kanji: "日",
    meaning: "날, 해",
    sound: "일",
    kunyomi: "ひ, -び, -か (hi, bi, ka)",
    onyomi: "ニチ, ジツ (nichi, jitsu)",
    strokes: 4,
    radical: "日 (날일)",
    category: "시간/날짜",
    tip: "둥근 태양 가운데 흑점이 있는 모양을 본떠 '해, 날, 일요일'을 뜻합니다.",
    examples: [
      { word: "日曜日", reading: "にちようび", meaning: "일요일" },
      { word: "毎日", reading: "まいにち", meaning: "매일" },
      { word: "日本", reading: "にほん", meaning: "일본" }
    ]
  },
  {
    id: 17,
    kanji: "月",
    meaning: "달, 월",
    sound: "월",
    kunyomi: "つき (tsuki)",
    onyomi: "ゲツ, ガツ (getsu, gatsu)",
    strokes: 4,
    radical: "月 (달월)",
    category: "시간/날짜",
    tip: "밤하늘에 떠 있는 초승달의 모양을 본떠 '달, 개월, 월요일'을 뜻합니다.",
    examples: [
      { word: "月曜日", reading: "げつようび", meaning: "월요일" },
      { word: "今月", reading: "こんげつ", meaning: "이번 달" },
      { word: "一ヶ月", reading: "いっかげつ", meaning: "1개월" }
    ]
  },
  {
    id: 18,
    kanji: "火",
    meaning: "불",
    sound: "화",
    kunyomi: "ひ, -び, ほ- (hi)",
    onyomi: "カ (ka)",
    strokes: 4,
    radical: "火 (불화)",
    category: "시간/날짜",
    tip: "장작 위로 활활 타오르는 불꽃의 모양을 본떠 '불, 화요일'을 의미합니다.",
    examples: [
      { word: "火曜日", reading: "かようび", meaning: "화요일" },
      { word: "火", reading: "ひ", meaning: "불" },
      { word: "花火", reading: "はなび", meaning: "불꽃놀이" }
    ]
  },
  {
    id: 19,
    kanji: "水",
    meaning: "물",
    sound: "수",
    kunyomi: "みず (mizu)",
    onyomi: "スイ (sui)",
    strokes: 4,
    radical: "水 (물수)",
    category: "시간/날짜",
    tip: "굽이쳐 흘러가는 물줄기와 튀는 물방울의 모양을 본떠 '물, 수요일'을 뜻합니다.",
    examples: [
      { word: "水曜日", reading: "すいようび", meaning: "수요일" },
      { word: "水", reading: "みず", meaning: "물" },
      { word: "水泳", reading: "すいえい", meaning: "수영" }
    ]
  },
  {
    id: 20,
    kanji: "木",
    meaning: "나무",
    sound: "목",
    kunyomi: "き, こ- (ki)",
    onyomi: "ボク, モク (boku, moku)",
    strokes: 4,
    radical: "木 (나무목)",
    category: "시간/날짜",
    tip: "줄기와 가지, 땅속 뿌리를 뻗치고 서 있는 나무 모양을 본떴습니다.",
    examples: [
      { word: "木曜日", reading: "もくようび", meaning: "목요일" },
      { word: "木", reading: "き", meaning: "나무" },
      { word: "木綿", reading: "もめん", meaning: "무명, 면" }
    ]
  },
  {
    id: 21,
    kanji: "金",
    meaning: "쇠, 돈",
    sound: "금",
    kunyomi: "かね, かな- (kane)",
    onyomi: "キン, コン (kin, kon)",
    strokes: 8,
    radical: "金 (쇠금)",
    category: "시간/날짜",
    tip: "흙(土) 속에 묻혀 반짝이는 귀한 광물 덩어리들을 모아 덮어둔 모양입니다.",
    examples: [
      { word: "金曜日", reading: "きんようび", meaning: "금요일" },
      { word: "お金", reading: "おかね", meaning: "돈" },
      { word: "金色", reading: "きんいろ", meaning: "금색" }
    ]
  },
  {
    id: 22,
    kanji: "土",
    meaning: "흙",
    sound: "토",
    kunyomi: "つち (tsuchi)",
    onyomi: "ド, ト (do, to)",
    strokes: 3,
    radical: "土 (흙토)",
    category: "시간/날짜",
    tip: "땅(一) 위로 새싹이나 흙덩이가 솟아오른 모습에서 '흙, 토요일'을 뜻합니다.",
    examples: [
      { word: "土曜日", reading: "どようび", meaning: "토요일" },
      { word: "土", reading: "つち", meaning: "흙" },
      { word: "土地", reading: "とち", meaning: "토지, 땅" }
    ]
  },
  {
    id: 23,
    kanji: "年",
    meaning: "해, 년",
    sound: "년",
    kunyomi: "とし (toshi)",
    onyomi: "ネン (nen)",
    strokes: 6,
    radical: "干 (방패간)",
    category: "시간/날짜",
    tip: "벼 이삭을 사람이 짊어지고 한 해의 추수를 맞이하는 모습에서 '한 해, 나이'를 뜻합니다.",
    examples: [
      { word: "今年", reading: "ことし", meaning: "올해" },
      { word: "去年", reading: "きょねん", meaning: "작년" },
      { word: "一年", reading: "いちねん", meaning: "1년" }
    ]
  },
  {
    id: 24,
    kanji: "時",
    meaning: "때, 시간",
    sound: "시",
    kunyomi: "とき, -どき (toki)",
    onyomi: "ジ (ji)",
    strokes: 10,
    radical: "日 (날일)",
    category: "시간/날짜",
    tip: "태양(日)의 움직임에 맞추어 절(寺)의 종이 울리며 시간을 알리는 모양입니다.",
    examples: [
      { word: "時間", reading: "じかん", meaning: "시간" },
      { word: "時", reading: "とき", meaning: "때, 때로는" },
      { word: "時計", reading: "とけい", meaning: "시계" }
    ]
  },
  {
    id: 25,
    kanji: "分",
    meaning: "나눌, 분",
    sound: "분",
    kunyomi: "わ・ける, わ・かる (wakeru, wakaru)",
    onyomi: "ブン, フン, プン (bun, fun, pun)",
    strokes: 4,
    radical: "刀 (칼도)",
    category: "시간/날짜",
    tip: "칼(刀)로 물건을 여덟(八) 갈래로 '나누다', 시간의 작은 단위인 '분'을 뜻합니다.",
    examples: [
      { word: "五分", reading: "ごふん", meaning: "5분" },
      { word: "分かる", reading: "わかる", meaning: "알다, 이해하다" },
      { word: "気分", reading: "きぶん", meaning: "기분" }
    ]
  },
  {
    id: 26,
    kanji: "間",
    meaning: "사이, 동안",
    sound: "간",
    kunyomi: "あいだ, ま (aida, ma)",
    onyomi: "カン, ケン (kan, ken)",
    strokes: 12,
    radical: "門 (문문)",
    category: "시간/날짜",
    tip: "닫힌 문(門) 틈 사이로 햇빛(日)이 비치는 틈새에서 '사이, 틈, 동안'을 뜻합니다.",
    examples: [
      { word: "間", reading: "あいだ", meaning: "사이, 동안" },
      { word: "一時間", reading: "いちじかん", meaning: "1시간" },
      { word: "間に合う", reading: "まにあう", meaning: "시간에 맞추다" }
    ]
  },
  {
    id: 27,
    kanji: "今",
    meaning: "이제, 지금",
    sound: "금",
    kunyomi: "いま (ima)",
    onyomi: "コン, キン (kon, kin)",
    strokes: 4,
    radical: "人 (사람인)",
    category: "시간/날짜",
    tip: "그릇 뚜껑을 덮듯 바로 눈앞에 닥친 바로 이 순간 '지금, 이제'를 뜻합니다.",
    examples: [
      { word: "今", reading: "いま", meaning: "지금" },
      { word: "今日", reading: "きょう", meaning: "오늘" },
      { word: "今週", reading: "こんしゅう", meaning: "이번 주" }
    ]
  },
  {
    id: 28,
    kanji: "毎",
    meaning: "매양, 마다",
    sound: "매",
    kunyomi: "ごと (goto)",
    onyomi: "マイ (mai)",
    strokes: 6,
    radical: "毋 (말무)",
    category: "시간/날짜",
    tip: "어머니(母)가 비녀를 꽂고 매일매일 자식을 돌보듯 반복되는 '매양, 매번'입니다.",
    examples: [
      { word: "毎日", reading: "まいにち", meaning: "매일" },
      { word: "毎週", reading: "まいしゅう", meaning: "매주" },
      { word: "毎朝", reading: "まいあさ", meaning: "매일 아침" }
    ]
  },

  // 3. 방향 & 위치 (12자)
  {
    id: 29,
    kanji: "上",
    meaning: "위",
    sound: "상",
    kunyomi: "うえ, あ・がる, のぼ・る (ue, agaru)",
    onyomi: "ジョウ, ショウ (jou)",
    strokes: 3,
    radical: "一 (한일)",
    category: "방향/위치",
    tip: "기준선(一) 위에 점이나 선이 놓여 '위쪽'을 가리키는 지사문자입니다.",
    examples: [
      { word: "上", reading: "うえ", meaning: "위" },
      { word: "上手", reading: "じょうず", meaning: "능숙함, 잘함" },
      { word: "上がる", reading: "あがる", meaning: "올라가다" }
    ]
  },
  {
    id: 30,
    kanji: "下",
    meaning: "아래",
    sound: "하",
    kunyomi: "した, さ・がる, くだ・る (shita, sagaru)",
    onyomi: "カ, ゲ (ka, ge)",
    strokes: 3,
    radical: "一 (한일)",
    category: "방향/위치",
    tip: "기준선(一) 아래로 획이 내려가 있어 '아래쪽, 밑'을 가리킵니다.",
    examples: [
      { word: "下", reading: "した", meaning: "아래, 밑" },
      { word: "下手", reading: "へた", meaning: "서투름, 못함" },
      { word: "地下鉄", reading: "ちかてつ", meaning: "지하철" }
    ]
  },
  {
    id: 31,
    kanji: "中",
    meaning: "가운데, 안",
    sound: "중",
    kunyomi: "なか (naka)",
    onyomi: "チュウ, ジュウ (chuu, juu)",
    strokes: 4,
    radical: "丨 (뚫을곤)",
    category: "방향/위치",
    tip: "네모난 과녁(口)의 한가운데를 화살(丨)이 관통하는 모양에서 '가운데, 안'입니다.",
    examples: [
      { word: "中", reading: "なか", meaning: "가운데, 안" },
      { word: "一日中", reading: "いちにちじゅう", meaning: "하루 종일" },
      { word: "中学校", reading: "ちゅうがっこう", meaning: "중학교" }
    ]
  },
  {
    id: 32,
    kanji: "外",
    meaning: "바깥, 밖",
    sound: "외",
    kunyomi: "そと, ほか, はず・す (soto, hoka)",
    onyomi: "ガイ, ゲ (gai, ge)",
    strokes: 5,
    radical: "夕 (저녁석)",
    category: "방향/위치",
    tip: "저녁(夕)에 점(卜)을 치는 것은 일반적인 규범에서 '벗어난, 바깥'의 일입니다.",
    examples: [
      { word: "外", reading: "そと", meaning: "바깥, 밖" },
      { word: "外国", reading: "がいこく", meaning: "외국" },
      { word: "外国人", reading: "がいこくじん", meaning: "외국인" }
    ]
  },
  {
    id: 33,
    kanji: "前",
    meaning: "앞, 전",
    sound: "전",
    kunyomi: "まえ (mae)",
    onyomi: "ゼン (zen)",
    strokes: 9,
    radical: "刀 (칼도)",
    category: "방향/위치",
    tip: "배를 타고 앞으로 나아가는 모습과 칼의 형상이 합쳐져 '앞, 이전'을 뜻합니다.",
    examples: [
      { word: "前", reading: "まえ", meaning: "앞, 전" },
      { word: "午前", reading: "ごぜん", meaning: "오전" },
      { word: "名前", reading: "なまえ", meaning: "이름" }
    ]
  },
  {
    id: 34,
    kanji: "後",
    meaning: "뒤, 후",
    sound: "후",
    kunyomi: "うし・ろ, あと, のち (ushiro, ato)",
    onyomi: "ゴ, コウ (go, kou)",
    strokes: 9,
    radical: "彳 (두인변)",
    category: "방향/위치",
    tip: "발걸음(彳)이 느려 실(幺)에 묶인 발(夊)처럼 뒤처져 따라가는 모양에서 '뒤'입니다.",
    examples: [
      { word: "後ろ", reading: "うしろ", meaning: "뒤" },
      { word: "後で", reading: "あとで", meaning: "나중에" },
      { word: "午後", reading: "ごご", meaning: "오후" }
    ]
  },
  {
    id: 35,
    kanji: "左",
    meaning: "왼",
    sound: "좌",
    kunyomi: "ひだり (hidari)",
    onyomi: "サ (sa)",
    strokes: 5,
    radical: "工 (장인공)",
    category: "방향/위치",
    tip: "왼손으로 도구(工)를 받쳐 들고 일하는 모습에서 '왼쪽'을 뜻합니다.",
    examples: [
      { word: "左", reading: "ひだり", meaning: "왼쪽" },
      { word: "左手", reading: "ひだりて", meaning: "왼손" },
      { word: "左右", reading: "さゆう", meaning: "좌우" }
    ]
  },
  {
    id: 36,
    kanji: "右",
    meaning: "오른",
    sound: "우",
    kunyomi: "みぎ (migi)",
    onyomi: "ウ, ユウ (u, yuu)",
    strokes: 5,
    radical: "口 (입구)",
    category: "방향/위치",
    tip: "오른손을 입(口)으로 가져가 밥을 먹는 모습에서 '오른쪽'을 뜻합니다.",
    examples: [
      { word: "右", reading: "みぎ", meaning: "오른쪽" },
      { word: "右手", reading: "みぎて", meaning: "오른손" },
      { word: "右側", reading: "みぎがわ", meaning: "우측, 오른쪽" }
    ]
  },
  {
    id: 37,
    kanji: "東",
    meaning: "동녘",
    sound: "동",
    kunyomi: "ひがし (higashi)",
    onyomi: "トウ (tou)",
    strokes: 8,
    radical: "木 (나무목)",
    category: "방향/위치",
    tip: "우거진 나무(木) 사이로 해(日)가 둥실 떠오르는 방위인 '동쪽'입니다.",
    examples: [
      { word: "東", reading: "ひがし", meaning: "동쪽" },
      { word: "東京", reading: "とうきょう", meaning: "도쿄" },
      { word: "東口", reading: "ひがしぐち", meaning: "동쪽 출구" }
    ]
  },
  {
    id: 38,
    kanji: "西",
    meaning: "서녘",
    sound: "서",
    kunyomi: "にし (nishi)",
    onyomi: "セイ, サイ (sei, sai)",
    strokes: 6,
    radical: "西 (덮을아)",
    category: "방향/위치",
    tip: "새가 해 질 녘 둥지에 깃들어 쉬는 모습을 본떠 해가 지는 '서쪽'을 뜻합니다.",
    examples: [
      { word: "西", reading: "にし", meaning: "서쪽" },
      { word: "西洋", reading: "せいよう", meaning: "서양" },
      { word: "西口", reading: "にしぐち", meaning: "서쪽 출구" }
    ]
  },
  {
    id: 39,
    kanji: "南",
    meaning: "남녘",
    sound: "남",
    kunyomi: "みなみ (minami)",
    onyomi: "ナン (nan)",
    strokes: 9,
    radical: "十 (열십)",
    category: "방향/위치",
    tip: "따뜻한 남쪽 지방의 종 모양 타악기를 걸어놓은 모습에서 '남쪽'을 뜻합니다.",
    examples: [
      { word: "南", reading: "みなみ", meaning: "남쪽" },
      { word: "南口", reading: "みなみぐち", meaning: "남쪽 출구" },
      { word: "東南アジア", reading: "とうなんあじあ", meaning: "동남아시아" }
    ]
  },
  {
    id: 40,
    kanji: "北",
    meaning: "북녘",
    sound: "북",
    kunyomi: "きた (kita)",
    onyomi: "ホク (hoku)",
    strokes: 5,
    radical: "匕 (비수비)",
    category: "방향/위치",
    tip: "두 사람이 추운 바람을 피해 등을 맞대고 있는 모습에서 추운 '북쪽'을 뜻합니다.",
    examples: [
      { word: "北", reading: "きた", meaning: "북쪽" },
      { word: "北海道", reading: "ほっかいどう", meaning: "홋카이도" },
      { word: "北口", reading: "きたぐち", meaning: "북쪽 출구" }
    ]
  },

  // 4. 사람 & 가족 & 대명사 (8자)
  {
    id: 41,
    kanji: "人",
    meaning: "사람",
    sound: "인",
    kunyomi: "ひと (hito)",
    onyomi: "ジン, ニン (jin, nin)",
    strokes: 2,
    radical: "人 (사람인)",
    category: "사람/가족",
    tip: "두 다리를 벌리고 서 있는 사람의 옆모습을 본떠 만든 글자입니다.",
    examples: [
      { word: "人", reading: "ひと", meaning: "사람" },
      { word: "日本人", reading: "にほんじん", meaning: "일본인" },
      { word: "三人", reading: "さんにん", meaning: "세 사람" }
    ]
  },
  {
    id: 42,
    kanji: "男",
    meaning: "사내, 남자",
    sound: "남",
    kunyomi: "おとこ (otoko)",
    onyomi: "ダン, ナン (dan, nan)",
    strokes: 7,
    radical: "田 (밭전)",
    category: "사람/가족",
    tip: "밭(田)에서 쟁기를 들고 힘(力)써 농사짓는 사람인 '남자'입니다.",
    examples: [
      { word: "男", reading: "おとこ", meaning: "남자" },
      { word: "男の子", reading: "おとこのこ", meaning: "남자아이" },
      { word: "男性", reading: "だんせい", meaning: "남성" }
    ]
  },
  {
    id: 43,
    kanji: "女",
    meaning: "계집, 여자",
    sound: "여",
    kunyomi: "おんな, め (onna)",
    onyomi: "ジョ, ニョ (jo, nyo)",
    strokes: 3,
    radical: "女 (계집녀)",
    category: "사람/가족",
    tip: "소매를 다소곳이 모으고 무릎 꿇고 앉아 있는 여성의 고운 자태를 본떴습니다.",
    examples: [
      { word: "女", reading: "おんな", meaning: "여자" },
      { word: "女の子", reading: "おんなのこ", meaning: "여자아이" },
      { word: "女性", reading: "じょせい", meaning: "여성" }
    ]
  },
  {
    id: 44,
    kanji: "子",
    meaning: "아들, 아이",
    sound: "자",
    kunyomi: "こ (ko)",
    onyomi: "シ, ス (shi, su)",
    strokes: 3,
    radical: "子 (아들자)",
    category: "사람/가족",
    tip: "포대기에 싸여 머리를 흔들며 양팔을 벌린 어린 '아이'의 모습입니다.",
    examples: [
      { word: "子", reading: "こ", meaning: "아이, 자식" },
      { word: "子供", reading: "こども", meaning: "어린이, 아이" },
      { word: "様子", reading: "ようす", meaning: "모습, 상태" }
    ]
  },
  {
    id: 45,
    kanji: "父",
    meaning: "아비, 아버지",
    sound: "부",
    kunyomi: "ちち (chichi)",
    onyomi: "フ (fu)",
    strokes: 4,
    radical: "父 (아비부)",
    category: "사람/가족",
    tip: "손에 돌도끼나 지휘봉을 쥐고 가족을 인도하는 권위 있는 '아버지'를 나타냅니다.",
    examples: [
      { word: "父", reading: "ちち", meaning: "아버지 (자신의)" },
      { word: "お父さん", reading: "おとうさん", meaning: "아버지 (존칭)" },
      { word: "父母", reading: "ふぼ", meaning: "부모" }
    ]
  },
  {
    id: 46,
    kanji: "母",
    meaning: "어미, 어머니",
    sound: "모",
    kunyomi: "はは (haha)",
    onyomi: "ボ (bo)",
    strokes: 5,
    radical: "毋 (말무)",
    category: "사람/가족",
    tip: "아이에게 젖을 먹이기 위해 두 가슴에 점(젖꼭지)이 도드라진 '어머니'의 모습입니다.",
    examples: [
      { word: "母", reading: "はは", meaning: "어머니 (자신의)" },
      { word: "お母さん", reading: "おかあさん", meaning: "어머니 (존칭)" },
      { word: "母国語", reading: "ぼこくご", meaning: "모국어" }
    ]
  },
  {
    id: 47,
    kanji: "友",
    meaning: "벗, 친구",
    sound: "우",
    kunyomi: "とも (tomo)",
    onyomi: "ユウ (yuu)",
    strokes: 4,
    radical: "又 (또우)",
    category: "사람/가족",
    tip: "두 사람의 오른손(又)이 서로 다정하게 겹쳐 잡고 있는 '친구, 벗'입니다.",
    examples: [
      { word: "友達", reading: "ともだち", meaning: "친구" },
      { word: "友人", reading: "ゆうじん", meaning: "친구, 벗" },
      { word: "親友", reading: "しんゆう", meaning: "친한 친구, 절친" }
    ]
  },
  {
    id: 48,
    kanji: "何",
    meaning: "어찌, 무엇",
    sound: "하",
    kunyomi: "なに, なん (nani, nan)",
    onyomi: "カ (ka)",
    strokes: 7,
    radical: "人 (사람인)",
    category: "사람/가족",
    tip: "사람(亻)이 어깨에 짐(可)을 메고 '무엇인가, 어찌할까' 묻는 모양입니다.",
    examples: [
      { word: "何", reading: "なに / なん", meaning: "무엇" },
      { word: "何時", reading: "なんじ", meaning: "몇 시" },
      { word: "何人", reading: "なんにん", meaning: "몇 명" }
    ]
  },

  // 5. 신체 부위 (5자)
  {
    id: 49,
    kanji: "目",
    meaning: "눈",
    sound: "목",
    kunyomi: "め, ま- (me)",
    onyomi: "モク, ボク (moku)",
    strokes: 5,
    radical: "目 (눈목)",
    category: "신체",
    tip: "사람 눈동자와 눈꺼풀의 윤곽을 세로로 세워 표현한 글자입니다.",
    examples: [
      { word: "目", reading: "め", meaning: "눈" },
      { word: "一日目", reading: "いちにちめ", meaning: "첫째 날" },
      { word: "目的", reading: "もくてき", meaning: "목적" }
    ]
  },
  {
    id: 50,
    kanji: "耳",
    meaning: "귀",
    sound: "이",
    kunyomi: "みみ (mimi)",
    onyomi: "ジ (ji)",
    strokes: 6,
    radical: "耳 (귀이)",
    category: "신체",
    tip: "귓바퀴와 귓불 등 사람 귀의 굴곡진 외형을 그대로 본뜬 상형문자입니다.",
    examples: [
      { word: "耳", reading: "みみ", meaning: "귀" },
      { word: "初耳", reading: "はつみみ", meaning: "처음 듣는 일" },
      { word: "耳鼻科", reading: "じびか", meaning: "이비인후과" }
    ]
  },
  {
    id: 51,
    kanji: "手",
    meaning: "손",
    sound: "수",
    kunyomi: "て, た- (te)",
    onyomi: "シュ (shu)",
    strokes: 4,
    radical: "手 (손수)",
    category: "신체",
    tip: "다섯 손가락을 쫙 펴고 손목으로 이어지는 손의 모양을 본떴습니다.",
    examples: [
      { word: "手", reading: "て", meaning: "손" },
      { word: "手紙", reading: "てがみ", meaning: "편지" },
      { word: "歌手", reading: "かしゅ", meaning: "가수" }
    ]
  },
  {
    id: 52,
    kanji: "足",
    meaning: "발, 족할",
    sound: "족",
    kunyomi: "あし, た・りる (ashi, tariru)",
    onyomi: "ソク (soku)",
    strokes: 7,
    radical: "足 (발족)",
    category: "신체",
    tip: "무릎(口) 아래로 발목과 발바닥이 땅을 딛고 튼튼히 서 있는 모습입니다.",
    examples: [
      { word: "足", reading: "あし", meaning: "발, 다리" },
      { word: "足りる", reading: "たりる", meaning: "충분하다, 족하다" },
      { word: "遠足", reading: "えんそく", meaning: "소풍" }
    ]
  },
  {
    id: 53,
    kanji: "口",
    meaning: "입",
    sound: "구",
    kunyomi: "くち, ぐち (kuchi)",
    onyomi: "コウ, ク (kou, ku)",
    strokes: 3,
    radical: "口 (입구)",
    category: "신체",
    tip: "벌리고 있는 사람의 입 모양을 네모나게 단순화하여 본뜬 글자입니다.",
    examples: [
      { word: "口", reading: "くち", meaning: "입" },
      { word: "入口", reading: "いりぐち", meaning: "입구" },
      { word: "人口", reading: "じんこう", meaning: "인구" }
    ]
  },

  // 6. 자연 & 환경 & 날씨 (7자)
  {
    id: 54,
    kanji: "山",
    meaning: "산",
    sound: "산",
    kunyomi: "やま (yama)",
    onyomi: "サン, ザン (san, zan)",
    strokes: 3,
    radical: "山 (산산)",
    category: "자연/환경",
    tip: "솟아오른 세 개의 뾰족한 산봉우리를 본떠 '산'을 표현했습니다.",
    examples: [
      { word: "山", reading: "やま", meaning: "산" },
      { word: "富士山", reading: "ふじさん", meaning: "후지산" },
      { word: "火山", reading: "かざん", meaning: "화산" }
    ]
  },
  {
    id: 55,
    kanji: "川",
    meaning: "내, 시내",
    sound: "천",
    kunyomi: "かわ, がわ (kawa)",
    onyomi: "セン (sen)",
    strokes: 3,
    radical: "川 (내천)",
    category: "자연/환경",
    tip: "양쪽 언덕 사이로 세 줄기 물길이 굽이쳐 흘러내리는 강물의 모습입니다.",
    examples: [
      { word: "川", reading: "かわ", meaning: "강, 시내" },
      { word: "小川", reading: "おがわ", meaning: "실개천, 시냇물" },
      { word: "河川", reading: "かせん", meaning: "하천" }
    ]
  },
  {
    id: 56,
    kanji: "天",
    meaning: "하늘",
    sound: "천",
    kunyomi: "あめ, あま (ame)",
    onyomi: "テン (ten)",
    strokes: 4,
    radical: "大 (큰대)",
    category: "자연/환경",
    tip: "사람(大)의 머리 위에 펼쳐진 광대무변한 넓은 '하늘'을 뜻합니다.",
    examples: [
      { word: "天気", reading: "てんき", meaning: "날씨" },
      { word: "天ぷら", reading: "てんぷら", meaning: "튀김" },
      { word: "天国", reading: "てんごく", meaning: "천국" }
    ]
  },
  {
    id: 57,
    kanji: "気",
    meaning: "기운, 기",
    sound: "기",
    kunyomi: "いき (iki)",
    onyomi: "キ, ケ (ki, ke)",
    strokes: 6,
    radical: "气 (기운기)",
    category: "자연/환경",
    tip: "따뜻한 김이 구름처럼 모락모락 피어오르는 보이지 않는 생명의 에너지 '기운'입니다.",
    examples: [
      { word: "元気", reading: "げんき", meaning: "건강함, 원기" },
      { word: "天気", reading: "てんき", meaning: "날씨" },
      { word: "気持ち", reading: "きもち", meaning: "기분, 마음" }
    ]
  },
  {
    id: 58,
    kanji: "雨",
    meaning: "비",
    sound: "우",
    kunyomi: "あめ, あま- (ame)",
    onyomi: "ウ (u)",
    strokes: 8,
    radical: "雨 (비우)",
    category: "자연/환경",
    tip: "하늘 구름(一, 冂) 아래로 대지 위에 후두둑 떨어지는 빗방울 모양입니다.",
    examples: [
      { word: "雨", reading: "あめ", meaning: "비" },
      { word: "大雨", reading: "おおあめ", meaning: "폭우, 큰비" },
      { word: "雨期", reading: "うき", meaning: "우기" }
    ]
  },
  {
    id: 59,
    kanji: "花",
    meaning: "꽃",
    sound: "화",
    kunyomi: "はな (hana)",
    onyomi: "カ, ケ (ka, ke)",
    strokes: 7,
    radical: "艸 (초두머리)",
    category: "자연/환경",
    tip: "풀(艹)이 자라 아름답게 변화(化)하여 피어난 '꽃'입니다.",
    examples: [
      { word: "花", reading: "はな", meaning: "꽃" },
      { word: "花火", reading: "はなび", meaning: "불꽃놀이" },
      { word: "花瓶", reading: "かびん", meaning: "꽃병" }
    ]
  },
  {
    id: 60,
    kanji: "空",
    meaning: "빌, 하늘",
    sound: "공",
    kunyomi: "そら, あ・く, から (sora, aku, kara)",
    onyomi: "クウ (kuu)",
    strokes: 8,
    radical: "穴 (구멍혈)",
    category: "자연/환경",
    tip: "동굴 구멍(穴)을 공구(工)로 파내어 속이 텅 '비어있음', 높고 맑은 '하늘'을 뜻합니다.",
    examples: [
      { word: "空", reading: "そら", meaning: "하늘" },
      { word: "空気", reading: "くうき", meaning: "공기" },
      { word: "空港", reading: "くうこう", meaning: "공항" }
    ]
  },

  // 7. 필수 동사 (17자)
  {
    id: 61,
    kanji: "行",
    meaning: "갈, 다닐",
    sound: "행",
    kunyomi: "い・く, ゆ・く, おこな・う (iku, yuku)",
    onyomi: "コウ, ギョウ (kou, gyou)",
    strokes: 6,
    radical: "行 (다닐행)",
    category: "동작/동사",
    tip: "사람과 마차가 오가는 사거리 길모양을 본떠 '가다, 다니다, 행하다'를 나타냅니다.",
    examples: [
      { word: "行く", reading: "いく", meaning: "가다" },
      { word: "銀行", reading: "ぎんこう", meaning: "은행" },
      { word: "旅行", reading: "りょこう", meaning: "여행" }
    ]
  },
  {
    id: 62,
    kanji: "来",
    meaning: "올",
    sound: "래",
    kunyomi: "く・る, きた・る (kuru, kitaru)",
    onyomi: "ライ (rai)",
    strokes: 7,
    radical: "木 (나무목)",
    category: "동작/동사",
    tip: "보리 이삭이 자라 하늘의 은혜가 우리에게 '오다'라는 뜻으로 발전했습니다.",
    examples: [
      { word: "来る", reading: "くる", meaning: "오다" },
      { word: "来年", reading: "らいねん", meaning: "내년" },
      { word: "来週", reading: "らいしゅう", meaning: "다음 주" }
    ]
  },
  {
    id: 63,
    kanji: "見",
    meaning: "볼",
    sound: "견",
    kunyomi: "み・る, み・える, み・せる (miru, mieru)",
    onyomi: "ケン (ken)",
    strokes: 7,
    radical: "見 (볼견)",
    category: "동작/동사",
    tip: "사람의 다리(儿) 위에 커다란 눈(目)을 강조하여 사물을 똑똑히 '보다'입니다.",
    examples: [
      { word: "見る", reading: "みる", meaning: "보다" },
      { word: "見える", reading: "みえる", meaning: "보이다" },
      { word: "意見", reading: "いけん", meaning: "의견" }
    ]
  },
  {
    id: 64,
    kanji: "聞",
    meaning: "들을",
    sound: "문",
    kunyomi: "き・く, き・こえる (kiku, kikoeru)",
    onyomi: "ブン, モン (bun, mon)",
    strokes: 14,
    radical: "耳 (귀이)",
    category: "동작/동사",
    tip: "문(門) 틈에 귀(耳)를 대고 바깥에서 들려오는 소리를 집중해서 '듣다'입니다.",
    examples: [
      { word: "聞く", reading: "きく", meaning: "듣다, 묻다" },
      { word: "聞こえる", reading: "きこえる", meaning: "들리다" },
      { word: "新聞", reading: "しんぶん", meaning: "신문" }
    ]
  },
  {
    id: 65,
    kanji: "言",
    meaning: "말씀, 말할",
    sound: "언",
    kunyomi: "い・う, こと (iu, koto)",
    onyomi: "ゲン, ゴン (gen, gon)",
    strokes: 7,
    radical: "言 (말씀언)",
    category: "동작/동사",
    tip: "입(口) 위에 혀와 소리 파동이 겹쳐 나오는 모양에서 '말하다, 말씀'을 뜻합니다.",
    examples: [
      { word: "言う", reading: "いう", meaning: "말하다" },
      { word: "言葉", reading: "ことば", meaning: "말, 단어" },
      { word: "方言", reading: "ほうげん", meaning: "방언, 사투리" }
    ]
  },
  {
    id: 66,
    kanji: "話",
    meaning: "이야기할",
    sound: "화",
    kunyomi: "はな・す, はなし (hanasu, hanashi)",
    onyomi: "ワ (wa)",
    strokes: 13,
    radical: "言 (말씀언)",
    category: "동작/동사",
    tip: "말(言)을 할 때 혀(舌)를 부지런히 움직여 정답게 '이야기하다'입니다.",
    examples: [
      { word: "話す", reading: "はなす", meaning: "말하다, 이야기하다" },
      { word: "話", reading: "はなし", meaning: "이야기" },
      { word: "電話", reading: "でんわ", meaning: "전화" }
    ]
  },
  {
    id: 67,
    kanji: "読",
    meaning: "읽을",
    sound: "독",
    kunyomi: "よ・む (yomu)",
    onyomi: "ドク, トク (doku)",
    strokes: 14,
    radical: "言 (말씀언)",
    category: "동작/동사",
    tip: "글자(言)를 보며 뜻을 팔고 사듯(賣/売) 차례로 헤아리며 '읽다'입니다.",
    examples: [
      { word: "読む", reading: "よむ", meaning: "읽다" },
      { word: "読書", reading: "どくしょ", meaning: "독서" },
      { word: "音読", reading: "おんどく", meaning: "음독, 소리 내어 읽기" }
    ]
  },
  {
    id: 68,
    kanji: "書",
    meaning: "쓸, 글",
    sound: "서",
    kunyomi: "か・く (kaku)",
    onyomi: "ショ (sho)",
    strokes: 10,
    radical: "曰 (가로왈)",
    category: "동작/동사",
    tip: "손에 붓(聿)을 쥐고 먹물을 묻혀 종이(曰) 위에 글씨를 '쓰다'입니다.",
    examples: [
      { word: "書く", reading: "かく", meaning: "쓰다" },
      { word: "辞書", reading: "じしょ", meaning: "사전" },
      { word: "図書館", reading: "としょかん", meaning: "도서관" }
    ]
  },
  {
    id: 69,
    kanji: "買",
    meaning: "살",
    sound: "매",
    kunyomi: "か・う (kau)",
    onyomi: "バイ (bai)",
    strokes: 12,
    radical: "貝 (조개패)",
    category: "동작/동사",
    tip: "돈으로 쓰이던 조개(貝)를 그물망 바구니에 담아 물건을 '사다'입니다.",
    examples: [
      { word: "買う", reading: "かう", meaning: "사다" },
      { word: "買い物", reading: "かいもの", meaning: "쇼핑, 장보기" },
      { word: "売買", reading: "ばいばい", meaning: "매매, 사고팖" }
    ]
  },
  {
    id: 70,
    kanji: "食",
    meaning: "밥, 먹을",
    sound: "식",
    kunyomi: "た・べる, く・う (taberu, kuu)",
    onyomi: "ショク, ジキ (shoku, jiki)",
    strokes: 9,
    radical: "食 (밥식)",
    category: "동작/동사",
    tip: "뚜껑 덮인 밥그릇에 담긴 따뜻한 음식을 입으로 맛있게 '먹다'입니다.",
    examples: [
      { word: "食べる", reading: "たべる", meaning: "먹다" },
      { word: "食事", reading: "しょくじ", meaning: "식사" },
      { word: "食堂", reading: "しょくどう", meaning: "식당" }
    ]
  },
  {
    id: 71,
    kanji: "飲",
    meaning: "마실",
    sound: "음",
    kunyomi: "の・む (nomu)",
    onyomi: "イン (in)",
    strokes: 12,
    radical: "食 (밥식)",
    category: "동작/동사",
    tip: "음식(食) 앞에서 입을 하품하듯 크게 벌리고(欠) 꿀꺽 '마시다'입니다.",
    examples: [
      { word: "飲む", reading: "のむ", meaning: "마시다" },
      { word: "飲み物", reading: "のみもの", meaning: "음료수" },
      { word: "飲食店", reading: "いんしょくてん", meaning: "음식점" }
    ]
  },
  {
    id: 72,
    kanji: "会",
    meaning: "모일, 만날",
    sound: "회",
    kunyomi: "あ・う (au)",
    onyomi: "カイ, エ (kai, e)",
    strokes: 6,
    radical: "人 (사람인)",
    category: "동작/동사",
    tip: "지붕 아래 사람들이 다 함께 모여 얼굴을 마주보고 '만나다'입니다.",
    examples: [
      { word: "会う", reading: "あう", meaning: "만나다" },
      { word: "会社", reading: "かいしゃ", meaning: "회사" },
      { word: "会話", reading: "かいわ", meaning: "회화" }
    ]
  },
  {
    id: 73,
    kanji: "休",
    meaning: "쉴",
    sound: "휴",
    kunyomi: "やす・む, やす・まる (yasumu)",
    onyomi: "キュウ (kyuu)",
    strokes: 6,
    radical: "人 (사람인)",
    category: "동작/동사",
    tip: "일하던 사람(亻)이 그늘진 나무(木)에 편안히 기대어 '쉬다'입니다.",
    examples: [
      { word: "休む", reading: "やすむ", meaning: "쉬다, 결석하다" },
      { word: "休み", reading: "やすみ", meaning: "휴일, 방학" },
      { word: "休日", reading: "きゅうじつ", meaning: "휴일" }
    ]
  },
  {
    id: 74,
    kanji: "立",
    meaning: "설",
    sound: "립",
    kunyomi: "た・つ, た・てる (tatsu, tateru)",
    onyomi: "リツ, リュウ (ritsu)",
    strokes: 5,
    radical: "立 (설립)",
    category: "동작/동사",
    tip: "사람이 땅(一) 위에 두 발을 단단히 딛고 똑바로 '서다'입니다.",
    examples: [
      { word: "立つ", reading: "たつ", meaning: "서다, 일어나다" },
      { word: "役に立つ", reading: "やくにたつ", meaning: "도움이 되다" },
      { word: "国立", reading: "こくりつ", meaning: "국립" }
    ]
  },
  {
    id: 75,
    kanji: "生",
    meaning: "날, 살",
    sound: "생",
    kunyomi: "い・きる, う・まれる, なま (ikiru, umareru, nama)",
    onyomi: "セイ, ショウ (sei, shou)",
    strokes: 5,
    radical: "生 (날생)",
    category: "동작/동사",
    tip: "흙을 뚫고 푸른 새싹이 파릇파릇 돋아나듯 '태어나다, 살아가다'입니다.",
    examples: [
      { word: "生きる", reading: "いきる", meaning: "살다" },
      { word: "生まれる", reading: "うまれる", meaning: "태어나다" },
      { word: "先生", reading: "せんせい", meaning: "선생님" }
    ]
  },
  {
    id: 76,
    kanji: "入",
    meaning: "들, 넣을",
    sound: "입",
    kunyomi: "はい・る, い・れる (hairu, ireru)",
    onyomi: "ニュウ (nyuu)",
    strokes: 2,
    radical: "入 (들입)",
    category: "동작/동사",
    tip: "문 안쪽으로 뾰족하게 몸을 들이밀며 방 안으로 쏙 '들어가다'입니다.",
    examples: [
      { word: "入る", reading: "はいる", meaning: "들어가다" },
      { word: "入れる", reading: "いれる", meaning: "넣다" },
      { word: "入口", reading: "いりぐち", meaning: "입구" }
    ]
  },
  {
    id: 77,
    kanji: "出",
    meaning: "날, 나갈",
    sound: "출",
    kunyomi: "で・る, だ・す (deru, dasu)",
    onyomi: "シュツ, スイ (shutsu)",
    strokes: 5,
    radical: "凵 (위튼입구몸)",
    category: "동작/동사",
    tip: "싹이 흙구덩이에서 겹쳐 솟구쳐 밖으로 쑥 '나오다, 나가다'입니다.",
    examples: [
      { word: "出る", reading: "でる", meaning: "나오다, 나가다" },
      { word: "出す", reading: "だす", meaning: "꺼내다, 제출하다" },
      { word: "出口", reading: "でぐち", meaning: "출구" }
    ]
  },

  // 8. 형용사 & 성질 (9자)
  {
    id: 78,
    kanji: "大",
    meaning: "큰",
    sound: "대",
    kunyomi: "おお・きい, おお・いに (ookii)",
    onyomi: "ダイ, タイ (dai, tai)",
    strokes: 3,
    radical: "大 (큰대)",
    category: "형용사/상태",
    tip: "사람이 양팔과 양다리를 최대한 크게 벌려 '크다'를 표현했습니다.",
    examples: [
      { word: "大きい", reading: "おおきい", meaning: "크다" },
      { word: "大学", reading: "だいがく", meaning: "대학교" },
      { word: "大変", reading: "たいへん", meaning: "매우, 힘듦" }
    ]
  },
  {
    id: 79,
    kanji: "小",
    meaning: "작을",
    sound: "소",
    kunyomi: "ちい・さい, こ-, お- (chiisai)",
    onyomi: "ショウ (shou)",
    strokes: 3,
    radical: "小 (작을소)",
    category: "형용사/상태",
    tip: "작은 파편 세 조각으로 나뉘어 잘게 부서진 모양에서 '작다'입니다.",
    examples: [
      { word: "小さい", reading: "ちいさい", meaning: "작다" },
      { word: "小学校", reading: "しょうがっこう", meaning: "초등학교" },
      { word: "小鳥", reading: "ことり", meaning: "작은 새" }
    ]
  },
  {
    id: 80,
    kanji: "高",
    meaning: "높을, 비쌀",
    sound: "고",
    kunyomi: "たか・い, たか・まる (takai)",
    onyomi: "コウ (kou)",
    strokes: 10,
    radical: "高 (높을고)",
    category: "형용사/상태",
    tip: "높은 망루와 누각이 우뚝 솟아 있는 모습에서 '높다, (가격이) 비싸다'입니다.",
    examples: [
      { word: "高い", reading: "たかい", meaning: "높다, 비싸다" },
      { word: "高校", reading: "こうこう", meaning: "고등학교" },
      { word: "円高", reading: "えんだか", meaning: "엔화 강세" }
    ]
  },
  {
    id: 81,
    kanji: "安",
    meaning: "편안, 쌀",
    sound: "안",
    kunyomi: "やす・い (yasui)",
    onyomi: "アン (an)",
    strokes: 6,
    radical: "宀 (갓머리)",
    category: "형용사/상태",
    tip: "지붕 있는 집(宀) 안에 여자(女)가 편안히 머무르는 모양에서 '편안하다, 싸다'입니다.",
    examples: [
      { word: "安い", reading: "やすい", meaning: "싸다" },
      { word: "安心", reading: "あんしん", meaning: "안심" },
      { word: "安全", reading: "あんぜん", meaning: "안전" }
    ]
  },
  {
    id: 82,
    kanji: "新",
    meaning: "새",
    sound: "신",
    kunyomi: "あたら・しい, あら・た (atarashii)",
    onyomi: "シン (shin)",
    strokes: 13,
    radical: "斤 (도끼근)",
    category: "형용사/상태",
    tip: "도끼(斤)로 서서(立) 나무(木)를 베어 새로 만든 나무토막에서 '새롭다'입니다.",
    examples: [
      { word: "新しい", reading: "あたらしい", meaning: "새롭다" },
      { word: "新聞", reading: "しんぶん", meaning: "신문" },
      { word: "新年", reading: "しんねん", meaning: "새해, 신년" }
    ]
  },
  {
    id: 83,
    kanji: "古",
    meaning: "옛",
    sound: "고",
    kunyomi: "ふる・い (furui)",
    onyomi: "コ (ko)",
    strokes: 5,
    radical: "口 (입구)",
    category: "형용사/상태",
    tip: "열(十) 세대 전부터 입(口)으로 전해져 내려오는 '오래된, 옛것'입니다.",
    examples: [
      { word: "古い", reading: "ふるい", meaning: "오래되다, 낡다" },
      { word: "中古", reading: "ちゅうこ", meaning: "중고" },
      { word: "古代", reading: "こだい", meaning: "고대" }
    ]
  },
  {
    id: 84,
    kanji: "長",
    meaning: "길, 우두머리",
    sound: "장",
    kunyomi: "なが・い (nagai)",
    onyomi: "チョウ (chou)",
    strokes: 8,
    radical: "長 (길장)",
    category: "형용사/상태",
    tip: "지팡이를 짚고 긴 수염과 머리카락을 늘어뜨린 노인의 모습에서 '길다'입니다.",
    examples: [
      { word: "長い", reading: "ながい", meaning: "길다" },
      { word: "社長", reading: "しゃちょう", meaning: "사장" },
      { word: "部長", reading: "ぶちょう", meaning: "부장" }
    ]
  },
  {
    id: 85,
    kanji: "多",
    meaning: "많을",
    sound: "다",
    kunyomi: "おお・い (ooi)",
    onyomi: "タ (ta)",
    strokes: 6,
    radical: "夕 (저녁석)",
    category: "형용사/상태",
    tip: "고기 덩어리(夕) 두 개가 위아래로 넉넉하게 겹쳐 있어 양이 '많다'입니다.",
    examples: [
      { word: "多い", reading: "おおい", meaning: "많다" },
      { word: "多少", reading: "たしょう", meaning: "다소, 얼마간" },
      { word: "多分", reading: "たぶん", meaning: "아마, 대개" }
    ]
  },
  {
    id: 86,
    kanji: "少",
    meaning: "적을, 조금",
    sound: "소",
    kunyomi: "すく・ない, すこ・し (sukunai, sukoshi)",
    onyomi: "ショウ (shou)",
    strokes: 4,
    radical: "小 (작을소)",
    category: "형용사/상태",
    tip: "작을 소(小)에 삐침 획을 하나 더해 아주 '적고 조금'임을 나타냈습니다.",
    examples: [
      { word: "少ない", reading: "すくない", meaning: "적다" },
      { word: "少し", reading: "すこし", meaning: "조금" },
      { word: "少年", reading: "しょうねん", meaning: "소년" }
    ]
  },

  // 9. 사물 & 장소 & 사회 생활 (17자)
  {
    id: 87,
    kanji: "白",
    meaning: "흰, 밝을",
    sound: "백",
    kunyomi: "しろ, しろ・い (shiro, shiroi)",
    onyomi: "ハク, ビャク (haku)",
    strokes: 5,
    radical: "白 (흰백)",
    category: "형용사/상태",
    tip: "도정한 흰 쌀알의 단면 또는 햇빛이 반사되어 눈부시게 '하얀' 색입니다.",
    examples: [
      { word: "白い", reading: "しろい", meaning: "하얗다" },
      { word: "白", reading: "しろ", meaning: "흰색" },
      { word: "面白い", reading: "おもしろい", meaning: "재미있다" }
    ]
  },
  {
    id: 88,
    kanji: "学",
    meaning: "배울",
    sound: "학",
    kunyomi: "まな・ぶ (manabu)",
    onyomi: "ガク (gaku)",
    strokes: 8,
    radical: "子 (아들자)",
    category: "사회/장소",
    tip: "지붕(冖) 아래 아이(子)가 양손에 점괘를 쥐고 열심히 '배우다'입니다.",
    examples: [
      { word: "学校", reading: "がっこう", meaning: "학교" },
      { word: "学生", reading: "がくせい", meaning: "학생" },
      { word: "大学", reading: "だいがく", meaning: "대학교" }
    ]
  },
  {
    id: 89,
    kanji: "校",
    meaning: "학교",
    sound: "교",
    kunyomi: "かせ (kase)",
    onyomi: "コウ (kou)",
    strokes: 10,
    radical: "木 (나무목)",
    category: "사회/장소",
    tip: "나무(木)로 지은 건물에 많은 사람이 교차(交)하여 드나드는 '학교'입니다.",
    examples: [
      { word: "学校", reading: "がっこう", meaning: "학교" },
      { word: "高校生", reading: "こうこうせい", meaning: "고등학생" },
      { word: "校長", reading: "こうちょう", meaning: "교장" }
    ]
  },
  {
    id: 90,
    kanji: "先",
    meaning: "먼저, 앞설",
    sound: "선",
    kunyomi: "さき, ま・ず (saki)",
    onyomi: "セン (sen)",
    strokes: 6,
    radical: "儿 (어진사람발)",
    category: "사회/장소",
    tip: "사람(儿)의 발걸음이 앞쪽(之)으로 성큼 앞서 나가는 '먼저'입니다.",
    examples: [
      { word: "先生", reading: "せんせい", meaning: "선생님" },
      { word: "先週", reading: "せんしゅう", meaning: "지난주" },
      { word: "お先に", reading: "おさきに", meaning: "먼저 (갑니다)" }
    ]
  },
  {
    id: 91,
    kanji: "社",
    meaning: "모일, 회사",
    sound: "사",
    kunyomi: "やしろ (yashiro)",
    onyomi: "シャ (sha)",
    strokes: 7,
    radical: "示 (보일시)",
    category: "사회/장소",
    tip: "신을 모시는 제단(示)과 흙(土)의 토지신 앞에 모인 무리 '회사, 사회'입니다.",
    examples: [
      { word: "会社", reading: "かいしゃ", meaning: "회사" },
      { word: "社員", reading: "しゃいん", meaning: "회사원" },
      { word: "神社", reading: "じんじゃ", meaning: "신사" }
    ]
  },
  {
    id: 92,
    kanji: "国",
    meaning: "나라",
    sound: "국",
    kunyomi: "くに (kuni)",
    onyomi: "コク (koku)",
    strokes: 8,
    radical: "囗 (큰입구몸)",
    category: "사회/장소",
    tip: "국경선 성벽(囗)으로 귀한 옥구슬과 영토(玉)를 안전하게 둘러싼 '나라'입니다.",
    examples: [
      { word: "国", reading: "くに", meaning: "나라, 국가" },
      { word: "外国", reading: "がいこく", meaning: "외국" },
      { word: "中国", reading: "ちゅうごく", meaning: "중국" }
    ]
  },
  {
    id: 93,
    kanji: "店",
    meaning: "가게",
    sound: "점",
    kunyomi: "みせ, たな (mise)",
    onyomi: "テン (ten)",
    strokes: 8,
    radical: "广 (엄호)",
    category: "사회/장소",
    tip: "지붕 있는 처마(广) 밑에 깃발(占)을 꽂고 손님을 맞이하는 '가게, 상점'입니다.",
    examples: [
      { word: "店", reading: "みせ", meaning: "가게" },
      { word: "店員", reading: "てんいん", meaning: "점원" },
      { word: "喫茶店", reading: "きっさてん", meaning: "찻집, 카페" }
    ]
  },
  {
    id: 94,
    kanji: "道",
    meaning: "길, 도리",
    sound: "도",
    kunyomi: "みち (michi)",
    onyomi: "ドウ, トウ (dou, tou)",
    strokes: 12,
    radical: "辵 (착)",
    category: "사회/장소",
    tip: "머리(首)로 방향을 생각하며 발걸음(辶)을 옮겨 걷는 '길, 도리'입니다.",
    examples: [
      { word: "道", reading: "みち", meaning: "길, 도로" },
      { word: "水道", reading: "すいどう", meaning: "수도" },
      { word: "柔道", reading: "じゅうどう", meaning: "유도" }
    ]
  },
  {
    id: 95,
    kanji: "駅",
    meaning: "역",
    sound: "역",
    kunyomi: "うまや (umaya)",
    onyomi: "エキ (eki)",
    strokes: 14,
    radical: "馬 (말마)",
    category: "사회/장소",
    tip: "말(馬)을 갈아타며 쉬어가던 곳(尺)이 현대의 기차와 전철 '역'이 되었습니다.",
    examples: [
      { word: "駅", reading: "えき", meaning: "기차역, 전철역" },
      { word: "駅員", reading: "えきいん", meaning: "역무원" },
      { word: "東京駅", reading: "とうきょうえき", meaning: "도쿄역" }
    ]
  },
  {
    id: 96,
    kanji: "車",
    meaning: "수레, 차",
    sound: "차",
    kunyomi: "くるま (kuruma)",
    onyomi: "シャ (sha)",
    strokes: 7,
    radical: "車 (수레차)",
    category: "사회/장소",
    tip: "양쪽 바퀴와 굴대, 짐칸을 위에서 내려다본 수레와 자동차의 모양입니다.",
    examples: [
      { word: "車", reading: "くるま", meaning: "자동차, 수레" },
      { word: "電車", reading: "でんしゃ", meaning: "전철" },
      { word: "自転車", reading: "じてんしゃ", meaning: "자전거" }
    ]
  },
  {
    id: 97,
    kanji: "電",
    meaning: "번개, 전기",
    sound: "전",
    kunyomi: "いなずま (inazuma)",
    onyomi: "デン (den)",
    strokes: 13,
    radical: "雨 (비우)",
    category: "사회/장소",
    tip: "비구름(雨) 사이로 꼬리를 물고 굽이치는 번갯불 모양에서 '전기'입니다.",
    examples: [
      { word: "電車", reading: "でんしゃ", meaning: "전철" },
      { word: "電話", reading: "でんわ", meaning: "전화" },
      { word: "電気", reading: "でんき", meaning: "전기, 전등" }
    ]
  },
  {
    id: 98,
    kanji: "名",
    meaning: "이름",
    sound: "명",
    kunyomi: "な, -な (na)",
    onyomi: "メイ, ミョウ (mei, myou)",
    strokes: 6,
    radical: "口 (입구)",
    category: "사회/장소",
    tip: "어두운 저녁(夕)에는 얼굴이 안 보이니 입(口)으로 자기 '이름'을 밝힙니다.",
    examples: [
      { word: "名前", reading: "なまえ", meaning: "이름" },
      { word: "有名", reading: "ゆうめい", meaning: "유명함" },
      { word: "名字", reading: "みょうじ", meaning: "성씨" }
    ]
  },
  {
    id: 99,
    kanji: "語",
    meaning: "말씀, 말",
    sound: "어",
    kunyomi: "かた・る, かた・らう (kataru)",
    onyomi: "ゴ (go)",
    strokes: 14,
    radical: "言 (말씀언)",
    category: "사회/장소",
    tip: "말씀(言)에 나 오(吾: 다섯 오 + 입 구)를 더해 나의 생각과 뜻을 표현하는 '말, 언어'입니다.",
    examples: [
      { word: "日本語", reading: "にほんご", meaning: "일본어" },
      { word: "英語", reading: "えいご", meaning: "영어" },
      { word: "物語", reading: "ものがたり", meaning: "이야기, 스토리" }
    ]
  },
  {
    id: 100,
    kanji: "本",
    meaning: "근본, 책",
    sound: "본",
    kunyomi: "もと (moto)",
    onyomi: "ホン (hon)",
    strokes: 5,
    radical: "木 (나무목)",
    category: "사회/장소",
    tip: "나무(木)의 밑동 뿌리에 표시(一)를 하여 사물의 '근본, 책'을 뜻합니다.",
    examples: [
      { word: "本", reading: "ほん", meaning: "책" },
      { word: "日本", reading: "にほん", meaning: "일본" },
      { word: "本日", reading: "ほんじつ", meaning: "금일, 오늘" }
    ]
  },
  {
    id: 101,
    kanji: "週",
    meaning: "돌, 주일",
    sound: "주",
    kunyomi: "めぐ・る (meguru)",
    onyomi: "シュウ (shuu)",
    strokes: 11,
    radical: "辵 (착)",
    category: "사회/장소",
    tip: "두루 주(周)와 걸어갈 착(辶)이 합쳐져 7일마다 주기적으로 돌아오는 '주일, 일주일'입니다.",
    examples: [
      { word: "今週", reading: "こんしゅう", meaning: "이번 주" },
      { word: "来週", reading: "らいしゅう", meaning: "다음 주" },
      { word: "一週間", reading: "いっしゅうかん", meaning: "일주일간" }
    ]
  },
  {
    id: 102,
    kanji: "門",
    meaning: "문",
    sound: "문",
    kunyomi: "かど, と (kado, to)",
    onyomi: "モン (mon)",
    strokes: 8,
    radical: "門 (문문)",
    category: "사회/장소",
    tip: "두 짝으로 활짝 열리고 닫히는 큰 대문 기둥과 문짝의 모양을 본떴습니다.",
    examples: [
      { word: "門", reading: "もん", meaning: "문, 대문" },
      { word: "正門", reading: "せいもん", meaning: "정문" },
      { word: "専門", reading: "せんもん", meaning: "전문" }
    ]
  },
  {
    id: 103,
    kanji: "魚",
    meaning: "물고기",
    sound: "어",
    kunyomi: "さかな, うお (sakana, uo)",
    onyomi: "ギョ (gyo)",
    strokes: 11,
    radical: "魚 (물고기어)",
    category: "자연/환경",
    tip: "머리(⺈)와 비늘 덮인 몸통(田), 지느러미와 꼬리(灬)를 지닌 영락없는 '물고기'의 형상입니다.",
    examples: [
      { word: "魚", reading: "さかな", meaning: "물고기, 생선" },
      { word: "金魚", reading: "きんぎょ", meaning: "금붕어" },
      { word: "人魚", reading: "にんぎょ", meaning: "인어" }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JLPT_N5_KANJI };
}
