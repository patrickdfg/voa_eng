(() => {
  "use strict";
  const KEY="haru-english-v1";
  const $=id=>document.getElementById(id);
  const lesson=id=>LESSONS[Math.max(0,Math.min(51,Number(id)-1))];
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const dateKey=(d=new Date())=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit"}).format(d);
  const formatDate=d=>new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",month:"long",day:"numeric",weekday:"short"}).format(d);
  const defaults=()=>({selected:1,completed:{},watched:{},notes:{},quizResults:{},wrong:{},activity:{},practice:{},practiceAnswers:{}});
  function load(){try{const raw=JSON.parse(localStorage.getItem(KEY));return raw&&typeof raw==="object"?{...defaults(),...raw}:defaults()}catch{return defaults()}}
  let state=load(),view="home",filter="all",query="",quiz=null,calendarOffset=0,toastTimer,videoQuality="360p";
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch{toast("저장 공간을 확인해 주세요.")}};
  const completedCount=()=>Object.values(state.completed).filter(Boolean).length;
  const wrongCount=()=>Object.keys(state.wrong).length;
  const practiceFor=id=>PRACTICE_DATA[Number(id)-1];
  const practiceStatus=id=>state.practice[id]||{};
  const nextId=()=>LESSONS.find(x=>!state.completed[x.id])?.id??52;
  const activityDates=()=>Object.keys(state.activity).filter(k=>(state.activity[k]||0)>0);
  const recordActivity=()=>{const k=dateKey();state.activity[k]=(state.activity[k]||0)+1;save()};
  function streak(){const dates=new Set(activityDates());let d=new Date(),num=0;if(!dates.has(dateKey(d)))d.setDate(d.getDate()-1);while(dates.has(dateKey(d))){num++;d.setDate(d.getDate()-1)}return num}
  function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2700)}
  function go(to,id){if(id)state.selected=Number(id);if(to==="study")quiz=null;view=to;save();render();window.scrollTo({top:0,behavior:"smooth"})}
  const action=(a,label,extra="")=>`<button class="btn btn-primary" data-action="${a}" ${extra}>${label}</button>`;
  const heading=(eyebrow,title,desc)=>`<div class="page-heading"><span class="eyebrow">${eyebrow}</span><h1 class="page-title">${title}</h1><p class="page-desc">${desc}</p></div>`;
  const lessonIcon=id=>["👋","💬","📍","🔎","🏡","🧭","🗣️","☕","☁️","🏠","🏘️","👨‍👩‍👧","🎉","🛍️","👀","🌏","📅","🌞","🧑‍💻","🌟","🥳","🏖️","🎁","🎡","🚲","🎮","🚪","🏆","⏳","🚢","⚾","🌳","🏏","💭","🍳","🧰","🤝","💜","✨","🌲","🙌","🚶","💡","🥗","🗺️","📚","🤲","✈️","🕵️","🎒","🌻","🚀"][(id-1)%52];
  const pct=()=>Math.round(completedCount()/52*100);

  function render(){
    $("topDate").textContent=formatDate(new Date());
    const names={home:"홈",lessons:"전체 52강",study:"오늘의 학습",review:"오답 복습",record:"학습 기록"};
    $("sectionName").textContent=names[view];
    document.querySelectorAll("[data-view]").forEach(el=>el.classList.toggle("active",el.dataset.view===view));
    const count=wrongCount(),badge=$("sideWrongCount");badge.textContent=count;badge.hidden=!count;
    const pages={home:renderHome,lessons:renderLessons,study:renderStudy,review:renderReview,record:renderRecord};
    $("appContent").innerHTML=pages[view]();
    if(view==="lessons")renderLessonGrid();
    if(view==="study")renderQuizBlock();
  }
  function weekCells(){
    const now=new Date(),day=(now.getDay()+6)%7;
    return Array.from({length:7},(_,i)=>{const d=new Date(now);d.setDate(d.getDate()+(i-day));const done=!!state.activity[dateKey(d)];
      return `<div class="week-cell"><span>${["월","화","수","목","금","토","일"][i]}</span><div class="day-mark ${done?"done":""} ${i===day?"today":""}">${done?"✓":d.getDate()}</div></div>`}).join("");
  }
  function renderHome(){
    const l=lesson(nextId()),done=completedCount();
    return `
      <section class="hero"><div class="hero-content"><div class="eyebrow">✦ YOUR ENGLISH JOURNEY</div><h1>영어가 자연스러워지는<br><em>하루 15분의 마법!</em> ✨</h1><p>한 번에 많이보다, 매일 조금씩.<br>VOA 공식 영어 수업 52강을 나만의 속도로 배워요.</p>${action("continue","오늘의 영어 시작하기  →")}</div><div class="hero-art" aria-hidden="true"><span class="art-blob"></span><span class="art-star">✦</span><span class="art-person">👩🏻‍🦰</span><span class="art-book">📖</span><span class="art-bubble">Hello! ♡</span></div></section>
      <section class="stats-grid">
        <div class="stat"><div class="stat-icon purple">📚</div><div><small>완료한 강의</small><strong>${done}<span>/ 52강</span></strong></div></div>
        <div class="stat"><div class="stat-icon green">🌿</div><div><small>연속 학습</small><strong>${streak()}<span>일</span></strong></div></div>
        <div class="stat"><div class="stat-icon peach">⭐</div><div><small>전체 진도</small><strong>${pct()}<span>%</span></strong></div></div>
      </section>
      <div class="section-heading"><h2>지금 이어서 배워요 <span aria-hidden="true">🎈</span></h2><button class="link-button" data-view="lessons">전체 강의 보기 ↗</button></div>
      <section class="columns"><div class="panel lesson-feature"><div class="feature-art"><span class="feature-emoji">${lessonIcon(l.id)}</span></div><div class="feature-info"><span class="tiny-label">LESSON ${String(l.id).padStart(2,"0")} / 52</span><h3>${esc(l.title)}</h3><p>${esc(l.translation)} · ${esc(l.topic)}</p>${action("continue","이어서 학습하기  ↗")}<div class="lesson-counter">나의 학습 진도 ${pct()}%</div><div class="progress-track"><div class="progress-fill" style="width:${pct()}%"></div></div></div></div>
        <div class="panel weekly-panel"><div class="weekly-header"><h3>이번 주의 발자국</h3><span>🐾</span></div><p>매일매일의 작은 성취를 모아요.</p><div class="week-days">${weekCells()}</div><div class="small-callout">💜 오늘도 영어와 친해져 볼까요?</div></div>
      </section>
      <div class="section-heading"><h2>하루 15분, 이렇게 해요</h2><span class="tiny-label">3 SIMPLE STEPS</span></div>
      <section class="flow-grid"><button class="flow-card" data-action="video"><span class="flow-num">STEP 01</span><span class="flow-symbol">🎬</span><strong>영상으로 만나기</strong><small>VOA 원어민 대화 듣기</small><span class="arrow-tip">↗</span></button>
        <button class="flow-card" data-action="continue"><span class="flow-num">STEP 02</span><span class="flow-symbol">📝</span><strong>내 표현 정리하기</strong><small>중요한 문장을 내 노트에</small><span class="arrow-tip">↗</span></button>
        <button class="flow-card" data-action="quiz-home"><span class="flow-num">STEP 03</span><span class="flow-symbol">🧩</span><strong>퀴즈로 기억하기</strong><small>풀고, 틀린 문제 또 풀기</small><span class="arrow-tip">↗</span></button>
      </section>
      <div class="resource-strip"><div><strong>📘 공식 VOA 52강 PDF 교재</strong><p>총 601쪽 학습 자료와 실제 대화문으로 빈칸·상황별 말하기를 연습해요.</p></div><div class="study-buttons"><a class="btn btn-white btn-sm" href="${COURSE_PDF}" target="_blank" rel="noopener noreferrer">전체 PDF 열기 ↗</a><button class="btn btn-white btn-sm" data-action="continue">연습 시작하기 →</button></div></div>${footer()}`;
  }
  function renderLessons(){
    return `${heading("FULL COURSE · 52 LESSONS","한 강씩, 차근차근 📚","미국 VOA의 초급 영어 52강을 순서대로 만나보세요. 완료한 강의는 체크 표시로 구분됩니다.")}
      <div class="lesson-filters"><input class="search-input" id="lessonSearch" value="${esc(query)}" placeholder="🔍  강의 제목이나 주제 검색" aria-label="강의 검색"><div class="filter-buttons"><button data-filter="all" class="${filter==="all"?"selected":""}">전체</button><button data-filter="todo" class="${filter==="todo"?"selected":""}">미완료</button><button data-filter="done" class="${filter==="done"?"selected":""}">완료</button></div></div>
      <div id="lessonGrid" class="lesson-grid"></div>${footer()}`;
  }
  function renderLessonGrid(){
    const rows=LESSONS.filter(l=>(filter==="all"||(filter==="done"?state.completed[l.id]:!state.completed[l.id]))&&(`${l.title} ${l.translation} ${l.topic} ${l.id}`.toLowerCase().includes(query.toLowerCase())));
    $("lessonGrid").innerHTML=rows.length?rows.map(l=>`
      <button class="lesson-card" data-action="open-lesson" data-id="${l.id}"><div class="lesson-card-top"><span class="number-pill">LESSON ${String(l.id).padStart(2,"0")}</span>${state.completed[l.id]?'<span class="completed-pill">✓ 완료</span>':""}</div>
      <div class="lesson-card-icon">${lessonIcon(l.id)}</div><h3>${esc(l.title)}</h3><p>${esc(l.translation)}</p><div class="lesson-card-bottom"><span>${esc(l.topic)}</span><b>학습하기 ↗</b></div></button>`).join(""):`<div class="empty-state" style="grid-column:1/-1"><div class="empty-emoji">🔍</div><h3>일치하는 강의가 없어요.</h3><p>다른 단어로 검색하거나 필터를 바꿔 보세요.</p></div>`;
  }
  function renderStudy(){
    const l=lesson(state.selected),p=practiceFor(l.id),last=l.id===52,prev=l.id===1,pdfUrl=`${COURSE_PDF}#page=${p.page}`;
    const media=LESSON_VIDEOS[l.id-1],videoUrl=videoQuality==="720p"?media.hd:media.sd;
    return `<div class="study-header">${heading("TODAY'S ENGLISH","오늘의 영어 시간 ✏️","영상 → 공식 PDF → 듣고 말하기 → 빈칸·상황별 연습 → 퀴즈 → 완료 순서로 공부해요.")}
      <select class="lesson-picker" id="lessonPicker" aria-label="학습할 강의 선택">${LESSONS.map(x=>`<option value="${x.id}" ${x.id===l.id?"selected":""}>${String(x.id).padStart(2,"0")}강 · ${esc(x.title)}</option>`).join("")}</select></div>
      <div class="study-overview"><div class="study-cover" aria-label="${esc(l.topic)} 강의 이미지"><span class="cover-emoji">${lessonIcon(l.id)}</span><span class="cover-sticker">Let's go! ✦</span></div>
        <div class="panel study-details"><span class="tiny-label">VOA LEVEL 1 · LESSON ${String(l.id).padStart(2,"0")}</span><h2>${esc(l.title)}</h2><p>${esc(l.translation)}<br><span style="font-size:11px;color:#b0a6b4">${esc(l.topic)}</span></p>
        <div class="study-buttons"><a class="btn btn-primary" href="#videoSection">▶ 앱에서 영상 보기</a><a class="btn btn-soft" href="${pdfUrl}" target="_blank" rel="noopener noreferrer">📕 ${l.id}강 PDF</a></div></div></div>
      <div class="study-jump" aria-label="강의 내부 바로가기"><a href="#videoSection">🎬 영상</a><a href="#pdfSection">📖 PDF</a><a href="#clozeSection">✏️ 빈칸</a><a href="#scenarioSection">🎙 대답</a><a href="#quizMount">🧩 퀴즈</a></div>
      <section class="panel study-section video-section" id="videoSection"><div class="study-section-title"><span class="step-icon">🎬</span><div><h3>01. 앱에서 공식 영상 보기</h3><p>다른 사이트로 이동할 필요 없이 여기서 바로 재생해 보세요.</p></div></div>
        <div class="lesson-video-wrap">
          <video class="lesson-video-player" id="lessonVideo" data-lesson-id="${l.id}" controls playsinline webkit-playsinline preload="none" poster="${esc(media.poster)}" aria-label="VOA ${l.id}강 영상 - ${esc(l.title)}">
            <source src="${esc(videoUrl)}" type="video/mp4">
            이 브라우저는 영상 재생을 지원하지 않습니다.
          </video>
          <p class="video-error" id="videoPlaybackIssue" role="status" hidden>영상 연결이 원활하지 않아요. 아래 '원본 영상' 버튼으로 열어 보세요.</p>
          <div class="lesson-video-tools"><label for="videoQuality">화질 <select id="videoQuality" aria-label="영상 화질"><option value="360p" ${videoQuality==="360p"?"selected":""}>기본 · 360p</option><option value="720p" ${videoQuality==="720p"?"selected":""}>고화질 · 720p</option></select></label><span>▶ 재생 버튼을 눌러 시작하세요 · 인터넷 연결 필요</span></div>
        </div>
        <div class="study-action-row"><button class="btn ${state.watched[l.id]?"btn-green":"btn-soft"}" data-action="watched" id="watchedButton">${state.watched[l.id]?"✓ 영상 시청 기록됨":"영상 봤어요 ✓"}</button><a href="${l.url}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">원본 영상 ↗</a></div>
        <p class="muted-hint">출처: VOA Learning English · 영상은 공식 서버에서 직접 재생됩니다. 재생이 끝나면 시청 기록이 자동 저장됩니다.</p>
      </section>
      <section class="panel study-section" id="pdfSection"><div class="study-section-title"><span class="step-icon">📕</span><div><h3>02. 공식 PDF 교재 보기</h3><p>VOA 공식 52강 통합 교재 601쪽 중 ${l.id}강 시작 위치: PDF ${p.page}쪽</p></div></div>
        <div class="pdf-callout"><div class="pdf-cover-mark">PDF<span>52</span></div><div><strong>Let's Learn English · Lesson ${l.id}</strong><p>실제 대화문·활동지·교사용 지도안이 포함된 VOA 자료입니다. 별도 요금이 없어요.</p></div></div>
        <div class="study-action-row"><a class="btn btn-primary" href="${pdfUrl}" target="_blank" rel="noopener noreferrer">이 강의 PDF 열기 ↗</a><button class="btn btn-outline" data-action="pdf-preview">앱에서 미리보기</button><a class="btn btn-soft" href="${COURSE_PDF}" target="_blank" rel="noopener noreferrer">52강 전체 PDF ↗</a></div>
        <div id="pdfMount" class="pdf-mount" hidden></div><p class="muted-hint">모바일 PDF 뷰어에 따라 지정 쪽으로 이동하지 않을 수 있습니다. 그때는 표시된 ${p.page}쪽으로 이동해 주세요. 출처: VOA Learning English.</p>
      </section>
      <section class="panel study-section"><div class="study-section-title"><span class="step-icon">💬</span><div><h3>03. 핵심 문장 따라 말하기</h3><p>강의 제목의 영어 표현을 듣고 직접 말해 보세요.</p></div></div>
        <div class="phrase-card"><div><strong>${esc(l.title)}</strong><p>${esc(l.translation)}</p></div><div class="phrase-actions"><button class="icon-btn" data-action="speak" title="영어 듣기" aria-label="영어 듣기">🔊</button><button class="icon-btn" data-action="speech" title="내 발음 확인" aria-label="말하기 연습">🎙</button></div></div><div id="speakResult" aria-live="polite"></div>
      </section>
      ${renderClozeSection(l)}
      ${renderScenarioSection(l)}
      <section id="quizMount" class="quiz-card"></section>
      <section class="panel study-section"><div class="study-section-title"><span class="step-icon">📝</span><div><h3>07. 나만의 영어 노트</h3><p>영상이나 PDF의 중요한 문장을 기록하세요. 자동 저장됩니다.</p></div></div>
        <textarea class="note-box" id="lessonNotes" placeholder="예) Nice to meet you. — 만나서 반가워요.&#10;영상과 PDF에서 배운 표현을 적어 보세요.">${esc(state.notes[l.id]||"")}</textarea>
        <div class="study-action-row"><button class="btn btn-soft" data-action="prompt">✨ AI 학습 프롬프트 복사</button><a class="btn btn-outline" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">ChatGPT 열기 ↗</a><span class="muted-hint">프롬프트를 ChatGPT에 붙여넣으면 추가 학습에 활용할 수 있어요.</span></div><div id="aiPrompt" class="ai-prompt"></div>
      </section>
      <section class="panel study-section"><div class="study-section-title"><span class="step-icon">🏁</span><div><h3>08. 오늘 학습 마무리</h3><p>학습을 마쳤다면 완료 버튼을 눌러 진도에 반영하세요.</p></div></div>
        <div class="study-action-row"><button class="btn ${state.completed[l.id]?"btn-green":"btn-primary"}" data-action="complete">${state.completed[l.id]?"✓ 학습 완료됨":"이 강의 완료하기 ✓"}</button>
        <button class="btn btn-outline" data-action="prev" ${prev?"disabled":""}>← 이전 강의</button><button class="btn btn-outline" data-action="next" ${last?"disabled":""}>다음 강의 →</button></div></section>${footer()}`;
  }
  function blankSentence(c){
    const at=c.line.toLocaleLowerCase("en-US").indexOf(c.word.toLocaleLowerCase("en-US"));
    if(at<0)return esc(c.line);
    return esc(c.line.slice(0,at))+'<span class="exercise-blank" aria-label="빈칸">_______</span>'+esc(c.line.slice(at+c.word.length));
  }
  function renderClozeSection(l){
    const p=practiceFor(l.id),c=p.cloze,done=!!practiceStatus(l.id).cloze;
    return `<section class="panel study-section practice-section" id="clozeSection">
      <div class="study-section-title"><span class="step-icon">✏️</span><div><h3>04. 대화문 빈칸 완성</h3><p>VOA 공식 PDF 속 대화 문장에서 빠진 단어를 직접 입력해 보세요.</p></div></div>
      <div class="exercise-question"><span class="speaker-tag">${esc(c.speaker)}의 대사</span><p class="dialogue-line">${blankSentence(c)}</p></div>
      <label class="practice-label" for="clozeInput">빈칸에 들어갈 영어 단어</label>
      <div class="practice-input-row"><input id="clozeInput" class="practice-input" type="text" autocomplete="off" spellcheck="false" autocapitalize="off" placeholder="영어 단어를 입력하세요" aria-describedby="clozeFeedback"><button class="btn btn-primary" data-action="cloze-check">채점하기</button></div>
      <div class="study-action-row"><button class="btn btn-soft btn-sm" data-action="cloze-hint">💡 첫 글자 힌트</button><span class="muted-hint">대소문자와 문장부호는 구분하지 않아요.</span></div>
      <div id="clozeFeedback" role="status" aria-live="polite">${done?'<div class="feedback">✓ 이전에 정답을 맞혔어요! 다시 풀어도 좋아요.</div>':""}</div>
      <p class="practice-credit">교재 원문 일부 · <a href="${COURSE_PDF}#page=${p.page}" target="_blank" rel="noopener noreferrer">VOA ${l.id}강 PDF ↗</a></p>
    </section>`;
  }
  function renderScenarioSection(l){
    const p=practiceFor(l.id),s=p.scene,done=!!practiceStatus(l.id).scene;
    return `<section class="panel study-section practice-section" id="scenarioSection">
      <div class="study-section-title"><span class="step-icon">🎙</span><div><h3>05. 상황별 영어 응답</h3><p>${s.adapted?"교재 주제에 맞춘 상황입니다.":"VOA 실제 대화의 질문입니다."} 정답 표현은 여러 가지일 수 있어요.</p></div></div>
      <div class="exercise-question"><span class="speaker-tag">${esc(s.speaker)}의 질문</span><p class="dialogue-line">${esc(s.prompt)}</p><small>${esc(s.replySpeaker)}의 입장에서 영어로 답해 보세요.</small></div>
      <label class="practice-label" for="scenarioAnswer">나의 영어 답변</label>
      <textarea class="note-box scenario-answer" id="scenarioAnswer" placeholder="직접 영어로 답하거나 마이크 버튼을 눌러 말해 보세요.">${esc(state.practiceAnswers[l.id]||"")}</textarea>
      <div class="study-action-row"><button class="btn btn-soft" data-action="scene-hear">🔊 질문 듣기</button><button class="btn btn-outline" data-action="scene-mic">🎙 말로 답하기</button><button class="btn btn-primary" data-action="scene-check">예시 답변과 비교 →</button></div>
      <div id="sceneFeedback" role="status" aria-live="polite">${done?'<div class="feedback">✓ 이전에 이 상황을 연습했어요. 다시 도전해 보세요!</div>':""}</div>
      <p class="practice-credit">답변은 자동 저장됩니다. 답안은 스스로 비교해 평가해 주세요. AI 자동 채점 기능은 아닙니다.</p>
    </section>`;
  }
  const strip=s=>s.toLowerCase().replace(/[^a-z0-9]/g,"");
  const hash=s=>Array.from(String(s)).reduce((n,ch)=>((n*31+ch.charCodeAt(0))>>>0),7);
  function shuffled(items,seed){return [...items].sort((a,b)=>hash(String(a)+seed)-hash(String(b)+seed))}
  function quizFor(l){
    const alternatives=shuffled(LESSONS.filter(x=>x.id!==l.id),l.id);
    const english=shuffled([l.title,...alternatives.slice(0,3).map(x=>x.title)],l.id*3);
    const korean=shuffled([l.translation,...alternatives.slice(4,7).map(x=>x.translation)],l.id*5);
    const words=l.title.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||["English"];
    const candidate=words.filter(w=>w.length>=4).sort((a,b)=>b.length-a.length)[0]||words[words.length-1];
    const pool=[...new Set(LESSONS.flatMap(x=>x.title.match(/[A-Za-z]+/g)||[]).filter(w=>w.length>3&&strip(w)!==strip(candidate)))];
    const choices=shuffled([candidate,...shuffled(pool,l.id*11).slice(0,3)],l.id*7);
    const cloze=l.title.replace(candidate,"______");
    return [
      {id:0,question:"이 영어 문장의 뜻은 무엇일까요?",sub:l.title,choices:korean,answer:l.translation,explain:`“${l.title}”은(는) “${l.translation}”이라는 뜻이에요.`},
      {id:1,question:"다음 뜻에 맞는 영어 문장은?",sub:l.translation,choices:english,answer:l.title,explain:`정답은 “${l.title}”이에요. 소리 내어 한 번 더 읽어 보세요.`},
      {id:2,question:"빈칸에 들어갈 단어는?",sub:cloze,choices,answer:candidate,explain:`완성 문장: ${l.title}`}
    ];
  }
  function renderQuizBlock(){
    const mount=$("quizMount");if(!mount)return;
    if(!quiz||quiz.lessonId!==state.selected){
      mount.innerHTML=`<div class="study-section-title"><span class="step-icon">🧩</span><div><h3>06. 3문제 미니 퀴즈</h3><p>강의 제목 표현을 익히는 앱 내 복습 문제입니다. VOA의 공식 평가와는 별개예요.</p></div></div>
        <p class="page-desc" style="margin-bottom:17px">뜻 맞히기, 표현 찾기, 빈칸 채우기로 기억을 확인해요. 틀린 문제는 오답 노트에 자동으로 모입니다.</p>${action("quiz-start","퀴즈 시작하기  →")}`;
      return;
    }
    if(quiz.finished){
      mount.innerHTML=`<div class="quiz-finish"><div class="finish-emoji">${quiz.score===3?"🏆":"🌟"}</div><span class="eyebrow">QUIZ COMPLETE</span><h3>3문제 중 ${quiz.score}문제 정답!</h3><p>틀린 문제는 오답 복습에 저장되었어요. 한 번 더 연습해 볼까요?</p><div class="study-action-row" style="justify-content:center"><button class="btn btn-primary" data-action="quiz-start">한 번 더 풀기 ↻</button><button class="btn btn-outline" data-view="review">오답 노트 보기</button></div></div>`;return;
    }
    const q=quiz.questions[quiz.index];
    mount.innerHTML=`<div class="quiz-head"><span>MINI QUIZ · LESSON ${quiz.lessonId}</span><span class="quiz-counter">${quiz.index+1} / 3</span></div><div class="progress-track" style="margin-top:10px"><div class="progress-fill" style="width:${((quiz.index+1)/3)*100}%"></div></div>
      <div class="quiz-question"><span style="display:block;font-size:12px;color:#9384ae;margin-bottom:8px">Q${quiz.index+1}. ${esc(q.question)}</span>${esc(q.sub)}</div>
      <div class="quiz-choice-list">${q.choices.map((c,i)=>`<button class="quiz-option ${quiz.answered?(c===q.answer?"correct":(i===quiz.answerIndex?"wrong":"")):""}" data-action="quiz-answer" data-index="${i}" ${quiz.answered?"disabled":""}>${esc(c)}</button>`).join("")}</div>
      ${quiz.answered?`<div class="feedback ${quiz.answerIndex!==q.choices.indexOf(q.answer)?"error":""}">${quiz.answerIndex===q.choices.indexOf(q.answer)?"정답이에요! 🎉":"아쉬워요. 다시 복습하면 금방 익숙해질 거예요. 🌷"}<br>${esc(q.explain)}</div><div class="quiz-actions"><button class="btn btn-primary" data-action="quiz-next">${quiz.index===2?"결과 보기":"다음 문제 →"}</button></div>`:""}`;
  }
  function renderReview(){
    const wrong=Object.values(state.wrong).sort((a,b)=>(b.last||"").localeCompare(a.last||""));
    const label=w=>w.step==="cloze"?"PDF 대화문 빈칸":w.step==="scene"?"상황별 영어 응답":`기본 퀴즈 ${Number(w.step)+1}번`;
    return `${heading("REVIEW NOTE","틀려도 괜찮아요 🌼","PDF 빈칸·상황별 응답·기본 퀴즈의 실수를 모아 다시 연습해요.")}
      <div class="section-heading"><h2>다시 만나볼 표현 ${wrong.length}개</h2><button class="link-button" data-view="lessons">강의 찾아보기 ↗</button></div>
      ${wrong.length?`<div class="review-list">${wrong.map(w=>`<div class="review-row"><div><span class="tiny-label">LESSON ${String(w.lessonId).padStart(2,"0")} · ${label(w)}</span><strong>${esc(lesson(w.lessonId).title)}</strong><p>${esc(w.prompt||w.question||"대화 표현 다시 연습")} · ${w.count||1}회 복습 필요</p></div><button class="btn btn-soft btn-sm" data-action="review-lesson" data-id="${Number(w.lessonId)||1}" data-focus="${w.step==="cloze"?"cloze":w.step==="scene"?"scene":"quiz"}">다시 연습 ↻</button></div>`).join("")}</div>`:`<div class="empty-state"><div class="empty-emoji">🎉</div><h3>오답 노트가 비어 있어요!</h3><p>틀린 빈칸 문제나 다시 연습할 상황이 생기면 여기에 모아요.<br>천천히 다시 도전해 보세요.</p><button class="btn btn-primary" data-action="continue">오늘의 학습 시작하기 →</button></div>`}${footer()}`;
  }
  function monthCalendar(){
    const now=new Date(),y=now.getFullYear(),m=now.getMonth()+calendarOffset,first=new Date(y,m,1),month=first.getMonth(),year=first.getFullYear();
    const total=new Date(year,month+1,0).getDate(),start=(first.getDay()+6)%7;
    let cells=["월","화","수","목","금","토","일"].map(d=>`<div class="calendar-day-label">${d}</div>`).join("");
    for(let i=0;i<start;i++)cells+='<div class="calendar-cell blank"></div>';
    for(let day=1;day<=total;day++){const key=`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`,done=!!state.activity[key],today=key===dateKey();
      cells+=`<div class="calendar-cell ${done?"done":""} ${today?"today":""}" title="${done?state.activity[key]+"회 학습":"학습 기록 없음"}">${day}</div>`}
    return {label:`${year}년 ${month+1}월`,html:cells};
  }
  function renderRecord(){
    const calendar=monthCalendar(),dates=activityDates();
    return `${heading("MY GROWTH","나의 성장 기록 🌷","작은 체크 하나하나가 모여 멋진 영어 실력이 됩니다.")}
      <div class="stats-grid"><div class="stat"><div class="stat-icon purple">🏅</div><div><small>완료한 강의</small><strong>${completedCount()}<span>강</span></strong></div></div><div class="stat"><div class="stat-icon green">🗓️</div><div><small>학습한 날</small><strong>${dates.length}<span>일</span></strong></div></div><div class="stat"><div class="stat-icon peach">🔥</div><div><small>연속 학습</small><strong>${streak()}<span>일</span></strong></div></div></div>
      <div class="record-grid"><div class="panel calendar-panel"><div class="calendar-header"><strong>학습 달력 🗓️</strong><div class="calendar-actions"><button class="icon-btn" data-action="calendar-prev" aria-label="이전 달">‹</button><span style="font-size:12px;font-weight:800;min-width:92px;text-align:center;align-self:center">${calendar.label}</span><button class="icon-btn" data-action="calendar-next" aria-label="다음 달">›</button></div></div><div class="calendar-days">${calendar.html}</div><p class="muted-hint" style="margin:18px 0 0">보라색 날짜 = 영상·퀴즈·강의 완료 중 한 가지 이상을 학습한 날</p></div>
      <div class="panel record-summary"><h3>나의 학습 리포트 📊</h3><span class="tiny-label">COURSE PROGRESS</span><div class="record-big">${pct()}<small>% 완료</small></div><div class="progress-track"><div class="progress-fill" style="width:${pct()}%"></div></div><div class="record-legend"><div>완료한 강의 <b>${completedCount()} / 52</b></div><div>풀어 본 강의 퀴즈 <b>${Object.keys(state.quizResults).length}개</b></div><div>대화문 빈칸 완료 <b>${Object.values(state.practice).filter(p=>p&&p.cloze).length} / 52</b></div><div>상황별 대답 완료 <b>${Object.values(state.practice).filter(p=>p&&p.scene).length} / 52</b></div><div>다시 공부할 오답 <b>${wrongCount()}개</b></div><div>기록된 학습일 <b>${dates.length}일</b></div></div><button class="btn btn-outline wide" data-action="open-data">기록 백업 · 가져오기 ↗</button></div></div>${footer()}`;
  }
  const footer=()=>`<footer class="footer-note">Made for little steps, every day. ♡<br>VOA Let's Learn English의 공식 콘텐츠를 연결하는 비공식 개인 학습 도구입니다.</footer>`;

  function speak(text){
    if(!("speechSynthesis" in window)){toast("이 브라우저에서는 음성 재생이 지원되지 않습니다.");return}
    speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.83;u.pitch=1.06;speechSynthesis.speak(u);
  }
  function listen(){
    const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Recognition){toast("말하기 인식은 지원되는 Chrome 브라우저에서 이용해 주세요.");return}
    const target=lesson(state.selected).title,r=new Recognition();r.lang="en-US";r.interimResults=false;r.maxAlternatives=1;
    const area=$("speakResult");area.innerHTML='<div class="speak-result">🎙 지금 영어 문장을 말해 보세요…</div>';
    r.onresult=e=>{const said=e.results[0][0].transcript;const matched=strip(said)===strip(target);
      area.innerHTML=`<div class="speak-result">${matched?"🎉 잘하셨어요!":"👏 잘하셨어요! 원래 문장과 비교하며 다시 말해 보세요."}<br>인식된 말: <strong>${esc(said)}</strong><br>연습 문장: <strong>${esc(target)}</strong></div>`};
    r.onerror=()=>area.innerHTML='<div class="speak-result">마이크 접근을 허용했는지 확인해 주세요. 음성 인식은 기기마다 다를 수 있어요.</div>';
    try{r.start()}catch{toast("마이크를 다시 확인해 주세요.")}
  }
  function listenScenario(){
    const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Recognition){toast("말하기 인식은 지원되는 Chrome 브라우저에서 이용해 주세요.");return}
    const input=$("scenarioAnswer"),id=state.selected;
    if(!input)return;
    const r=new Recognition();r.lang="en-US";r.interimResults=false;r.maxAlternatives=1;
    r.onresult=e=>{
      if(state.selected!==id)return;
      const said=e.results[0][0].transcript;
      input.value=said;state.practiceAnswers[id]=said;save();
      const box=$("sceneFeedback");if(box)box.innerHTML=`<div class="speak-result">🎙 인식된 답변: <strong>${esc(said)}</strong><br>아래의 ‘예시 답변과 비교’를 눌러 확인해 보세요.</div>`;
    };
    r.onerror=e=>toast(e.error==="not-allowed"?"마이크 권한을 허용해 주세요.":"음성 인식에 문제가 있어요. 직접 입력해 주세요.");
    try{r.start();toast("영어로 답해 보세요. 🎙")}catch{toast("마이크를 다시 확인해 주세요.")}
  }
  function promptText(){
    const l=lesson(state.selected),notes=(state.notes[l.id]||"").trim();
    return `당신은 친절한 한국어 영어 회화 선생님입니다. 저는 초급 학습자이고 미국 VOA의 "Let's Learn English - Level 1" ${l.id}강 "${l.title}"(${l.translation})을 공부하고 있습니다.

아래는 제가 직접 기록한 수업 메모입니다:
${notes||"(아직 메모가 없습니다. 이 강의 제목과 주제를 바탕으로, 실제 영상을 보지 않았다는 점을 명시하고 기초 표현을 알려주세요.)"}

1. 제가 적어 둔 내용만 근거로 핵심 표현 5개를 영어·뜻·쉬운 설명으로 정리해 주세요. 메모에 없는 강의 내용은 추측하지 마세요.
2. 중요한 단어 5개와 발음 팁을 알려 주세요.
3. 이 표현들로 4지선다 퀴즈 5문제를 만들고, 정답은 마지막에 모아서 주세요.
4. 틀린 문제를 복습할 수 있도록 짧은 예문 3개를 만들어 주세요.
5. 설명은 초보자에게 이해하기 쉬운 한국어로 해 주세요.`;
  }
  async function copyText(text){try{await navigator.clipboard.writeText(text);toast("복사했어요! ChatGPT에 붙여넣어 보세요.")}catch{const box=$("aiPrompt");if(box){box.classList.add("visible");box.textContent=text;toast("아래 내용을 길게 눌러 복사해 주세요.")}}}

  document.addEventListener("click",async e=>{
    const nav=e.target.closest("[data-view]");if(nav){go(nav.dataset.view);return}
    const btn=e.target.closest("[data-action]");if(!btn)return;
    const id=Number(btn.dataset.id),a=btn.dataset.action,l=lesson(state.selected);
    switch(a){
      case"continue":state.selected=nextId();go("study",state.selected);break;
      case"open-lesson":go("study",id);break;
      case"video":go("study",nextId());setTimeout(()=>$("videoSection")?.scrollIntoView({behavior:"smooth",block:"start"}),120);break;
      case"quiz-home":go("study",nextId());quiz={lessonId:state.selected,index:0,score:0,answered:false,questions:quizFor(lesson(state.selected))};renderQuizBlock();break;
      case"watched":state.watched[l.id]=true;recordActivity();render();toast("영상 학습이 기록됐어요!");break;
      case"speak":speak(l.title);break;
      case"speech":listen();break;
      case"pdf-preview":{
        const holder=$("pdfMount");if(!holder)break;
        if(holder.hidden){
          holder.hidden=false;
          const p=practiceFor(l.id);
          holder.innerHTML=`<iframe title="VOA ${l.id}강 공식 PDF 미리보기" src="${COURSE_PDF}#page=${p.page}" loading="lazy"></iframe><p class="muted-hint">미리보기가 보이지 않으면 ‘이 강의 PDF 열기’를 눌러 주세요.</p>`;
          btn.textContent="미리보기 닫기";
        }else{holder.innerHTML="";holder.hidden=true;btn.textContent="앱에서 미리보기"}
        break;
      }
      case"cloze-hint":{
        const c=practiceFor(l.id).cloze;
        $("clozeFeedback").innerHTML=`<div class="feedback hint">💡 힌트: ${esc(c.word[0].toUpperCase())}로 시작하는 ${c.word.length}글자 단어예요.</div>`;
        $("clozeInput")?.focus();
        break;
      }
      case"cloze-check":{
        const input=$("clozeInput"),given=input?.value.trim();
        if(!given){toast("빈칸에 영어 단어를 입력해 주세요.");input?.focus();break}
        const c=practiceFor(l.id).cloze,correct=strip(given)===strip(c.word);
        const key=`${l.id}-cloze`;
        if(correct){
          state.practice[l.id]={...practiceStatus(l.id),cloze:true};
          delete state.wrong[key];
        }else{
          const old=state.wrong[key];
          state.wrong[key]={lessonId:l.id,step:"cloze",question:"대화문 빈칸",prompt:c.line,count:(old?.count||0)+1,last:new Date().toISOString()};
        }
        recordActivity();
        $("clozeFeedback").innerHTML=correct?
          `<div class="feedback">🎉 정답이에요! <strong>${esc(c.word)}</strong><br>완성 문장: ${esc(c.line)}<div class="study-action-row"><button class="btn btn-soft btn-sm" data-action="cloze-repeat">다시 연습하기 ↻</button></div></div>`:
          `<div class="feedback error">아쉬워요. ‘${esc(given)}’ 대신 다른 단어가 들어가요.<br>첫 글자 힌트를 확인하고 다시 시도해 보세요.</div>`;
        break;
      }
      case"cloze-repeat":$("clozeInput").value="";$("clozeFeedback").innerHTML="";$("clozeInput").focus();break;
      case"scene-hear":speak(practiceFor(l.id).scene.prompt);break;
      case"scene-mic":listenScenario();break;
      case"scene-check":{
        const input=$("scenarioAnswer"),given=input?.value.trim();
        if(!given){toast("먼저 영어로 답변을 입력하거나 마이크로 말해 보세요.");input?.focus();break}
        state.practiceAnswers[l.id]=given;save();
        const scene=practiceFor(l.id).scene;
        $("sceneFeedback").innerHTML=`<div class="scenario-comparison"><span class="tiny-label">MY ANSWER · 내가 답한 문장</span><p>${esc(given)}</p><span class="tiny-label">VOA PRACTICE · 교재 대화 예시</span><p><strong>${esc(scene.example)}</strong> <button class="icon-btn inline-listen" data-action="scene-example-speak" aria-label="예시 답변 듣기">🔊</button></p><small>예시와 정확히 같지 않아도 의미가 통하면 맞게 답한 것으로 선택할 수 있어요.</small><div class="study-action-row"><button class="btn btn-green" data-action="scene-good">✓ 잘 답했어요</button><button class="btn btn-outline" data-action="scene-practice">↻ 더 연습할게요</button></div></div>`;
        break;
      }
      case"scene-example-speak":speak(practiceFor(l.id).scene.example);break;
      case"scene-good":{
        state.practice[l.id]={...practiceStatus(l.id),scene:true};
        delete state.wrong[`${l.id}-scene`];recordActivity();
        $("sceneFeedback").innerHTML='<div class="feedback">🎉 상황별 답변 연습을 완료했어요! 다음 강의에서도 도전해 보세요.</div>';
        break;
      }
      case"scene-practice":{
        const k=`${l.id}-scene`,old=state.wrong[k],scene=practiceFor(l.id).scene;
        state.practice[l.id]={...practiceStatus(l.id),scene:false};
        state.wrong[k]={lessonId:l.id,step:"scene",question:"상황별 영어 응답",prompt:scene.prompt,count:(old?.count||0)+1,last:new Date().toISOString()};
        recordActivity();
        $("sceneFeedback").innerHTML='<div class="feedback hint">🌷 괜찮아요. 오답 노트에 저장했어요. 예시를 듣고 다시 답해 보세요.</div>';
        $("scenarioAnswer")?.focus();
        break;
      }

      case"prompt":{const p=promptText(),el=$("aiPrompt");el.textContent=p;el.classList.add("visible");await copyText(p);break}
      case"quiz-start":quiz={lessonId:l.id,index:0,score:0,answered:false,questions:quizFor(l)};renderQuizBlock();break;
      case"quiz-answer":{
        if(!quiz||quiz.answered)return;const q=quiz.questions[quiz.index],chosen=Number(btn.dataset.index),correct=q.choices[chosen]===q.answer;
        quiz.answerIndex=chosen;quiz.answered=true;if(correct)quiz.score++;
        const k=`${l.id}-${q.id}`;if(correct)delete state.wrong[k];else{const old=state.wrong[k];state.wrong[k]={lessonId:l.id,step:q.id,question:q.question,count:(old?.count||0)+1,last:new Date().toISOString()}}
        save();renderQuizBlock();break;
      }
      case"quiz-next":{
        if(!quiz||!quiz.answered)return;
        if(quiz.index===2){quiz.finished=true;const old=state.quizResults[l.id]||{best:0,attempts:0};state.quizResults[l.id]={best:Math.max(old.best,quiz.score),attempts:old.attempts+1};recordActivity();toast("퀴즈 기록이 저장됐어요!")}
        else{quiz.index++;quiz.answered=false}renderQuizBlock();break;
      }
      case"complete":state.completed[l.id]=true;recordActivity();render();toast("축하해요! 강의를 완료했어요. 🎉");break;
      case"prev":if(l.id>1)go("study",l.id-1);break;
      case"next":if(l.id<52)go("study",l.id+1);break;
      case"review-lesson":{const focus=btn.dataset.focus;go("study",id);if(focus==="quiz"||!focus){quiz={lessonId:id,index:0,score:0,answered:false,questions:quizFor(lesson(id))};renderQuizBlock()}else{setTimeout(()=>(focus==="cloze"?$("clozeSection"):$("scenarioSection"))?.scrollIntoView({behavior:"smooth",block:"start"}),250)}break;}
      case"calendar-prev":calendarOffset--;render();break;
      case"calendar-next":calendarOffset++;render();break;
      case"open-data":$("dataDialog").showModal();break;
    }
  });
  document.addEventListener("input",e=>{
    if(e.target.id==="lessonSearch"){query=e.target.value;renderLessonGrid()}
    if(e.target.id==="lessonNotes"){state.notes[state.selected]=e.target.value;save()}
     if(e.target.id==="scenarioAnswer"){state.practiceAnswers[state.selected]=e.target.value;save()}
  });
  document.addEventListener("change",e=>{
    if(e.target.id==="lessonPicker"){go("study",Number(e.target.value));return}
    if(e.target.id==="videoQuality"){
      videoQuality=e.target.value==="720p"?"720p":"360p";
      const player=$("lessonVideo"),media=LESSON_VIDEOS[state.selected-1];if(!player||!media)return;
      const previousTime=Number.isFinite(player.currentTime)?player.currentTime:0,wasPlaying=!player.paused;
      player.src=videoQuality==="720p"?media.hd:media.sd;
      player.load();
      player.addEventListener("loadedmetadata",()=>{
        if(previousTime>0&&previousTime<player.duration)player.currentTime=previousTime;
        if(wasPlaying)player.play().catch(()=>{});
      },{once:true});
      const notice=$("videoPlaybackIssue");if(notice)notice.hidden=true;
    }
  });
  document.addEventListener("ended",e=>{
    if(e.target.id!=="lessonVideo")return;
    const id=Number(e.target.dataset.lessonId);
    if(!id||state.watched[id])return;
    state.watched[id]=true;recordActivity();
    const button=$("watchedButton");
    if(button&&state.selected===id){button.textContent="✓ 영상 시청 기록됨";button.classList.remove("btn-soft");button.classList.add("btn-green")}
    toast("영상 시청이 자동으로 기록됐어요! 🌱");
  },true);
  document.addEventListener("error",e=>{
    if(e.target.id!=="lessonVideo")return;
    const notice=$("videoPlaybackIssue");if(notice)notice.hidden=false;
  },true);
  document.addEventListener("click",e=>{const f=e.target.closest("[data-filter]");if(!f)return;filter=f.dataset.filter;document.querySelectorAll("[data-filter]").forEach(el=>el.classList.toggle("selected",el===f));renderLessonGrid()});
  $("profileButton").addEventListener("click",()=>$("dataDialog").showModal());
  $("closeDialog").addEventListener("click",()=>$("dataDialog").close());
  $("dataDialog").addEventListener("click",e=>{if(e.target===$("dataDialog"))$("dataDialog").close()});
  $("exportData").addEventListener("click",()=>{
    const blob=new Blob([JSON.stringify({app:"haru-english",version:1,exportedAt:new Date().toISOString(),data:state},null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`haru-english-backup-${dateKey()}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast("백업 파일 다운로드를 시작했어요.");
  });
  $("importData").addEventListener("change",async e=>{
    const file=e.target.files?.[0];if(!file)return;
    if(file.size>2000000){toast("백업 파일이 너무 큽니다.");return}
    try{const parsed=JSON.parse(await file.text());if(parsed.app!=="haru-english"||parsed.version!==1||!parsed.data||typeof parsed.data!=="object")throw Error("invalid");
      if(!confirm("현재 학습 기록을 백업 파일로 교체할까요?"))return;
      const d=parsed.data;state={...defaults(),...d,selected:Math.max(1,Math.min(52,Number(d.selected)||1))};
      for(const k of ["completed","watched","notes","quizResults","wrong","activity","practice","practiceAnswers"])if(!state[k]||typeof state[k]!=="object"||Array.isArray(state[k]))state[k]={};
      save();$("dataDialog").close();render();toast("학습 기록을 가져왔어요.")
    }catch{toast("올바른 하루영어 백업 파일이 아니에요.")}finally{e.target.value=""}
  });
  window.addEventListener("storage",e=>{if(e.key===KEY){state=load();render()}});
  render();
})();
