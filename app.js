/* ─────────────────────────────────────────────────────────────
   러이끄라통 방콕 가이드 — 공용 데이터 · 지도 · 화면 로직
   index.html 이 불러다 씀 · 번역은 i18n.js

   ▶ 내년에 다시 쓰는 법
   1) EVENT 의 연도·날짜를 바꾼다 (러이끄라통 = 태국 음력 12월 보름. 2027년은 11월 13일 토요일)
   2) VENUES 의 period / today / desc / src / ok 를 그해 공식 발표(BMA·TAT)로 고친다
   3) 장소를 빼거나 더하면 지도 핀·목록·칩이 자동으로 바뀐다
   ───────────────────────────────────────────────────────────── */
(function(){
const EVENT={year:2026,date:'11월 24일(화)',thai:'ลอยกระทง ๒๕๖๙',next:'2027년 11월 13일(토)'};

/* cat: city=방콕시 공식 행사장, river=강변 축제·명소, park=자정까지 여는 공원
   ok: true=공식 발표·보도로 확인 / false=SNS·과거 정보라 현장 확인 필요
   m: 지도 표시용 위치 보정(선택) · lp: 지도 글자 위치 [dx,dy,정렬] */
const VENUES=[
 {id:'mahakan',cat:'city',name:'마하깐 요새',th:'ป้อมมหากาฬ · Mahakan Fort',q:'Mahakan Fort',pid:'ChIJvRrYdxWZ4jARp3JWoSGK8Wo',lat:13.7556,lng:100.5055,lp:[34,-40,'start'],
  period:'11/23–25',today:'18:00 개막식',ok:true,host:'방콕시(BMA)',
  desc:'방콕시 메인 행사장. ‘라따나꼬신의 물길’을 주제로 전통 공연, 끄라통 만들기 워크숍, 장터, 대형 끄라통 전시가 열립니다. ‘쭛타이(태국 전통의상) 입고 끄라통 띄우기’ 무료 의상 체험도 있어요.',
  more:'놉파맛 미인대회도 열려요. 황금산(왓 사켓)·왓 랏차낫다람·왓 텝티다람을 잇는 사원 연계 프로그램은 11/17–29.',
  tr:[['MRT','삼욧(Sam Yot) 역 — 도보 약 15분'],['BOAT','쌘쌥 운하보트 판파 리랏(Phan Fa) 선착장 — 바로 옆'],['BUS','랏차담넌 끌랑 도로 · 민주기념탑 정류장']],
  src:'BMA 발표(Nation Thailand), TAT. 개막 시각은 인스타그램 안내'},
 {id:'sumen',cat:'city',name:'프라수멘 요새 · 산티차이쁘라깐 공원',short:'프라수멘 요새',th:'ป้อมพระสุเมรุ · Santi Chai Prakan Park',q:'Santi Chai Prakan Park',pid:'ChIJ_0J6BXKZ4jAREKhaPbMAAR0',lat:13.764,lng:100.4951,m:[13.764,100.4945],lp:[34,-40,'start'],
  period:'11/23–25',today:'강변 공원 행사',ok:true,host:'방콕시(BMA)',
  desc:'강변 공원에서 문화 공연, 끄라통 만들기, 보트 체험, 로컬 노점이 열립니다. 카오산·구시가와 가까워 저녁 먹고 들르기 좋아요.',
  more:'평소 21시에 닫는 공원이라 행사 운영 시간은 현장 안내를 따르세요.',
  tr:[['BOAT','짜오프라야 수상버스 N13 프라아팃 선착장 — 바로 앞'],['MRT','삼욧·사남차이 역 — 택시 약 10분'],['BUS','프라아팃 도로 · 카오산 인근 정류장']],
  src:'BMA 발표(TAT News)'},
 {id:'rama8',cat:'city',name:'라마 8세 대교 강변',short:'라마8세 대교',th:'สะพานพระราม 8 · Rama VIII Bridge',q:'Rama VIII Park Bang Phlat Bangkok',lat:13.7716,lng:100.4965,m:[13.7748,100.4918],lp:[0,-84,'middle'],
  period:'11/16–25',today:'14:00–22:00',ok:true,host:'방콕시(BMA) · 방플랏 구청',
  desc:'다리 조명과 강변 풍경 속에서 학생·지역 공연, 끄라통 경연, 저렴한 장터가 열립니다. 방콕 50개 구의 지역 특산품(OTOP), 무료 이발·건강검진 부스도 있어요. 행사장은 강 건너 톤부리(방플랏) 쪽이에요.',
  tr:[['BOAT','수상버스 N13 프라아팃 하차 → 다리 건너 도보 약 20분'],['MRT','블루라인 방이칸(Bang Yi Khan) 역 — 택시 5분 안팎'],['BUS','짜란싸닛웡 도로 정류장']],
  src:'BMA 발표(Nation Thailand, TAT News), PPTV 보도'},
 /* ── 기타 행사: 지도 미표시(nomap), 목록에서 누르면 구글지도로 ── */
 {id:'ku',cat:'etc',nomap:1,name:'까셋삿대학교 방켄 캠퍼스',th:'มหาวิทยาลัยเกษตรศาสตร์ · Kasetsart University',q:'Kasetsart University',pid:'ChIJaecbER6d4jARMYzsas3oMkM',lat:13.848,lng:100.5723,
  period:'11/23–24',today:'Retro Thai Vintage 축제',ok:true,host:'까셋삿대학교 학생회',
  desc:'프라피룬 연못(สระพระพิรุณ)에서 열리는 대학 러이끄라통 페스티벌. 올해 주제는 ‘Retro Thai Vintage’로 초 끄라통 띄우기, 학생 공연·콘서트, 학생·소상인 노점, 끄라통 경연, 옛날식 놀이마당이 있어요.',
  tr:[['BTS','그린라인 까셋삿대학교(Kasetsart University) 역 1번 출구']],src:'TAT News, Thansettakij·PPTV 보도'},
 {id:'prem',cat:'etc',nomap:1,name:'쁘렘쁘라차꼰 운하 (짜뚜짝·돈므앙)',th:'คลองเปรมประชากร · Wat Samian Nari',q:'Wat Samian Nari',pid:'ChIJz48FSOyc4jARSRo8DC7TJ2U',lat:13.8396,lng:100.5561,
  period:'11/23–25',today:'14:00 끄라통 경연 · 16:30 놉파맛 대회',ok:true,host:'방콕시 · 짜뚜짝·락시·돈므앙 구청',
  desc:'방콕시 공식 행사장 5곳 중 2곳. 왓 사미안나리 쪽(오늘 하루)은 14:00 끄라통 경연, 16:30 놉파맛 미인대회가 열리고, 돈므앙 경찰서 옆 운하(11/23–25)는 끄라통 경연·온라인 띄우기·노점 50곳 이상이 있어요. 동네 장터 분위기예요.',
  tr:[['BTS','SRT 레드라인 왓 사미안나리 역 / 락시 역']],src:'BMA 발표(TAT News), PPTV 보도'},
 {id:'chatuchak',cat:'etc',nomap:1,name:'짜뚜짝 공원 · 롯파이(와치라벤짜탓) 공원',th:'สวนจตุจักร · สวนรถไฟ',q:'Chatuchak Park',pid:'ChIJnZuu10Oc4jAR0DkLPbMAAQ8',lat:13.8075,lng:100.5554,
  period:'11/24',today:'자정까지 개방',ok:true,host:'방콕시 공원 35곳',
  desc:'방콕시가 오늘 자정까지 여는 공원. 짜뚜짝 주말시장 옆 큰 호수 공원이라 북쪽 숙소라면 가깝게 다녀오기 좋아요.',
  tr:[['BTS','머칫(Mo Chit) 역 — 바로 앞'],['MRT','짜뚜짝공원(Chatuchak Park) 역 — 바로 앞']],src:'BMA 발표(Thansettakij·PPTV 보도)'},
 {id:'chula',cat:'etc',nomap:1,name:'쭐라롱꼰대학교',th:'จุฬาลงกรณ์มหาวิทยาลัย · Chulalongkorn University',q:'Chulalongkorn University',lat:13.7384,lng:100.5321,
  period:'11/17 (지난 행사)',today:'오늘 행사 여부 확인 필요',ok:false,host:'쭐라 학생회',
  desc:'보도 요약으로는 올해 11/17 라마5세 동상 광장에서 노점 80곳 이상과 워크숍이 있는 러이끄라통 행사가 열렸어요. 작년엔 러이끄라통 당일 17:00–22:00에 쭐라 연못에서 열렸으니, 오늘 따로 하는지는 쭐라 학생회 SNS로 확인하세요.',
  tr:[['BTS','시암 · 국립경기장 역 — 도보 10–15분'],['MRT','쌈얀(Sam Yan) 역 — 도보 약 10분']],src:'PPTV 보도 요약(2026), 쭐라 공식 뉴스(2025)'},
 {id:'arun',cat:'river',name:'왓 아룬 · 짜오프라야 강변',short:'왓 아룬',th:'วัดอรุณ · Bangkok River Festival',q:'Wat Arun',pid:'ChIJaSv_6gaZ4jARnbiUVn6Z_YY',lat:13.7439,lng:100.4884,m:[13.7439,100.4895],lp:[0,30,'middle'],
  period:'11/21–24',today:'18:00 개막식',ok:true,host:'문화부 · 방콕 리버 페스티벌',
  desc:'문화부 러이끄라통 행사(11/23–24) — 옛 태국 의상 체험, 민속 공연, 바나나잎 끄라통 만들기 시연이 열리고 오늘 18:00 개막식이 있어요. 강 건너 타띠엔 선착장에서는 끄라통 꾸미기 행사(11/21–24 저녁)도 열립니다.',
  more:'인스타 안내로는 방콕 리버 페스티벌이 강변 11곳에서 오늘 15:00–24:00, 무료 셔틀보트로 이어져요. 혼잡한 선착장에서는 띄우기가 제한될 수 있어요.',
  tr:[['BOAT','수상버스 N8 타띠엔 선착장 → 건너편 왓 아룬 도강 페리'],['MRT','사남차이 역 — 타띠엔까지 도보 약 10분 / 이사라팝 역 2번 출구 — 버스·택시'],['BUS','마하랏 도로 · 왓 포 정류장']],
  src:'PPTV·Thairath 보도(문화부 행사). 리버 페스티벌 시간은 인스타그램 안내'},
 {id:'songwat',cat:'river',name:'송왓 거리 ‘송왓 나르밋’',short:'송왓 거리',th:'ถนนทรงวาด · Loy Krathong Song Wat 2026',q:'Song Wat Road',pid:'ChIJ8xRwiR-Z4jARZCMqxmCFkd4',lat:13.7373,lng:100.509,lp:[34,-40,'start'],
  period:'11/23–24',today:'20:05 드론쇼·불꽃',ok:true,host:'송왓 거리 · 문화부',
  desc:'차이나타운 옛 강변 거리의 빛 축제. 오늘 17:00 디지털 끄라통과 음악 공연, 19:30 문화부 장관 개막식, 20:05 드론 150대 쇼·끄라통 공연·짜오프라야 강 위 불꽃, 20:35부터 23:00까지 태국 현대무용 공연과 동네 노점이 이어져요.',
  more:'어제(23일)는 불 밝힌 툭툭 퍼레이드가 있었어요. 오늘 밤 가장 화려한 행사라 일찍 가는 게 좋아요.',
  tr:[['MRT','블루라인 왓망꼰(Wat Mangkon) 역 1번 출구 — 도보 약 400m'],['BOAT','수상버스 랏차웡(Ratchawong) 선착장'],['BUS','짜런끄룽 도로 · 야오와랏 정류장']],
  src:'PPTV·Thairath 보도'},
 {id:'iconsiam',cat:'river',name:'아이콘시암 리버파크',short:'아이콘시암',th:'ไอคอนสยาม · ICONSIAM Thaiconic Loy Krathong',q:'River Park ICONSIAM',pid:'ChIJSxKhERaZ4jARNspMJpi4kDg',lat:13.7265,lng:100.5115,m:[13.7265,100.5062],lp:[-34,-40,'end'],
  period:'11/24',today:'오늘 하루',ok:true,host:'아이콘시암 · 문화부',
  desc:'‘ICONSIAM THAICONIC LOY KRATHONG’. 대형 화면에 띄우는 디지털 끄라통(건강·일·사랑·재물 소원 중 선택), 그물로 거둬 가는 친환경 수로 띄우기, 낭 놉파맛 행렬과 미니 콘서트가 열립니다.',
  more:'시작 시각은 공식 발표에 없어요. 아이콘시암 SNS로 확인하세요.',
  tr:[['GOLD','BTS 골드라인 짜런나콘 역 — 바로 연결(실롬선 끄룽톤부리 역 환승)'],['BOAT','사톤 선착장 무료 셔틀보트 — 평소 막차 약 23시'],['BOAT','수상버스 ICONSIAM 선착장']],
  src:'Naewna 보도(행사 내용·장소)'},
 {id:'asiatique',cat:'river',name:'아시아티크 더 리버프런트',short:'아시아티크',th:'เอเชียทีค · Asiatique The Riverfront',q:'Asiatique The Riverfront',pid:'ChIJtepc75aY4jARVvgRfYrM38s',lat:13.7044,lng:100.5033,m:[13.7044,100.5068],lp:[34,-40,'start'],
  period:'상시 11:00–24:00',today:'강변 야시장',ok:false,host:'아시아티크',
  desc:'대관람차와 강변 야시장. 해마다 러이끄라통 무대·조명과 선착장 쪽 끄라통 띄우기가 열리는 곳이에요. 올해 프로그램은 공식 발표를 찾지 못했으니 현장에서 확인하세요.',
  tr:[['BOAT','사톤 선착장 무료 셔틀보트 10–15분 — 평소 막차 약 23:30'],['BTS','사판탁신 역 2번 출구 → 사톤 선착장'],['BUS','짜런끄룽 도로 정류장 · 택시']],
  src:'구글 지도(영업시간), 여행 가이드(셔틀보트). 2026 프로그램 미확인'},
 {id:'lumphini',cat:'park',name:'룸피니 공원',short:'룸피니',th:'สวนลุมพินี · Lumphini Park',q:'Lumphini Park',pid:'ChIJG7BL7Saf4jARNmn5AQiyAaw',lat:13.7314,lng:100.5417,lp:[-30,-40,'end'],
  period:'11/24',today:'자정까지 개방',ok:true,host:'방콕시 공원 35곳',
  desc:'방콕시가 오늘 자정까지 여는 공원 35곳 중 하나(평소 22시 폐장). 도심에서 가장 큰 호수 공원이라 가족 단위로 붐벼요.',
  tr:[['MRT','룸피니 · 실롬 역 — 도보 5분'],['BTS','살라댕 · 랏차담리 역 — 도보 5–10분'],['BUS','라마4세 도로 · 랏차담리 도로 정류장']],
  src:'BMA 발표(Nation Thailand)'},
 {id:'benjakitti',cat:'park',name:'벤짜끼띠 공원',short:'벤짜끼띠',th:'สวนเบญจกิติ · Benchakitti Park',q:'Benchakitti Park',pid:'ChIJmfMfvBuf4jAR9rugvZd5Lyc',lat:13.7292,lng:100.5587,lp:[0,30,'middle'],
  period:'11/24',today:'자정까지 개방',ok:false,host:'방콕시 공원',
  desc:'아속·수쿰빗 쪽 큰 호수 공원. 호수 산책로와 스카이워크가 넓어 비교적 여유 있게 띄울 수 있어요.',
  tr:[['MRT','퀸 시리낏 컨벤션센터 역 — 바로 앞'],['BTS','아속 역 — 도보 약 10–15분'],['BUS','랏차다피섹 도로 정류장']],
  src:'인스타그램 안내(자정 개방 공원)'},
 {id:'benjasiri',cat:'park',name:'벤짜시리 공원',short:'벤짜시리',th:'สวนเบญจสิริ · Benchasiri Park',q:'Benchasiri Park',pid:'ChIJt9HTSwKf4jARsDoLPbMAAQ8',lat:13.7307,lng:100.5675,lp:[0,-84,'middle'],
  period:'11/24',today:'자정까지 개방',ok:false,host:'방콕시 공원',
  desc:'엠쿼티어·엠포리움 바로 옆 아담한 공원. 쇼핑·저녁과 묶어 가볍게 다녀오기 좋아요.',
  tr:[['BTS','프롬퐁 역 — 바로 옆'],['MRT','수쿰윗 역 — 도보 약 15분'],['BUS','수쿰윗 도로 정류장']],
  src:'인스타그램 안내(자정 개방 공원)'}
];
let _n=0;VENUES.forEach(v=>{v.n=v.nomap?0:++_n;v.short=v.short||v.name});
const MAPPED=VENUES.filter(v=>!v.nomap);
/* 분위기 사진: img/<id>_1.jpg, img/<id>_2.jpg 가 있는 장소 id (가로 480px 정도로 줄여 넣기) */
const PICS=new Set(['mahakan','sumen','rama8','arun','songwat','iconsiam','asiatique','lumphini','benjakitti','benjasiri']);
/* 언어: i18n.js 의 LK_I18N 사용. 번역이 없으면 한국어 원문 */
const I=window.LK_I18N||{UI:{ko:{}},VT:{}};let LANG='ko';
const U=k=>{const o=I.UI[LANG]||{};return o[k]!=null?o[k]:I.UI.ko[k]};
const VTo=v=>(I.VT[LANG]||{})[v.id];
const tx=(v,k)=>{const o=VTo(v);if(k==='short')return (o&&(o.short||o.name))||v.short;return o&&o[k]!=null?o[k]:v[k]};
const trs=v=>{const o=VTo(v);return v.tr.map(([t,s],i)=>[t,(o&&o.tr&&o.tr[i])||s])};

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const gm=v=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(v.q)+(v.pid?'&query_place_id='+v.pid:'');
const dir=(v,mode,from)=>'https://www.google.com/maps/dir/?api=1'+(from?'&origin='+encodeURIComponent(from):'')+'&destination='+encodeURIComponent(v.q)+(v.pid?'&destination_place_id='+v.pid:'')+'&travelmode='+mode;

/* ── 지도 ── 범위: 위도 13.660–13.805, 경도 100.470–100.590 */
const W=1000,H=1238;
const P=(a,b)=>[+((b-100.47)/0.12*W).toFixed(1),+((13.805-a)/0.145*H).toFixed(1)];
const L=pts=>pts.map(p=>P(p[0],p[1]).join(',')).join(' ');
const RIVER=[[13.8,100.513],[13.786,100.5045],[13.772,100.4975],[13.764,100.4932],[13.756,100.4902],[13.748,100.4898],[13.743,100.4912],[13.738,100.4962],[13.734,100.5035],[13.728,100.5098],[13.721,100.5128],[13.713,100.5085],[13.705,100.5005],[13.697,100.4995],[13.689,100.5055],[13.684,100.5185],[13.688,100.5335],[13.697,100.544],[13.705,100.5545],[13.702,100.5665],[13.69,100.5735],[13.675,100.5725],[13.662,100.5655],[13.65,100.56]];
const LINES={
 bts:[[[13.7465,100.5291],[13.7456,100.5341],[13.7395,100.5393],[13.7286,100.5343],[13.7238,100.5294],[13.7193,100.5214],[13.7186,100.5143],[13.7208,100.5028],[13.721,100.495]],
      [[13.79,100.541],[13.7568,100.5338],[13.7518,100.5316],[13.7456,100.5341],[13.7441,100.543],[13.743,100.549],[13.7405,100.5554],[13.737,100.5603],[13.7305,100.5697],[13.7243,100.5784],[13.7196,100.5851],[13.712,100.592]]],
 mrt:[[[13.79,100.565],[13.7487,100.5633],[13.738,100.5612],[13.7232,100.56],[13.7224,100.5537],[13.7256,100.5452],[13.7294,100.5365],[13.7324,100.5297],[13.7376,100.517],[13.7428,100.51],[13.7466,100.5014],[13.7442,100.4945],[13.7385,100.4855],[13.728,100.4735],[13.725,100.468]]],
 gold:[[[13.7208,100.5028],[13.7265,100.5085],[13.7305,100.5105]]]};
const STN=[[13.7456,100.5341],[13.7395,100.5393],[13.7286,100.5343],[13.7238,100.5294],[13.7193,100.5214],[13.7186,100.5143],[13.7208,100.5028],[13.7441,100.543],[13.743,100.549],[13.7405,100.5554],[13.737,100.5603],[13.7305,100.5697],[13.7243,100.5784],[13.7568,100.5338],[13.7487,100.5633],[13.738,100.5612],[13.7232,100.56],[13.7224,100.5537],[13.7256,100.5452],[13.7294,100.5365],[13.7324,100.5297],[13.7376,100.517],[13.7428,100.51],[13.7466,100.5014],[13.7442,100.4945],[13.7385,100.4855],[13.7265,100.5085]];
const PIERS=[[13.7625,100.4945],[13.7465,100.4912],[13.7182,100.5133],[13.7272,100.5098],[13.7055,100.5012]];
const ROADS=[[[13.7525,100.4935],[13.7567,100.5018],[13.762,100.512],[13.79,100.523]],[[13.739,100.517],[13.729,100.537],[13.7205,100.56],[13.712,100.59]],[[13.7186,100.516],[13.7275,100.546]],[[13.7465,100.505],[13.7465,100.53],[13.744,100.59]],[[13.79,100.5235],[13.74,100.522],[13.70,100.53]],[[13.705,100.558],[13.76,100.562]],[[13.755,100.47],[13.75,100.488]],[[13.712,100.47],[13.721,100.495],[13.73,100.505]],[[13.79,100.483],[13.745,100.481],[13.68,100.49]]];

function mapSVG(sel,ornate){
 const F="font-family=\"'Noto Sans KR','Noto Sans Thai',sans-serif\"";
 const T=(x,y,t,o)=>'<text x="'+x+'" y="'+y+'" '+F+' '+(o||'')+'>'+t+'</text>';
 let s='<defs>'+
 '<pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.4" fill="var(--m-dot)"/></pattern>'+
 '<pattern id="kanok" width="44" height="26" patternUnits="userSpaceOnUse"><rect width="44" height="26" fill="var(--m-frame)"/><path d="M4 21C4 11 12 5 22 5c-5 3-7 7-6 11 2-4 6-6 10-5-4 2-6 5-6 10Z" fill="var(--m-gold)"/><circle cx="34" cy="13" r="2.4" fill="var(--m-gold)"/></pattern>'+
 '<radialGradient id="glw"><stop offset="0" stop-color="#ffd47a" stop-opacity=".95"/><stop offset="1" stop-color="#ffb23d" stop-opacity="0"/></radialGradient>'+
 '<symbol id="tree" overflow="visible"><rect x="-2" y="-8" width="4" height="9" fill="#7a5532"/><circle cy="-17" r="11" fill="var(--m-tree)"/><circle cx="-4" cy="-21" r="4.5" fill="var(--m-tree2)"/></symbol>'+
 '<symbol id="prang" overflow="visible"><rect x="-26" y="-9" width="52" height="9" fill="#d9c39a" stroke="#6f532c" stroke-width="2"/><path d="M-19-9H19L13-38H-13Z" fill="#efe1c1" stroke="#6f532c" stroke-width="2"/><path d="M-11-38H11L6-68H-6Z" fill="#f6ecd5" stroke="#6f532c" stroke-width="2"/><path d="M-4-68H4L1-94H-1Z" fill="#d9a63a" stroke="#6f532c" stroke-width="2"/><path d="M-10-24h20M-7-53h14" stroke="#c0785a" stroke-width="3"/></symbol>'+
 '<symbol id="palace" overflow="visible"><path d="M-32 0H32V-11H-32Z" fill="#f3ead6" stroke="#6f532c" stroke-width="2"/><path d="M-26-11H26L15-28H-15Z" fill="#b8442b" stroke="#6f2f1f" stroke-width="2"/><path d="M-13-28H13L0-54Z" fill="#c9553a" stroke="#6f2f1f" stroke-width="2"/><path d="M0-54V-72" stroke="#d9a63a" stroke-width="4"/></symbol>'+
 '<symbol id="fort" overflow="visible"><rect x="-18" y="-24" width="36" height="24" fill="#fbfaf4" stroke="#5f584a" stroke-width="2"/><path d="M-18-24v-7h7v7m5 0v-7h7v7m5 0v-7h7v7" fill="#fbfaf4" stroke="#5f584a" stroke-width="2"/><rect x="-5" y="-12" width="10" height="12" fill="#5f584a"/></symbol>'+
 '<symbol id="bridge" overflow="visible"><path d="M-66 0H66" stroke="#59636b" stroke-width="6"/><path d="M0 4V-60" stroke="#f3f3f3" stroke-width="7"/><path d="M0-56L-60 0M0-45L-40 0M0-34L-21 0M0-56L60 0M0-45L40 0M0-34L21 0" stroke="#d9a63a" stroke-width="2"/></symbol>'+
 '<symbol id="mall" overflow="visible"><path d="M-30 0V-34L0-58L30-34V0Z" fill="#e9eef2" stroke="#55636e" stroke-width="2"/><path d="M-30-34L0-58L30-34" fill="none" stroke="#d9a63a" stroke-width="4"/></symbol>'+
 '<symbol id="wheel" overflow="visible"><circle cy="-40" r="32" fill="none" stroke="#55636e" stroke-width="3"/><path d="M0-72V-8M-32-40H32M-23-63L23-17M23-63L-23-17" stroke="#55636e" stroke-width="1.5"/><path d="M-14 0L0-40L14 0" fill="none" stroke="#55636e" stroke-width="4"/></symbol>'+
 '<symbol id="gate" overflow="visible"><rect x="-22" y="-26" width="6" height="26" fill="#a8322a"/><rect x="16" y="-26" width="6" height="26" fill="#a8322a"/><path d="M-30-26H30L24-36H-24Z" fill="#c8402f"/><rect x="-10" y="-24" width="20" height="8" fill="#e5b84a"/></symbol>'+
 '<symbol id="towers" overflow="visible"><rect x="-32" y="-44" width="17" height="44" fill="var(--m-bldg)"/><rect x="-11" y="-74" width="21" height="74" fill="var(--m-bldg2)"/><rect x="14" y="-56" width="17" height="56" fill="var(--m-bldg)"/></symbol>'+
 '<symbol id="longtail" overflow="visible"><path d="M-26 0Q-4 7 22 0L26-6Q0 0-26 0Z" fill="#8a4b25"/><path d="M-20-2H6V-9H-20Z" fill="#c9533a"/><path d="M22-2L40 6" stroke="#55636e" stroke-width="2"/></symbol>'+
 '<symbol id="ferry" overflow="visible"><path d="M-28 0H28L22 8H-22Z" fill="#f4f1e8" stroke="#55636e" stroke-width="2"/><rect x="-18" y="-10" width="32" height="10" fill="#2f6f9a"/></symbol>'+
 '<symbol id="kt" overflow="visible"><circle cy="-6" r="13" fill="url(#glw)"/><path d="M-9 0Q-12-8-5-6Q0-13 5-6Q12-8 9 0Z" fill="#d9567a"/><circle cy="-10" r="2.6" fill="#ffd47a"/></symbol>'+
 '<symbol id="corner" overflow="visible"><path d="M0 0H70M0 0V70" stroke="var(--m-gold)" stroke-width="5"/><path d="M14 14C14 48 40 60 60 46C44 46 34 38 32 24C40 30 50 30 56 22C42 22 30 18 24 6C20 12 16 14 14 14Z" fill="var(--m-gold)"/><circle cx="12" cy="12" r="6" fill="var(--m-gold)"/></symbol>'+
 '</defs>';
 s+='<rect width="'+W+'" height="'+H+'" fill="var(--m-land)"/>';
 if(ornate)s+='<rect width="'+W+'" height="'+H+'" fill="url(#dots)"/>';
 // green areas
 s+='<ellipse cx="650" cy="1103" rx="190" ry="112" fill="var(--m-park)"/>';
 [[13.7314,100.5417,60,44],[13.7292,100.5587,52,34],[13.7307,100.5675,24,20],[13.764,100.4951,18,13],[13.7745,100.4905,20,14]].forEach(([a,b,rx,ry])=>{const[x,y]=P(a,b);s+='<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="var(--m-park)"/>'});
 [[13.734,100.537],[13.7345,100.546],[13.7282,100.5375],[13.728,100.5462],[13.7325,100.553],[13.7262,100.5625],[13.7335,100.571],[13.684,100.545],[13.672,100.528],[13.676,100.56],[13.666,100.548],[13.681,100.533]].forEach(([a,b])=>{const[x,y]=P(a,b);s+='<use href="#tree" x="'+x+'" y="'+y+'"/>'});
 // roads
 s+=ROADS.map(r=>'<polyline points="'+L(r)+'" fill="none" stroke="var(--m-road)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>').join('');
 // river
 const rv=L(RIVER);
 s+='<polyline points="'+rv+'" fill="none" stroke="var(--m-water-edge)" stroke-width="72" stroke-linejoin="round" stroke-linecap="round"/><polyline points="'+rv+'" fill="none" stroke="var(--m-water)" stroke-width="62" stroke-linejoin="round" stroke-linecap="round"/><polyline points="'+rv+'" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2.5" stroke-dasharray="12 26"/>';
 // transit (muted)
 const tl=(arr,c,w)=>arr.map(p=>'<polyline points="'+L(p)+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linejoin="round" stroke-linecap="round"/>').join('');
 s+='<g opacity=".5">'+tl(LINES.mrt,'var(--m-mrt)',8)+tl(LINES.bts,'var(--m-bts)',8)+tl(LINES.gold,'var(--m-goldline)',7)+STN.map(([a,b])=>{const[x,y]=P(a,b);return '<circle cx="'+x+'" cy="'+y+'" r="6" fill="#fff" stroke="var(--m-ink2)" stroke-width="2"/>'}).join('')+'</g>';
 PIERS.forEach(([a,b])=>{const[x,y]=P(a,b);s+='<rect x="'+(x-8)+'" y="'+(y-8)+'" width="16" height="16" rx="3" fill="#e8892b" stroke="#fff" stroke-width="3"/>'});
 // boats & krathongs
 [['longtail',13.7525,100.4925],['ferry',13.733,100.5045],['longtail',13.7175,100.5112],['ferry',13.698,100.501],['longtail',13.693,100.538],['ferry',13.684,100.574]].forEach(([id,a,b])=>{const[x,y]=P(a,b);s+='<use href="#'+id+'" x="'+x+'" y="'+y+'"/>'});
 [[13.759,100.4895],[13.7405,100.4945],[13.7235,100.5108],[13.709,100.505],[13.69,100.5045],[13.686,100.527],[13.701,100.55],[13.697,100.57],[13.668,100.569]].forEach(([a,b])=>{const[x,y]=P(a,b);s+='<use class="flame" href="#kt" x="'+x+'" y="'+y+'"/>'});
 // districts
 const D=(x,y,t)=>T(x,y,t,'font-size="38" font-weight="700" fill="var(--m-district)" letter-spacing="2"');
 const M=U('map');s+=D(38,768,M.thonburi)+D(420,450,M.siam)+D(640,425,M.sukhumvit)+D(420,796,M.sathorn)+D(560,1128,M.krachao);
 // landmarks
 const LM=(id,a,b,sc,lab)=>{const[x,y]=P(a,b);return '<g transform="translate('+x+' '+y+') scale('+sc+')"><use href="#'+id+'"/></g>'+(lab?T(x,y+26,lab,'text-anchor="middle" font-size="23" font-weight="700" fill="var(--m-ink2)" paint-order="stroke" stroke="var(--m-land)" stroke-width="6"'):'')};
 s+=LM('towers',13.7215,100.5305,1)+LM('towers',13.744,100.548,.9);
 s+=LM('palace',13.7495,100.4975,1)+(()=>{const[x,y]=P(13.7495,100.4975);return T(x+36,y-8,M.palace,'font-size="23" font-weight="700" fill="var(--m-ink2)" paint-order="stroke" stroke="var(--m-land)" stroke-width="6"')})()+LM('prang',13.7439,100.4845,1)+LM('fort',13.7556,100.4998,1)+LM('bridge',13.7716,100.4975,1)+LM('mall',13.7262,100.5095,.85)+LM('wheel',13.6985,100.5068,.9);
 // compass
 s+='<g transform="translate(905 122)"><circle r="56" fill="var(--m-land)" stroke="var(--m-gold)" stroke-width="3"/><circle r="46" fill="none" stroke="var(--m-gold)" stroke-width="1.5"/><path d="M0-44L10 0L0 44L-10 0Z" fill="var(--m-gold)"/><path d="M-44 0L0-8L44 0L0 8Z" fill="var(--m-gold)" opacity=".7"/><path d="M0-44L10 0H-10Z" fill="var(--m-accent)"/>'+T(0,-64,'N','text-anchor="middle" font-size="24" font-weight="800" fill="var(--m-ink)"')+'</g>';
 // legend
 s+='<g transform="translate(34 1033)"><rect width="300" height="172" rx="14" fill="var(--m-card)" stroke="var(--m-gold)" stroke-width="'+(ornate?3:1.5)+'"/>'+(ornate?'<rect x="7" y="7" width="286" height="158" rx="10" fill="none" stroke="var(--m-gold)" stroke-width="1"/>':'')+
  '<g font-size="21" fill="var(--m-ink)" '+F+'>'+
  '<rect x="24" y="30" width="36" height="8" rx="4" fill="var(--m-bts)" opacity=".7"/><text x="72" y="41">BTS</text>'+
  '<rect x="150" y="30" width="36" height="8" rx="4" fill="var(--m-mrt)" opacity=".7"/><text x="198" y="41">MRT</text>'+
  '<rect x="24" y="66" width="36" height="8" rx="4" fill="var(--m-goldline)" opacity=".8"/><text x="72" y="77">'+M.gold+'</text>'+
  '<rect x="196" y="62" width="16" height="16" rx="3" fill="#e8892b"/><text x="220" y="77">'+M.pier+'</text>'+
  '<circle cx="36" cy="110" r="11" fill="var(--p-city)"/><text x="56" y="117">'+M.city+'</text>'+
  '<circle cx="36" cy="146" r="11" fill="var(--p-river)"/><text x="56" y="153">'+M.riverside+'</text>'+
  '<circle cx="186" cy="146" r="11" fill="var(--p-park)"/><text x="206" y="153">'+M.park+'</text></g></g>';
 // pins
 const pins=MAPPED.map(v=>{const[a,b]=v.m||[v.lat,v.lng],[x,y]=P(a,b),on=v.id===sel,[dx,dy,an]=v.lp;
  return '<g data-id="'+v.id+'" class="pin" role="button" tabindex="0" aria-label="'+esc(v.n+'. '+tx(v,'name'))+'">'+
   (on?'<circle class="flame" cx="'+x+'" cy="'+(y-44)+'" r="66" fill="url(#glw)"/>':'')+
   '<g transform="translate('+x+' '+y+') scale('+(on?1.22:1)+') translate('+(-x)+' '+(-y)+')">'+
   (on?'<path d="M'+x+' '+y+'c-7-15-28-25-28-46a28 28 0 0 1 56 0c0 21-21 31-28 46z" fill="none" stroke="var(--m-gold)" stroke-width="16" stroke-linejoin="round"/>':'')+
   '<path d="M'+x+' '+y+'c-7-15-28-25-28-46a28 28 0 0 1 56 0c0 21-21 31-28 46z" fill="var(--p-'+v.cat+')" stroke="'+(on?'#2a1c0e':'var(--m-gold)')+'" stroke-width="'+(on?7:4)+'" stroke-linejoin="round"/>'+
   T(x,y-36,v.n,'text-anchor="middle" font-size="27" font-weight="800" fill="#fff"')+'</g>'+
   T(x+dx,y+dy,esc(tx(v,'short')),'text-anchor="'+an+'" font-size="29" font-weight="800" fill="var(--m-ink)" paint-order="stroke" stroke="var(--m-land)" stroke-width="8" stroke-linejoin="round"')+'</g>'});
 const si=MAPPED.findIndex(v=>v.id===sel);if(si>=0)pins.push(pins.splice(si,1)[0]);
 s+=pins.join('');
 // river label (straight, readable)
 s+=T(0,0,M.river,'text-anchor="middle" font-size="24" font-weight="700" fill="#fff" transform="translate(752 867) rotate(14)"');
 // title banner + frame
 if(ornate){
  s+='<path fill-rule="evenodd" d="M0 0H'+W+'V'+H+'H0Z M24 24V'+(H-24)+'H'+(W-24)+'V24Z" fill="url(#kanok)"/><rect x="24" y="24" width="'+(W-48)+'" height="'+(H-48)+'" fill="none" stroke="var(--m-gold)" stroke-width="3"/><rect x="6" y="6" width="'+(W-12)+'" height="'+(H-12)+'" fill="none" stroke="var(--m-gold)" stroke-width="3"/>';
  s+='<use href="#corner" x="6" y="6"/><use href="#corner" transform="translate('+(W-6)+' 6) scale(-1 1)"/><use href="#corner" transform="translate(6 '+(H-6)+') scale(1 -1)"/><use href="#corner" transform="translate('+(W-6)+' '+(H-6)+') scale(-1 -1)"/>';
  s+='<g transform="translate(500 92)"><path d="M-250-38H250L282 0L250 38H-250L-282 0Z" fill="var(--m-banner)" stroke="var(--m-gold)" stroke-width="4"/><path d="M-240-28H240L266 0L240 28H-240L-266 0Z" fill="none" stroke="var(--m-gold)" stroke-width="1.5"/>'+
   T(0,10,esc(U('title')),'text-anchor="middle" font-size="36" font-weight="800" fill="var(--m-bannerink)"')+'</g>';
 }else{
  s+='<rect x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" rx="0" fill="none" stroke="var(--m-ink2)" stroke-opacity=".25" stroke-width="2"/>';
  s+='<g transform="translate(40 40)"><rect width="430" height="92" rx="16" fill="var(--m-banner)"/>'+T(28,46,esc(U('title')),'font-size="34" font-weight="800" fill="var(--m-bannerink)"')+T(28,76,esc(U('date')),'font-size="20" fill="var(--m-bannerink)" opacity=".85"')+'</g>';
 }
 return s;
}

/* ── 화면 ── */
function init(opt){
 const ornate=!!opt.ornate,$=q=>document.querySelector(q);
 const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth';
 let sel=null,from='';
 try{from=localStorage.getItem('lk-from')||''}catch(e){}
 LANG='ko'; /* 처음 열 때는 항상 한국어 */
 if(!I.UI[LANG])LANG='ko';
 $('#from').value=from;
 const badge=t=>'<span class="tr tr-'+t+'">'+U('tr')[t]+'</span>';
 const dot=v=>'<i class="dot c-'+v.cat+'">'+(v.n||'+')+'</i>';
 const detail=v=>'<div class="detail" id="d-'+v.id+'"><p class="kicker">'+dot(v)+esc(U('cat')[v.cat])+' · '+esc(tx(v,'host'))+'</p><h2>'+esc(tx(v,'name'))+'</h2><p class="th" lang="th">'+esc(v.th)+'</p>'+
   '<dl class="when"><div><dt>'+U('period')+'</dt><dd>'+esc(tx(v,'period'))+'</dd></div><div><dt>'+U('today')+'</dt><dd>'+esc(tx(v,'today'))+'</dd></div></dl>'+
   (v.nomap?'<p class="more">'+U('nomap')+'</p>':'')+'<p>'+esc(tx(v,'desc'))+'</p>'+(tx(v,'more')?'<p class="more">'+esc(tx(v,'more'))+'</p>':'')+
   (PICS.has(v.id)?'<div class="pics">'+[1,2].map(i=>'<img src="img/'+v.id+'_'+i+'.jpg" alt="'+esc(tx(v,'name'))+'" loading="lazy" width="480" height="358">').join('')+'</div>':'')+
   '<h3>'+U('transit')+'</h3><ul class="trs">'+trs(v).map(([t,s])=>'<li>'+badge(t)+'<span>'+esc(s)+'</span></li>').join('')+'</ul>'+
   '<p class="src'+(v.ok?'':' warn')+'">'+(v.ok?U('ok'):U('warn'))+esc(tx(v,'src'))+'</p>'+
   '<div class="acts"><a class="btn pri" href="'+dir(v,'transit',from)+'" target="_blank" rel="noopener">'+U('btnTransit')+'</a><a class="btn" href="'+dir(v,'driving',from)+'" target="_blank" rel="noopener">'+U('btnTaxi')+'</a><a class="btn" href="'+gm(v)+'" target="_blank" rel="noopener">'+U('btnMap')+'</a></div></div>';
 const row=x=>{const on=x.id===sel,sub=x.cat==='etc';
  return '<button class="row'+(sub?' sub':'')+(on?' on':'')+'" data-id="'+x.id+'" aria-expanded="'+on+'">'+dot(x)+'<span><b>'+esc(tx(x,'name'))+'</b>'+(sub?'':'<small>'+esc(trs(x)[0][1])+'</small>')+'</span>'+(sub?'':'<em>'+esc(tx(x,'period'))+'<br>'+esc(tx(x,'today'))+'</em>')+'</button>'+(on?detail(x):'')};
 /* 서브 이벤트(기타 행사) 줄은 이름만 — 보조 글씨(교통·기간)는 펼쳤을 때만 */
 function statics(){
  document.documentElement.lang=LANG;
  document.title=U('title');
  document.querySelectorAll('[data-i]').forEach(n=>{const v=U(n.dataset.i);if(typeof v==='string')n.textContent=v});
  $('#from').placeholder=U('fromPh');
  $('#map').setAttribute('aria-label',U('mapAria'));
  $('#tips').innerHTML=U('tips').map(t=>'<li>'+esc(t)+'</li>').join('');
  document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===LANG)));
 }
 let mode='list',openAll=true;
 function render(){
  const v=VENUES.find(x=>x.id===sel);
  $('#map').innerHTML=mapSVG(sel,ornate);
  $('#mapinfo').innerHTML=(mode==='map'&&v)?'<button type="button" class="x" id="closeInfo" aria-label="'+U('close')+'">×</button>'+detail(v):'<p class="empty">'+U('mapHint')+'</p>';
  $('#list').innerHTML=['city','river','park'].map(c=>'<h3 class="lh">'+esc(U('cat')[c])+'</h3>'+VENUES.filter(x=>x.cat===c).map(x=>mode==='list'?row(x):row(x).replace(/<div class="detail"[\s\S]*$/,'')).join('')).join('');
  $('#etc').innerHTML=VENUES.filter(x=>x.cat==='etc').map(x=>mode==='list'?row(x):row(x).replace(/<div class="detail"[\s\S]*$/,'')).join('');
  $('#list').hidden=!openAll;
  $('#toggleAll').textContent=openAll?U('hideAll'):U('showAll');
  $('#toggleAll').setAttribute('aria-expanded',String(openAll));
  $('#bar').hidden=!v;
  if(v)$('#bar').innerHTML='<a class="btn pri" href="'+dir(v,'transit',from)+'" target="_blank" rel="noopener">'+(v.n?v.n+'. ':'')+esc(tx(v,'short'))+esc(U('barGo'))+'</a><a class="btn" href="'+gm(v)+'" target="_blank" rel="noopener">'+U('barMap')+'</a>';
  $('#fromNote').textContent=from?U('fromSet')+from:U('fromEmpty');
 }
 function choose(id,src){
  if(src==='map'){mode='map';sel=id;render();$('#mapinfo').scrollIntoView({behavior:reduce,block:'start'});return}
  sel=(mode==='list'&&sel===id)?null:id;mode='list';render();
  const r=sel&&document.querySelector('.row[data-id="'+sel+'"]');
  if(r){const b=r.getBoundingClientRect();if(b.top<0||b.top>innerHeight*0.6)r.scrollIntoView({behavior:reduce,block:'start'})}
 }
 document.addEventListener('click',e=>{if(e.target.closest('#closeInfo')){sel=null;mode='list';render()}});
 $('#toggleAll').addEventListener('click',()=>{openAll=!openAll;render()});
 document.addEventListener('click',e=>{const t=e.target.closest('button.row');if(t)choose(t.dataset.id,'list')});
 $('#map').addEventListener('click',e=>{const g=e.target.closest('g[data-id]');if(g)choose(g.dataset.id,'map')});
 $('#map').addEventListener('keydown',e=>{const g=e.target.closest('g[data-id]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();choose(g.dataset.id,'map')}});
 document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>{LANG=b.dataset.lang;try{localStorage.setItem('lk-lang',LANG)}catch(_){}statics();render()}));
 let t;$('#from').addEventListener('input',e=>{clearTimeout(t);t=setTimeout(()=>{from=e.target.value.trim();try{localStorage.setItem('lk-from',from)}catch(_){}render()},250)});
 $('#clear').addEventListener('click',()=>{from='';$('#from').value='';try{localStorage.removeItem('lk-from')}catch(_){}render()});
 statics();render();
}
window.LK={EVENT,VENUES,init};
})();
