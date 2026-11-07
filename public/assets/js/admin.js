
(()=> {
 const KEY="zasim_admin_projects_v2",form=document.getElementById("project-form"),list=document.getElementById("project-list"),journeyRoot=document.getElementById("journey-editor"),storyRoot=document.getElementById("story-fields"),status=document.getElementById("status");
 let projects=[],selected=-1;
 const phaseMeta=[
  {type:"brief",label:"01 / Brief",bn:"০১ / ব্রিফ"},
  {type:"framework",label:"02 / Framework",bn:"০২ / ফ্রেমওয়ার্ক"},
  {type:"design",label:"03 / Design",bn:"০৩ / ডিজাইন"},
  {type:"feedback",label:"04 / Feedback",bn:"০৪ / ফিডব্যাক"},
  {type:"final",label:"05 / Final",bn:"০৫ / ফাইনাল"}
 ];
 const storyFields=[["brief","The Brief"],["problem","The Problem"],["thinking","The Thinking"],["direction","Design Direction"],["production","Production & Die-line"],["mockup","Mockup / Presentation"],["feedback","Client Feedback"],["result","Final Result"]];
 const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
 const flash=m=>{status.textContent=m;status.classList.add("show");clearTimeout(flash.t);flash.t=setTimeout(()=>status.classList.remove("show"),2800)};
 const blank=()=>({id:"project-"+Date.now(),featured:false,published:true,demo:false,year:String(new Date().getFullYear()),category:"Packaging",thumbnail:"assets/img/project-cover.jpg",coverImage:"assets/img/project-cover.jpg",gallery:[],en:{title:"",client:"",summary:"",role:"Graphic Designer",tools:"Packaging · Branding · Production"},bn:{title:"",client:"",summary:"",role:"Graphic Designer",tools:"Packaging · Branding · Production"},journey:{en:phaseMeta.map((m,i)=>({id:"step-"+(i+1),type:m.type,title:m.label,date:"",endDate:"",image:"",imageAlt:"",description:"",sourceUrl:"",sourceLabel:"Open source"})),bn:[]}});

 function normalize(p){
   p.journey=p.journey||{}; p.journey.en=p.journey.en||phaseMeta.map((m,i)=>({id:"step-"+(i+1),type:m.type,title:m.label,date:"",endDate:"",image:"",imageAlt:"",description:"",sourceUrl:"",sourceLabel:"Open source"}));p.journey.bn=p.journey.bn||p.journey.en.map((s,i)=>({...s,title:phaseMeta[i].bn}));
   phaseMeta.forEach((m,i)=>{p.journey.en[i]=Object.assign({type:m.type},p.journey.en[i]||{});p.journey.bn[i]=Object.assign({type:m.type},p.journey.bn[i]||{});});
   return p
 }
 function saveLocal(){localStorage.setItem(KEY,JSON.stringify(projects));flash("Saved in this browser.");renderList()}
 function renderList(){list.innerHTML=projects.map((p,i)=>`<button class="pitem ${i===selected?"active":""}" data-i="${i}"><span>${String(i+1).padStart(2,"0")}</span><b>${esc(p.en?.title||"Untitled")}</b><small>${esc(p.category||"")} ${p.published===false?"· DRAFT":""}</small></button>`).join("")}
 function text(name,value){const x=form.elements[name];if(x)x.value=value??""}
 function get(name){return form.elements[name]?.value||""}
 function buildJourney(p){
   journeyRoot.innerHTML=phaseMeta.map((m,i)=>{const en=p.journey.en[i]||{},bn=p.journey.bn[i]||{};return `<div class="journey-step">
    <div class="journey-title"><strong>${m.label}</strong><span class="tag">${m.type.toUpperCase()}</span></div>
    <div class="step-grid"><label>Phase title — EN<input name="j${i}_title_en" value="${esc(en.title)}"></label><label>Phase title — BN<input name="j${i}_title_bn" value="${esc(bn.title)}"></label></div>
    <div class="grid2"><label>Start date<input name="j${i}_date" type="date" value="${esc(en.date)}"></label><label>End date<input name="j${i}_endDate" type="date" value="${esc(en.endDate||en.date)}"></label></div>
    <div class="grid2"><label>Description — EN<textarea name="j${i}_desc_en">${esc(en.description)}</textarea></label><label>Description — BN<textarea name="j${i}_desc_bn">${esc(bn.description)}</textarea></label></div>
    <div class="grid2"><label>Image path / URL<input id="j${i}_image" name="j${i}_image" value="${esc(en.image)}" placeholder="assets/img/phase.jpg or https://..."></label><label>Source / Brief URL<input name="j${i}_source" value="${esc(en.sourceUrl)}" placeholder="https://..."></label></div>
    <div class="media-box"><label>Upload screenshot / image<input data-upload="${i}" type="file" accept="image/*"></label><div class="help">The upload is embedded into the browser project data. For GitHub, use compressed JPG/WebP when possible.</div><img id="preview-${i}" class="media-preview" src="${esc(en.image)}" alt=""></div>
   </div>`}).join("");
   phaseMeta.forEach((m,i)=>{const file=document.querySelector(`[data-upload="${i}"]`),preview=document.getElementById(`preview-${i}`);file.onchange=()=>{const f=file.files?.[0];if(!f)return;const reader=new FileReader();reader.onload=()=>{form.elements[`j${i}_image`].value=reader.result;preview.src=reader.result;preview.classList.add("show");flash(`Uploaded ${f.name}`)};reader.readAsDataURL(f)}})
 }
 function buildStory(p){storyRoot.innerHTML=storyFields.map(([k,l])=>`<div class="grid2"><label>${l} — EN<textarea name="${k}_en">${esc(p.en[k]||"")}</textarea></label><label>${l} — BN<textarea name="${k}_bn">${esc(p.bn[k]||"")}</textarea></label></div>`).join("")}
 function load(i){selected=i;const p=normalize(JSON.parse(JSON.stringify(projects[i])));renderList();text("id",p.id);text("category",p.category);text("year",p.year);text("title_en",p.en.title);text("title_bn",p.bn.title);text("client_en",p.en.client);text("client_bn",p.bn.client);text("summary_en",p.en.summary);text("summary_bn",p.bn.summary);text("thumbnail",p.thumbnail);text("coverImage",p.coverImage);text("gallery",(p.gallery||[]).join("\n"));form.elements.featured.checked=!!p.featured;form.elements.published.checked=p.published!==false;buildJourney(p);buildStory(p);document.getElementById("form-title").textContent="Edit project";document.getElementById("project-url").textContent=`project.html?id=${encodeURIComponent(p.id)}#journey`}
 function loadBlank(){selected=-1;const p=blank();form.reset();text("id",p.id);text("year",p.year);text("category",p.category);text("thumbnail",p.thumbnail);text("coverImage",p.coverImage);form.elements.published.checked=true;form.elements.featured.checked=false;buildJourney(p);buildStory(p);document.getElementById("form-title").textContent="Add a new project";document.getElementById("project-url").textContent="Preview URL appears after saving.";renderList()}
 function collect(){
   const p=selected>=0?normalize(JSON.parse(JSON.stringify(projects[selected]))):blank();
   p.id=get("id").trim();p.category=get("category").trim()||"Packaging";p.year=get("year").trim()||String(new Date().getFullYear());p.featured=form.elements.featured.checked;p.published=form.elements.published.checked;p.demo=false;p.thumbnail=get("thumbnail").trim();p.coverImage=get("coverImage").trim()||p.thumbnail;p.gallery=get("gallery").split("\n").map(s=>s.trim()).filter(Boolean);
   p.en.title=get("title_en");p.bn.title=get("title_bn")||p.en.title;p.en.client=get("client_en");p.bn.client=get("client_bn")||p.en.client;p.en.summary=get("summary_en");p.bn.summary=get("summary_bn")||p.en.summary;
   p.journey={en:[],bn:[]};phaseMeta.forEach((m,i)=>{const en={id:"step-"+(i+1),type:m.type,title:get(`j${i}_title_en`)||m.label,date:get(`j${i}_date`),endDate:get(`j${i}_endDate`),image:get(`j${i}_image`),imageAlt:get("title_en"),description:get(`j${i}_desc_en`),sourceUrl:get(`j${i}_source`),sourceLabel:"Open source"};const bn={...en,title:get(`j${i}_title_bn`)||m.bn,description:get(`j${i}_desc_bn`)||en.description};p.journey.en.push(en);p.journey.bn.push(bn)});
   storyFields.forEach(([k])=>{p.en[k]=get(k+"_en");p.bn[k]=get(k+"_bn")||p.en[k]});
   return p
 }
 function save(){const p=collect();if(!p.id||!p.en.title){flash("Project ID and English title are required.");return}if(selected>=0)projects[selected]=p;else{projects.push(p);selected=projects.length-1}saveLocal();load(selected)}
 document.getElementById("save-top").onclick=save;document.getElementById("save-bottom").onclick=save;form.onsubmit=e=>{e.preventDefault();save()};
 document.getElementById("new-project").onclick=loadBlank;
 list.onclick=e=>{const b=e.target.closest("[data-i]");if(b)load(Number(b.dataset.i))};
 document.getElementById("delete").onclick=()=>{if(selected<0)return;if(confirm("Delete this project from the local admin list?")){projects.splice(selected,1);selected=-1;saveLocal();loadBlank()}};
 document.getElementById("duplicate").onclick=()=>{if(selected<0)return;const p=JSON.parse(JSON.stringify(projects[selected]));p.id=p.id+"-"+Date.now().toString().slice(-4);p.en.title=(p.en.title||"Project")+" Copy";p.bn.title=(p.bn.title||p.en.title)+" Copy";projects.push(p);selected=projects.length-1;saveLocal();load(selected)};
 document.getElementById("preview-project").onclick=()=>{const p=selected>=0?projects[selected]:null;if(!p){flash("Save the project first.");return}window.open("project.html?id="+encodeURIComponent(p.id)+"#journey","_blank")};
 document.getElementById("export-json").onclick=()=>{const blob=new Blob([JSON.stringify(projects,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="projects.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),600);flash("projects.json exported.")};
 document.getElementById("import-json").onclick=()=>document.getElementById("json-input").click();document.getElementById("json-input").onchange=e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{projects=JSON.parse(r.result).map(normalize);localStorage.setItem(KEY,JSON.stringify(projects));selected=projects.length?0:-1;renderList();selected>=0?load(0):loadBlank();flash("JSON imported.")}catch(err){flash("Invalid JSON file.")}};r.readAsText(f)};
 document.getElementById("reset-demo").onclick=async()=>{if(!confirm("Reset admin to the bundled demo projects?"))return;const r=await fetch("assets/data/projects.json",{cache:"no-store"});projects=(await r.json()).map(normalize);localStorage.setItem(KEY,JSON.stringify(projects));selected=0;renderList();load(0);flash("Demo projects restored.")};
 async function init(){try{const raw=localStorage.getItem(KEY);if(raw){projects=JSON.parse(raw).map(normalize)}else{const r=await fetch("assets/data/projects.json",{cache:"no-store"});projects=(await r.json()).map(normalize)}if(projects.length)load(0);else loadBlank()}catch(e){flash("Could not load projects.");loadBlank()}}
 init();
})();