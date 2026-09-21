/* ============================================================
   30-MAKTAB — app.js
   Eng muhim o‘zgartiriladigan joylar:
   1) SOCIAL_LINKS — Instagram/Telegram/YouTube
   2) SCHOOL_INFO — maktab manzili va Google Maps
   3) TEACHERS / STUDENTS — ism, fan, sinf, rasm
   4) ACHIEVEMENTS / ABOUT_ITEMS — yutuq va maktab ma’lumotlari
   5) SCHEDULE — qo‘ng‘iroq vaqtlarini moslash
   ============================================================ */

const SOCIAL_LINKS = {
  instagram: "https://instagram.com/",
  telegram: "https://t.me/",
  youtube: "https://youtube.com/"
};

const SCHOOL_INFO = {
  name: "30-maktab",
  district: "Sirdaryo viloyati, Xovos tumani",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=30-maktab+Xovos+Sirdaryo"
};

/* 
   JADVAL:
   Siz bergan aniq vaqtlar asosida tuzildi.
   1-smena: 08:00 dan boshlanadi.
   3-darsdan keyin katta tanaffus 10 daqiqa.
   2-smena: 13:00 dan boshlanadi.
   3-darsdan keyin yana 10 daqiqa.
   Oxirgi darslar 17:55 atrofida tugashi uchun 2-smena 6-dars 17:10–17:55 qilindi.
   Agar maktabdagi haqiqiy jadval boshqa bo‘lsa, faqat shu massivni o‘zgartiring.
*/
const SCHEDULE = [
  { n: 1, s1: ["08:00","08:45"], s2: ["13:00","13:45"], breakAfter: 5 },
  { n: 2, s1: ["08:50","09:35"], s2: ["13:50","14:35"], breakAfter: 5 },
  { n: 3, s1: ["09:40","10:25"], s2: ["14:40","15:25"], breakAfter: 10 },
  { n: 4, s1: ["10:35","11:20"], s2: ["15:35","16:20"], breakAfter: 5 },
  { n: 5, s1: ["11:25","12:10"], s2: ["16:25","17:10"], breakAfter: 5 },
  { n: 6, s1: ["12:15","13:00"], s2: ["17:10","17:55"], breakAfter: 0 }
];

const SUBJECTS = ["Matematika","Ona tili","Ingliz tili","Tarix","Informatika","Biologiya","Fizika","Kimyo","Geografiya","Boshlang‘ich"];

const makePlaceholder = (type, i) => {
  const seed = type === "teacher" ? "Ustoz" : "O‘quvchi";
  return { name: `${seed} ${String(i).padStart(2,"0")}`, subject: type === "teacher" ? SUBJECTS[(i-1)%SUBJECTS.length] : `${5 + ((i-1)%7)}-sinf`, className: type === "teacher" ? "Fan o‘qituvchisi" : "Iqtidorli o‘quvchi", image: "" };
};

/* 50 ta o‘qituvchi. Ism va rasmni shu massivdan o‘zgartiring. */
const TEACHERS = Array.from({length:50}, (_,i)=>makePlaceholder("teacher",i+1));
TEACHERS[0] = {name:"O‘qituvchi 01",subject:"Matematika",className:"Matematika o‘qituvchisi",image:""};
TEACHERS[1] = {name:"O‘qituvchi 02",subject:"Ingliz tili",className:"Ingliz tili o‘qituvchisi",image:""};

/* 50 ta iqtidorli o‘quvchi. */
const STUDENTS = Array.from({length:50}, (_,i)=>makePlaceholder("student",i+1));

const ACHIEVEMENTS = [
  ["01","Fan olimpiadalari","Maktab o‘quvchilari fan olimpiadalarida qatnashgan natijalarni shu yerga yozing."],
  ["02","Sport yutuqlari","Futbol, voleybol, shaxmat va boshqa sport musobaqalari natijalari."],
  ["03","Zukko kitobxon","Kitobxonlik tanlovlaridagi natijalar va faxriy yorliqlar."],
  ["04","IT va texnologiya","Dasturlash, robototexnika va innovatsion loyihalar."],
  ["05","Ijodiy tanlovlar","She’r, rasm, musiqa va ijodiy ko‘rik-tanlovlar."],
  ["06","Til tanlovlari","Ingliz, rus va boshqa tillardagi tanlov natijalari."],
  ["07","Viloyat bosqichi","Viloyat miqyosidagi tanlov va musobaqalar."],
  ["08","Respublika bosqichi","Respublika miqyosidagi ishtirok va natijalar."],
  ["09","Eng faol jamoa","Maktab jamoasining ijtimoiy va ma’naviy tadbirlari."],
  ["10","Yilning namunali o‘quvchisi","Namunali o‘quvchilar haqida ma’lumot."],
  ["11","Yangi rekordlar","Maktab uchun muhim bo‘lgan yangi natijalar."],
  ["12","Boshqa yutuqlar","Istalgan qo‘shimcha yutuqlarni shu yerga kiriting."]
];

const ABOUT_ITEMS = [
  ["Maktabimiz","30-maktab haqida asosiy ma’lumot, tashkil topgan yili va umumiy faoliyatini yozing.","assets/maktab-front.jpg"],
  ["Ta’lim jarayoni","Fanlar, sinflar, o‘quv jarayoni va zamonaviy ta’lim imkoniyatlari haqida yozing.","assets/maktab-old-front.jpg"],
  ["Maktab jamoasi","Direktor, o‘qituvchilar va xodimlar jamoasi haqida ma’lumot kiriting.","assets/maktab-front.jpg"],
  ["Tadbirlar","Bayramlar, ochiq darslar, musobaqalar va maktab tadbirlari haqida yozing.","assets/maktab-old-front.jpg"],
  ["Kelajak rejalari","Maktabning kelajakdagi maqsadlari, loyihalari va rivojlanish rejalarini yozing.","assets/maktab-front.jpg"]
];

/* ---------------- NAVIGATION ---------------- */
const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll("[data-page]");
const mainNav = document.getElementById("mainNav");

function openPage(pageId){
  pages.forEach(p => p.classList.toggle("active", p.id === `page-${pageId}`));
  document.querySelectorAll(".nav-link").forEach(b => b.classList.toggle("active", b.dataset.page === pageId));
  mainNav.classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}
navButtons.forEach(btn => btn.addEventListener("click",()=>openPage(btn.dataset.page)));
document.getElementById("menuToggle").addEventListener("click",()=>mainNav.classList.toggle("open"));

/* ---------------- THEME ---------------- */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("school-theme");
if(savedTheme === "dark") document.body.classList.add("dark");
themeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  localStorage.setItem("school-theme", dark ? "dark":"light");
  themeToggle.textContent = dark ? "☀" : "☾";
});

/* ---------------- TOAST ---------------- */
let toastTimer;
function showToast(message){
  const toast = document.getElementById("toast");
  toast.textContent = message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>toast.classList.remove("show"),3500);
}
window.showToast = showToast;

/* ---------------- PEOPLE CARDS ---------------- */
function personCard(person,index,type){
  const image = person.image ? `<img src="${escapeHtml(person.image)}" alt="${escapeHtml(person.name)}">` : `<span>3×4<br><small>Rasm uchun joy</small></span>`;
  const badge = type === "teacher" ? person.subject : person.subject;
  return `<article class="person-card">
    <div class="person-photo">${image}</div>
    <h3>${escapeHtml(person.name)}</h3>
    <p>${escapeHtml(person.className)}</p>
    <span class="tag">${escapeHtml(badge)}</span>
  </article>`;
}
function escapeHtml(str=""){return String(str).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

function renderTeachers(){
  const search = (document.getElementById("teacherSearch").value||"").toLowerCase();
  const filter = document.getElementById("teacherFilter").value;
  const list = TEACHERS.filter(t => (!search || `${t.name} ${t.subject}`.toLowerCase().includes(search)) && (filter==="all" || t.subject===filter));
  document.getElementById("teachersGrid").innerHTML = list.map((t,i)=>personCard(t,i,"teacher")).join("") || `<p class="muted">O‘qituvchi topilmadi.</p>`;
}
function renderStudents(){
  const search = (document.getElementById("studentSearch").value||"").toLowerCase();
  const filter = document.getElementById("studentClass").value;
  const list = STUDENTS.filter(s => (!search || `${s.name} ${s.subject}`.toLowerCase().includes(search)) && (filter==="all" || s.subject===filter));
  document.getElementById("studentsGrid").innerHTML = list.map((s,i)=>personCard(s,i,"student")).join("") || `<p class="muted">O‘quvchi topilmadi.</p>`;
}
document.getElementById("teacherSearch").addEventListener("input",renderTeachers);
document.getElementById("teacherFilter").addEventListener("change",renderTeachers);
document.getElementById("studentSearch").addEventListener("input",renderStudents);
document.getElementById("studentClass").addEventListener("change",renderStudents);

/* ---------------- ACHIEVEMENTS / ABOUT ---------------- */
document.getElementById("achievementsGrid").innerHTML = ACHIEVEMENTS.map(a=>`
  <article class="achievement-card"><div class="achievement-number">${a[0]}</div><h3>${escapeHtml(a[1])}</h3><p>${escapeHtml(a[2])}</p></article>`).join("");

document.getElementById("aboutGrid").innerHTML = ABOUT_ITEMS.map(a=>`
  <article class="about-card"><img src="${a[2]}" alt="${escapeHtml(a[0])}"><div class="content"><span class="section-kicker">MAKTAB HAQIDA</span><h2>${escapeHtml(a[0])}</h2><p>${escapeHtml(a[1])}</p></div></article>`).join("");

document.getElementById("mapBtn").addEventListener("click",()=>window.open(SCHOOL_INFO.mapUrl,"_blank","noopener"));

/* ---------------- SCHEDULE + CLOCK ---------------- */
function minutes(hm){const [h,m]=hm.split(":").map(Number);return h*60+m}
function currentMinutes(date=new Date()){return date.getHours()*60+date.getMinutes()+date.getSeconds()/60}
function scheduleRows(){
  document.getElementById("scheduleBody").innerHTML = SCHEDULE.map(x=>`
    <tr data-n="${x.n}">
      <td>${x.n}</td><td>${x.s1[0]} – ${x.s1[1]}</td><td>${x.breakAfter ? x.breakAfter+" daq. tanaffus" : "—"}</td><td>${x.s2[0]} – ${x.s2[1]}</td>
    </tr>`).join("");
}
function findState(nowMin){
  const all=[];
  SCHEDULE.forEach(x=>{
    all.push({shift:1,n:x.n,start:minutes(x.s1[0]),end:minutes(x.s1[1]),times:x.s1});
    all.push({shift:2,n:x.n,start:minutes(x.s2[0]),end:minutes(x.s2[1]),times:x.s2});
  });
  const active=all.find(x=>nowMin>=x.start && nowMin<x.end);
  if(active) return {type:"lesson",...active};
  // Tanaffuslar: har bir darsdan keyingi 5/10 daqiqa.
  for(const x of SCHEDULE){
    for(const shift of [1,2]){
      const t=shift===1?x.s1:x.s2;
      const b=x.breakAfter;
      if(!b) continue;
      const start=minutes(t[1]), end=start+b;
      if(nowMin>=start && nowMin<end) return {type:"break",shift,n:x.n,start,end,breakMins:b,times:[t[1], `${String(Math.floor(end/60)).padStart(2,"0")}:${String(end%60).padStart(2,"0")}`]};
    }
  }
  return {type:"free"};
}
function formatClock(d){return [d.getHours(),d.getMinutes(),d.getSeconds()].map((x,i)=>String(x).padStart(2,"0")).join(":")}
function updateClock(){
  const d=new Date(); const now=currentMinutes(d); const state=findState(now);
  document.getElementById("liveClock").textContent=formatClock(d);
  document.getElementById("liveDate").textContent=d.toLocaleDateString("uz-UZ",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const name=document.getElementById("periodName"), time=document.getElementById("periodTime"), icon=document.getElementById("periodIcon");
  document.querySelectorAll("#scheduleBody tr").forEach(r=>r.classList.remove("now-row"));
  if(state.type==="lesson"){
    name.textContent=`${state.shift}-smena · ${state.n}-dars`;
    time.textContent=`${state.times[0]} – ${state.times[1]}`;
    icon.textContent="📚";
    const row=document.querySelector(`#scheduleBody tr[data-n="${state.n}"]`); if(row) row.classList.add("now-row");
  }else if(state.type==="break"){
    name.textContent=`${state.shift}-smena · ${state.breakMins} daqiqalik tanaffus`;
    time.textContent=`${state.times[0]} – ${state.times[1]}`;
    icon.textContent="🔔";
  }else{
    name.textContent="Hozir dars/tanaffus yo‘q";
    time.textContent="Jadval: 08:00 – 17:55";
    icon.textContent="◷";
  }
}
scheduleRows(); updateClock(); setInterval(updateClock,1000);

/* ---------------- AUDIO ---------------- */
let audioEnabled=false;
const anthemAudio=document.getElementById("anthemAudio");
const bellAudio=document.getElementById("bellAudio");
function speak(text){
  if(!audioEnabled && !window.__testSpeak) return;
  if("speechSynthesis" in window){
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang="uz-UZ"; u.rate=.92; u.pitch=1;
    speechSynthesis.speak(u);
  }
}
function playAudio(audioEl){if(audioEl.src && audioEnabled){audioEl.currentTime=0; audioEl.play().catch(()=>{});}}
document.getElementById("enableAudio").addEventListener("click",()=>{
  audioEnabled=true;
  document.getElementById("enableAudio").textContent="🔊 Ovozlar yoqilgan";
  showToast("Ovozlar yoqildi. Brauzer siyosati sabab birinchi marta foydalanuvchi bosishi kerak.");
});
document.getElementById("testStart").addEventListener("click",()=>{
  window.__testSpeak=true; playAudio(bellAudio); speak("Diqqat, diqqat! Tanaffus payti boshlandi."); window.__testSpeak=false;
});
document.getElementById("testEnd").addEventListener("click",()=>{
  window.__testSpeak=true; playAudio(bellAudio); speak("Diqqat, diqqat! Tanaffus vaqti tugadi."); window.__testSpeak=false;
});
document.getElementById("speakDemo").addEventListener("click",()=>{
  window.__testSpeak=true; speak("Diqqat, diqqat! Tanaffus payti boshlandi."); window.__testSpeak=false;
});
document.getElementById("anthemFile").addEventListener("change",e=>{
  const file=e.target.files[0]; if(file) anthemAudio.src=URL.createObjectURL(file);
});
document.getElementById("bellFile").addEventListener("change",e=>{
  const file=e.target.files[0]; if(file) bellAudio.src=URL.createObjectURL(file);
});

/* Avtomatik hodisalar: brauzer sahifasi ochiq bo‘lsa ishlaydi. */
let lastMinuteKey="";
let lastBreakState="";
function autoEvents(){
  if(!audioEnabled) return;
  const d=new Date(), h=d.getHours(), m=d.getMinutes(), sec=d.getSeconds();
  const key=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${h}-${m}`;
  // 08:00 madhiyasi
  if(h===8 && m===0 && sec<2 && lastMinuteKey!==key){
    lastMinuteKey=key; playAudio(anthemAudio);
    window.__testSpeak=true; speak("O‘zbekiston Respublikasi madhiyasi."); window.__testSpeak=false;
  }
  const state=findState(currentMinutes(d));
  const stateKey=`${key}-${state.type}-${state.shift||0}-${state.n||0}`;
  if(state.type==="break" && lastBreakState!==stateKey){
    lastBreakState=stateKey; playAudio(bellAudio);
    window.__testSpeak=true; speak("Diqqat, diqqat! Tanaffus payti boshlandi."); window.__testSpeak=false;
  }
  // Tanaffus tugagan payt
  const prev=findState(currentMinutes(d)-1/60);
  if(prev.type==="break" && state.type!=="break"){
    const endKey=`end-${key}-${prev.shift}-${prev.n}`;
    if(lastBreakState!==endKey){
      lastBreakState=endKey; playAudio(bellAudio);
      window.__testSpeak=true; speak("Diqqat, diqqat! Tanaffus vaqti tugadi."); window.__testSpeak=false;
    }
  }
}
setInterval(autoEvents,1000);

/* ---------------- YOUTUBE ---------------- */
function youtubeId(url){
  try{
    const u=new URL(url);
    if(u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if(u.hostname.includes("youtube.com")) return u.searchParams.get("v") || u.pathname.split("/").pop();
  }catch(e){}
  return null;
}
document.getElementById("youtubeLoad").addEventListener("click",()=>{
  const url=document.getElementById("youtubeUrl").value.trim();
  const id=youtubeId(url);
  const frame=document.getElementById("youtubeFrame");
  if(!id){showToast("YouTube havolasi noto‘g‘ri.");return;}
  frame.classList.remove("empty");
  frame.innerHTML=`<iframe src="https://www.youtube.com/embed/${encodeURIComponent(id)}" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
});

/* ---------------- RATING ---------------- */
const ratingKey="school-rating";
const ratingDataKey="school-rating-count";
let currentRating=Number(localStorage.getItem(ratingKey)||0);
let ratingCount=Number(localStorage.getItem(ratingDataKey)||0);
function renderRating(){
  document.querySelectorAll("#stars button").forEach(b=>b.classList.toggle("selected",Number(b.dataset.star)<=currentRating));
  document.getElementById("ratingText").textContent=currentRating ? `${currentRating}/5 yulduz` : "Hali baholanmagan";
  document.getElementById("ratingStats").textContent=`${ratingCount} ta baho`;
}
document.querySelectorAll("#stars button").forEach(btn=>btn.addEventListener("click",()=>{
  currentRating=Number(btn.dataset.star); ratingCount=Math.max(ratingCount,1);
  localStorage.setItem(ratingKey,currentRating);localStorage.setItem(ratingDataKey,ratingCount);renderRating();showToast("Bahongiz saqlandi. Rahmat!");
}));
renderRating();

/* ---------------- COMMENTS ---------------- */
const commentsKey="school-comments";
function getComments(){try{return JSON.parse(localStorage.getItem(commentsKey)||"[]")}catch{return[]}}
function renderComments(){
  const list=getComments();
  document.getElementById("commentsList").innerHTML=list.length ? list.slice().reverse().map(c=>`<article class="comment-item"><b>${escapeHtml(c.name)}</b><p>${escapeHtml(c.text)}</p></article>`).join("") : `<p class="muted">Hozircha izoh yo‘q. Birinchi bo‘lib fikr qoldiring.</p>`;
}
document.getElementById("commentForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("commentName").value.trim(), text=document.getElementById("commentText").value.trim();
  if(!name||!text)return;
  const list=getComments(); list.push({name,text,at:Date.now()}); localStorage.setItem(commentsKey,JSON.stringify(list));
  e.target.reset();renderComments();showToast("Izohingiz saqlandi!");
});
renderComments();

/* ---------------- SOCIAL ---------------- */
document.getElementById("socialInstagram").href=SOCIAL_LINKS.instagram;
document.getElementById("socialTelegram").href=SOCIAL_LINKS.telegram;
document.getElementById("socialYoutube").href=SOCIAL_LINKS.youtube;
document.getElementById("year").textContent=new Date().getFullYear();

/* ---------------- AI ASSISTANT ----------------
   Bu xavfsiz demo AI yordamchi. Haqiqiy AI API uchun API kalitni
   front-endga qo‘yish tavsiya etilmaydi. Server/backend orqali ulang.
*/
const aiPanel=document.getElementById("aiPanel");
document.getElementById("aiOpen").addEventListener("click",()=>{aiPanel.classList.add("open");aiPanel.setAttribute("aria-hidden","false")});
document.getElementById("aiClose").addEventListener("click",()=>{aiPanel.classList.remove("open");aiPanel.setAttribute("aria-hidden","true")});

function localAI(q){
  const x=q.toLowerCase();
  if(x.includes("manzil")||x.includes("qayer")) return `30-maktab Sirdaryo viloyati, Xovos tumanida joylashgan. Aniq Google Maps havolasini app.js → SCHOOL_INFO.mapUrl orqali o‘zgartirishingiz mumkin.`;
  if(x.includes("qo‘ng‘iroq")||x.includes("dars")) return `Saytda real vaqt jadvali mavjud. 1-smena 08:00 dan, 2-smena 13:00 dan boshlanadi. 3-darsdan keyin 10 daqiqalik katta tanaffus qo‘yilgan.`;
  if(x.includes("tanaffus")) return `Tanaffus e’loni: “Diqqat, diqqat! Tanaffus payti boshlandi.” Tugaganda: “Diqqat, diqqat! Tanaffus vaqti tugadi.”`;
  if(x.includes("o‘qituvchi")||x.includes("ustoz")) return `O‘qituvchilar bo‘limida 50 ta karta bor. Ism, fan va rasmni TEACHERS massivida o‘zgartiring.`;
  if(x.includes("ijtimoiy")||x.includes("instagram")||x.includes("telegram")) return `Ijtimoiy tarmoq havolalari app.js boshidagi SOCIAL_LINKS obyektida. Shu yerga rasmiy sahifalarni yozsangiz, footer ikonkalari bosilganda sahifa ochiladi.`;
  if(x.includes("nuras")) return `Sayt footerida dastur egasi NURULLAYEVA NURANGIZ va AHMADJONOV ASRORJON, shuningdek NURAS brendi ko‘rsatilgan.`;
  return `Savolingizni tushundim. Men hozircha 30-maktab saytidagi ma’lumotlar bo‘yicha yordam beruvchi demo AI sifatida ishlayman. Masalan: “qo‘ng‘iroq vaqti?”, “maktab qayerda?”, “o‘qituvchilarni qanday o‘zgartiraman?” deb so‘rashingiz mumkin.`;
}
document.getElementById("aiForm").addEventListener("submit",e=>{
  e.preventDefault();
  const input=document.getElementById("aiInput"), q=input.value.trim(); if(!q)return;
  const box=document.getElementById("aiMessages");
  box.insertAdjacentHTML("beforeend",`<div class="ai-msg user">${escapeHtml(q)}</div>`);
  input.value="";
  setTimeout(()=>{box.insertAdjacentHTML("beforeend",`<div class="ai-msg bot">${escapeHtml(localAI(q))}</div>`);box.scrollTop=box.scrollHeight},300);
});

/* Boshlang‘ich holat */
renderTeachers();
renderStudents();
