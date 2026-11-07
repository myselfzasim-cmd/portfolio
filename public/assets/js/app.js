
const APP=(()=>{
 const LANG_KEY="zasim_portfolio_lang";
 const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
 const getLang=()=>localStorage.getItem(LANG_KEY)||"en";
 const setLang=lang=>{localStorage.setItem(LANG_KEY,lang);document.documentElement.lang=lang==="bn"?"bn":"en"};
 const loadJSON=async p=>{const r=await fetch(p,{cache:"no-store"});if(!r.ok)throw Error(p);return r.json()};
 const loadSite=()=>loadJSON("assets/data/site.json"),loadProjects=()=>loadJSON("assets/data/projects.json");
 function initLangToggle(render){document.querySelectorAll("[data-lang-btn]").forEach(b=>{b.classList.toggle("active",b.dataset.langBtn===getLang());b.onclick=()=>{setLang(b.dataset.langBtn);render(getLang())}})}
 function reveal(){const es=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){es.forEach(e=>e.classList.add("in"));return}const io=new IntersectionObserver(a=>a.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});es.forEach(e=>io.observe(e))}
 function chrome(){const bar=document.querySelector("[data-progress]"),cur=document.querySelector("[data-cursor]");let x=0,y=0,cx=0,cy=0,raf=0;window.addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;if(!raf){raf=requestAnimationFrame(()=>{cx+=(x-cx)*.3;cy+=(y-cy)*.3;if(cur){cur.style.left=cx+"px";cur.style.top=cy+"px"}raf=0})}});window.addEventListener("scroll",()=>{if(bar){const m=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${m?scrollY/m:0})`}}, {passive:true});document.querySelectorAll("a,button,[data-preview-src]").forEach(el=>{el.addEventListener("mouseenter",()=>cur&&cur.classList.add("active"));el.addEventListener("mouseleave",()=>cur&&cur.classList.remove("active"))})}
 function preview(){const box=document.querySelector("[data-project-preview]");if(!box)return;const img=box.querySelector("img"),lab=box.querySelector("[data-preview-label]");document.querySelectorAll("[data-preview-src]").forEach(el=>{el.addEventListener("mouseenter",()=>{img.src=el.dataset.previewSrc;lab.textContent=el.dataset.previewLabel||"";box.classList.add("show")});el.addEventListener("mousemove",e=>{box.style.left=Math.min(e.clientX+22,innerWidth-350)+"px";box.style.top=Math.min(e.clientY+22,innerHeight-270)+"px"});el.addEventListener("mouseleave",()=>box.classList.remove("show"))})}
 return{getLang,setLang,loadSite,loadProjects,esc,initLangToggle,reveal,chrome,preview};
})();