
(async()=>{
 const site=await APP.loadSite(),projects=await APP.loadProjects(),id=new URLSearchParams(location.search).get("id");
 const p=projects.find(x=>x.id===id)||projects[0]; let active=0;
 const safe=x=>APP.esc(x);
 function render(lang){
  const s=site[lang]||site.en,t=p[lang]||p.en,j=(p.journey?.[lang]||p.journey?.en||[]);
  const next=projects[(projects.findIndex(x=>x.id===p.id)+1)%projects.length];
  document.title=`${t.title} — ${s.name||"Zasim Uddin"}`;
  document.getElementById("project-root").innerHTML=`
  <section class="case-hero"><div class="container"><a class="case-kicker" href="work.html">← Back to archive</a>
   <div class="case-heading"><div><div class="index">${safe(p.category)} / ${safe(p.year)}</div><h1>${safe(t.title)}</h1></div><div class="case-meta">CLIENT / ${safe(t.client)}<br>ROLE / ${safe(t.role)}<br>FOCUS / ${safe(t.tools)}</div></div>
   <div class="cover"><img src="${safe(p.coverImage||p.thumbnail)}" alt="${safe(t.title)}"></div>
  </div></section>
  <section class="journey" id="journey"><div class="container">
   <div class="journey-top"><div><div class="index">01 / THE JOURNEY</div><h2 class="section-title">From <span class="serif">request</span> to locked final.</h2></div><div class="journey-controls"><button data-prev aria-label="Previous">←</button><button data-next aria-label="Next">→</button></div></div>
   <div class="journey-slider"><div class="journey-track" data-track>${j.map((step,i)=>`<article class="journey-card"><div class="journey-image"><img src="${safe(step.image)}" alt="${safe(step.imageAlt||step.title)}"></div><div class="journey-copy"><div><div class="journey-overline">${safe(step.type||"phase")} · ${safe(step.date||"")}${step.endDate&&step.endDate!==step.date?" — "+safe(step.endDate):""}</div><h2>${safe(step.title||"Journey step")}</h2><p class="desc">${safe(step.description||"")}</p></div><div>${step.sourceUrl?`<a class="source-link" href="${safe(step.sourceUrl)}" target="_blank" rel="noopener">${safe(step.sourceLabel||"Open source")} ↗</a>`:`<span class="source-link">${lang==="bn"?"Source / screenshot পরে যোগ হবে":"Source / screenshot slot"}</span>`}</div></div></article>`).join("")}</div></div>
   <div class="timeline"><div class="timeline-track">${j.map((step,i)=>`<div class="timeline-stop ${i===0?"active":""}" data-stop="${i}"><button><span class="tl-title">${safe(step.title||"Step")}</span><span class="tl-date">${safe(step.date||"—")}</span></button></div>`).join("")}</div><div class="journey-progress"><span data-progress-fill></span></div></div>
  </div></section>
  <section class="story-after" id="story"><div class="container"><div class="section-head"><div><div class="index">02 / DESIGN STORY</div><h2 class="section-title">The thinking <span class="serif">behind</span> the output.</h2></div><p class="note">${safe(t.summary||"")}</p></div>
   <div class="story-grid">
    <article class="story-card"><div class="small">The Brief</div><p>${safe(t.brief||"")}</p></article>
    <article class="story-card"><div class="small">The Problem</div><p>${safe(t.problem||"")}</p></article>
    <article class="story-card"><div class="small">The Thinking</div><p>${safe(t.thinking||"")}</p></article>
    <article class="story-card"><div class="small">Design Direction</div><p>${safe(t.direction||"")}</p></article>
    <article class="story-card"><div class="small">Client Feedback</div><p>${safe(t.feedback||"")}</p></article>
    <article class="story-card"><div class="small">Final Result</div><p>${safe(t.result||"")}</p></article>
   </div></div></section>
  <section class="next-project" id="next"><div class="container"><div class="index">03 / NEXT PROJECT</div><a href="project.html?id=${encodeURIComponent(next.id)}#journey"><span>${safe(next.category)} / ${safe(next.year)}</span>${safe((next[lang]||next.en).title)} ↗</a></div></section>`;
  active=0;bindJourney(j);APP.reveal();APP.chrome();
  document.getElementById("footer").textContent=`© ${new Date().getFullYear()} ${s.name||"Zasim Uddin"}.`;
 }
 function bindJourney(j){
   const track=document.querySelector("[data-track]"), fill=document.querySelector("[data-progress-fill]"), stops=[...document.querySelectorAll("[data-stop]")];
   const set=i=>{active=Math.max(0,Math.min(j.length-1,i));track.style.transform=`translateX(${active*100}%)`;stops.forEach((s,k)=>s.classList.toggle("active",k===active));if(fill)fill.style.width=`${((active+1)/j.length)*100}%`;history.replaceState(null,"",location.pathname+location.search+"#journey")};
   document.querySelector("[data-prev]").onclick=()=>set(active-1);document.querySelector("[data-next]").onclick=()=>set(active+1);stops.forEach(s=>s.onclick=()=>set(Number(s.dataset.stop)));
   let sx=0;track.addEventListener("touchstart",e=>{sx=e.touches[0].clientX},{passive:true});track.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)set(active+(dx<0?1:-1))},{passive:true});
   window.addEventListener("keydown",e=>{if(e.key==="ArrowRight")set(active+1);if(e.key==="ArrowLeft")set(active-1)});
 }
 APP.initLangToggle(render);render(APP.getLang());
})();