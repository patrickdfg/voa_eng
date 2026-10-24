(() => {
  "use strict";
  const KEY="haru-english-v1";
  const $=id=>document.getElementById(id);
  const lesson=id=>LESSONS[Math.max(0,Math.min(51,Number(id)-1))];
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const dateKey=(d=new Date())=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit"}).format(d);
  const formatDate=d=>new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",month:"long",day:"numeric",weekday:"short"}).format(d);
  const defaults=()=>({selected:1,completed:{},watched:{},notes:{},quizResults:{},wrong:{},activity:{}});
  function load(){try{const raw=JSON.parse(localStorage.getItem(KEY));return raw&&typeof raw==="object"?{...defaults(),...raw}:defaults()}catch{return defaults()}}
  let state=load(),view="home",filter="all",query="",quiz=null,calendarOffset=0,toastTimer;
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch{toast("저장 공간을 확인해 주세요.")}};
  const completedCount=()=>Object.values(state.completed).filter(Boolean).length;
  const wrongCount=()=>Object.keys(state.wrong).length;
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
      <div class="resource-strip"><div><strong>📘 VOA에서 제공하는 공식 학습 자료</strong><p>52강 영상, 발음 연습, 다운로드 학습지, 평가 퀴즈까지 무료로 살펴보세요.</p></div><a class="btn btn-white btn-sm" href="${RESOURCES.index}" target="_blank" rel="noopener noreferrer">공식 사이트 ↗</a></div>${footer()}`;
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
    const l=lesson(state.selected),last=l.id===52,prev=l.id===1;
    return `<div class="study-header">${heading("TODAY'S ENGLISH","오늘의 영어 시간 ✏️","영상 보기 → 표현 익히기 → 퀴즈 → 완료 체크, 차례로 공부해 보세요.")}
      <select class="lesson-picker" id="lessonPicker" aria-label="학습할 강의 선택">${LESSONS.map(x=>`<option value="${x.id}" ${x.id===l.id?"selected":""}>${String(x.id).padStart(2,"0")}강 · ${esc(x.title)}</option>`).join("")}</select></div>
      <div class="study-overview"><div class="study-cover" aria-label="${esc(l.topic)} 강의 이미지"><span class="cover-emoji">${lessonIcon(l.id)}</span><span class="cover-sticker">Let's go! ✦</span></div>
        <div class="panel study-details"><span class="tiny-label">VOA LEVEL 1 · LESSON ${String(l.id).padStart(2,"0")}</span><h2>${esc(l.title)}</h2><p>${esc(l.translation)}<br><span style="font-size:11px;color:#b0a6b4">${esc(l.topic)}</span></p>
        <div class="study-buttons"><a class="btn btn-primary" href="${l.url}" target="_blank" rel="noopener noreferrer" data-track-video="${l.id}">▶ 공식 영상 · 학습지</a><button class="btn btn-soft" data-action="speak">🔊 듣기</button></div></div></div>
      <section class="panel study-section"><div class="study-section-title"><span class="step-icon">🎬</span><div><h3>01. 영상으로 만나기</h3><p>VOA 강의 페이지에서 영상과 발음 연습, 학습지를 확인하세요.</p></div></div>
        <div class="study-action-row"><a href="${l.url}" class="btn btn-outline" target="_blank" rel="noopener noreferrer" data-track-video="${l.id}">VOA ${l.id}강 열기 ↗</a><button class="btn ${state.watched[l.id]?"btn-green":"btn-soft"}" data-action="watched">${state.watched[l.id]?"✓ 영상 시청 기록됨":"영상 봤어요 ✓"}</button></div>
        <p class="muted-hint">공식 사이트에서 영상을 감상하고 이 페이지로 돌아와 주세요. VOA의 영상·원문·학습지는 외부 페이지에서 열립니다.</p>
      </section>
      <section class="panel study-section"><div class="study-section-title"><span class="step-icon">💬</span><div><h3>02. 핵심 문장 따라 말하기</h3><p>강의 제목의 영어 표현을 듣고, 직접 소리 내어 말해 보세요.</p></div></div>
        <div class="phrase-card"><div><strong>${esc(l.title)}</strong><p>${esc(l.translation)}</p></div><div class="phrase-actions"><button class="icon-btn" data-action="speak" title="영어 듣기" aria-label="영어 듣기">🔊</button><button class="icon-btn" data-action="speech" title="내 발음 확인" aria-label="말하기 연습">🎙</button></div></div><div id="speakResult" aria-live="polite"></div>
      </section>
      <section class="panel study-section"><div class="study-section-title"><span class="step-icon">📝</span><div><h3>03. 나만의 영어 노트</h3><p>영상 속 중요한 문장이나 새 단어를 적어 두세요. 자동 저장돼요.</p></div></div>
        <textarea class="note-box" id="lessonNotes" placeholder="예) Nice to meet you. — 만나서 반가워요.&#10;영상에서 배운 표현과 궁금한 점을 적어 보세요.">${esc(state.notes[l.id]||"")}</textarea>
        <div class="study-action-row"><button class="btn btn-soft" data-action="prompt">✨ AI 학습 프롬프트 복사</button><a class="btn btn-outline" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">ChatGPT 열기 ↗</a><span class="muted-hint">복사한 내용을 ChatGPT에 붙여넣으면 맞춤 요약·퀴즈를 만들 수 있어요.</span></div><div id="aiPrompt" class="ai-prompt"></div>
      </section>
      <section id="quizMount" class="quiz-card"></section>
      <section class="panel study-section"><div class="study-section-title"><span class="step-icon">🏁</span><div><h3>05. 오늘 학습 마무리</h3><p>학습을 마쳤다면 완료 버튼을 눌러 진도에 반영하세요.</p></div></div>
        <div class="study-action-row"><button class="btn ${state.completed[l.id]?"btn-green":"btn-primary"}" data-action="complete">${state.completed[l.id]?"✓ 학습 완료됨":"이 강의 완료하기 ✓"}</button>
        <button class="btn btn-outline" data-action="prev" ${prev?"disabled":""}>← 이전 강의</button><button class="btn btn-outline" data-action="next" ${last?"disabled":""}>다음 강의 →</button></div></section>${footer()}`;
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
      mount.innerHTML=`<div class="study-section-title"><span class="step-icon">🧩</span><div><h3>04. 3문제 미니 퀴즈</h3><p>강의 제목 표현을 익히는 앱 내 복습 문제입니다. VOA의 공식 평가와는 별개예요.</p></div></div>
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
    return `${heading("REVIEW NOTE","틀려도 괜찮아요 🌼","오답은 실력이 자라는 단서예요. 다시 풀고 맞히면 이 목록에서 사라집니다.")}
      <div class="section-heading"><h2>다시 만나볼 표현 ${wrong.length}개</h2><button class="link-button" data-view="lessons">강의 찾아보기 ↗</button></div>
      ${wrong.length?`<div class="review-list">${wrong.map(w=>`<div class="review-row"><div><span class="tiny-label">LESSON ${String(w.lessonId).padStart(2,"0")} · ${w.step+1}번 문제</span><strong>${esc(lesson(w.lessonId).title)}</strong><p>${esc(w.question)} · ${w.count}회 실수</p></div><button class="btn btn-soft btn-sm" data-action="review-lesson" data-id="${w.lessonId}">다시 풀기 ↻</button></div>`).join("")}</div>`:`<div class="empty-state"><div class="empty-emoji">🎉</div><h3>오답 노트가 비어 있어요!</h3><p>퀴즈에서 틀린 문제가 생기면 여기에 모아 드릴게요.<br>모르는 표현이 있어도 천천히 다시 도전하면 돼요.</p><button class="btn btn-primary" data-action="continue">오늘의 퀴즈 풀기 →</button></div>`}${footer()}`;
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
      <div class="panel record-summary"><h3>나의 학습 리포트 📊</h3><span class="tiny-label">COURSE PROGRESS</span><div class="record-big">${pct()}<small>% 완료</small></div><div class="progress-track"><div class="progress-fill" style="width:${pct()}%"></div></div><div class="record-legend"><div>완료한 강의 <b>${completedCount()} / 52</b></div><div>풀어 본 강의 퀴즈 <b>${Object.keys(state.quizResults).length}개</b></div><div>다시 공부할 오답 <b>${wrongCount()}개</b></div><div>기록된 학습일 <b>${dates.length}일</b></div></div><button class="btn btn-outline wide" data-action="open-data">기록 백업 · 가져오기 ↗</button></div></div>${footer()}`;
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
    const tracked=e.target.closest("[data-track-video]");if(tracked){state.watched[tracked.dataset.trackVideo]=true;recordActivity();return}
    const btn=e.target.closest("[data-action]");if(!btn)return;
    const id=Number(btn.dataset.id),a=btn.dataset.action,l=lesson(state.selected);
    switch(a){
      case"continue":state.selected=nextId();go("study",state.selected);break;
      case"open-lesson":go("study",id);break;
      case"video":window.open(lesson(nextId()).url,"_blank","noopener,noreferrer");state.watched[nextId()]=true;recordActivity();break;
      case"quiz-home":go("study",nextId());quiz={lessonId:state.selected,index:0,score:0,answered:false,questions:quizFor(lesson(state.selected))};renderQuizBlock();break;
      case"watched":state.watched[l.id]=true;recordActivity();render();toast("영상 학습이 기록됐어요!");break;
      case"speak":speak(l.title);break;
      case"speech":listen();break;
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
      case"review-lesson":go("study",id);quiz={lessonId:id,index:0,score:0,answered:false,questions:quizFor(lesson(id))};renderQuizBlock();break;
      case"calendar-prev":calendarOffset--;render();break;
      case"calendar-next":calendarOffset++;render();break;
      case"open-data":$("dataDialog").showModal();break;
    }
  });
  document.addEventListener("input",e=>{
    if(e.target.id==="lessonSearch"){query=e.target.value;renderLessonGrid()}
    if(e.target.id==="lessonNotes"){state.notes[state.selected]=e.target.value;save()}
  });
  document.addEventListener("change",e=>{if(e.target.id==="lessonPicker")go("study",Number(e.target.value))});
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
      for(const k of ["completed","watched","notes","quizResults","wrong","activity"])if(!state[k]||typeof state[k]!=="object"||Array.isArray(state[k]))state[k]={};
      save();$("dataDialog").close();render();toast("학습 기록을 가져왔어요.")
    }catch{toast("올바른 하루영어 백업 파일이 아니에요.")}finally{e.target.value=""}
  });
  window.addEventListener("storage",e=>{if(e.key===KEY){state=load();render()}});
  render();
})();
