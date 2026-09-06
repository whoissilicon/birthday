const birthdayData = {
  name: "Naila Islam Shifa",

  memories: [
    {date:"06 Aug 2023",image:"images/memory1.jpg",title:"A beginning",caption:"Where the story first quietly started to unfold."},
    {date:"22 Aug 2023",image:"images/memory2.jpg",title:"A gentle step",caption:"Another ordinary day that ended up sticking around in memory."},
    {date:"31 Aug 2023",image:"images/memory3.jpg",title:"Quiet moments",caption:"Unplanned conversations and simple clarity."},
    {date:"23 Oct 2023",image:"images/memory4.jpg",title:"Shared time",caption:"Proof that time passes, but good feelings don't."},
    {date:"29 Oct 2023",image:"images/memory5.jpg",title:"First meet",caption:"The day we finally met in person and created a core memory."},
    {date:"11 Nov 2023",image:"images/memory6.jpg",title:"Unplanned laughter",caption:"The best times are usually the ones that weren't scheduled."},
    {date:"16 Mar 2024",image:"images/memory7.jpg",title:"Spring memory",caption:"A bright day worth holding on to."},
    {date:"17 Jul 2024",image:"images/memory8.jpg",title:"Midsummer chapter",caption:"Moments becoming special without asking permission."},
    {date:"19 Jul 2024",image:"images/memory9.jpg",title:"Good company",caption:"Just one of many reasons to celebrate this story."},
    {date:"21 Sep 2024",image:"images/memory10.jpg",title:"Autumn warmth",caption:"Reflecting on how quickly time moves."},
    {date:"09 Dec 2024",image:"images/memory11.jpg",title:"Winter reflection",caption:"Finding comfort in shared memories."},
    {date:"25 Dec 2024",image:"images/memory12.jpg",title:"Year-end magic",caption:"A cozy moment at the end of the year."},
    {date:"27 Dec 2024",image:"images/memory13.jpg",title:"Revisiting those days",caption:"Recently visited the place to remember those days."},
    {date:"26 Jan 2025",image:"images/memory14.jpg",title:"New year chapter",caption:"Starting a new year with cherished memories."},
    {date:"27 Jan 2025",image:"images/memory15.jpg",title:"A calm day",caption:"Quiet peace and simple gratitude."},
    {date:"15 Apr 2025",image:"images/memory16.jpg",title:"Spring sunshine",caption:"Capturing a brand-new page of the journey."},
    {date:"27 Oct 2025",image:"images/memory17.jpg",title:"Looking back",caption:"Reflecting on two years of wonderful moments."}
  ],

  momentOptions: [
    {label:"Quiet but chaotic",response:"Interesting choice.\nThe file has a few notes about that."},
    {label:"Calm but overthinking",response:"Ah. A classic.\nSomehow, that feels very Naila."},
    {label:"Completely normal",response:"Sure.\nThe file has some notes that disagree."},
    {label:"None of the above",response:"Fair enough.\nSome things are better left mysterious."}
  ],

  messageText:
`Dear Naila,

Some people have a way of making ordinary moments feel a little more special.

This little file exists because some dates, some memories, and some moments simply deserve to be remembered.

I hope this birthday brings you more reasons to smile, more places to go, more memories to collect, and more peaceful days in between.

And whenever life gets a little too busy, I hope you remember that you are appreciated—not because you have to prove anything, but simply because you are you.

Happy Birthday, Naila Islam Shifa. ❤️`,

  somethingElse: [
    "Warning: too many good memories found.",
    "System note: Naila has somehow accumulated more memorable moments than expected.",
    "Fun fact: this file was supposed to be quick. It clearly wasn't."
  ],

  finalMessage: [
    "However today is going —",
    "however this year has gone —",
    "I hope you know how much you are appreciated.",
    "Not for what you do. Just for being you.",
    "So take today. All of it.",
    "And make another memory worth keeping."
  ],

  finalImage:"images/final.jpg",
  finalCaption:"This one's my favorite. I think you'll understand why."
};

const guideConfig = {
  enabled:true,
  image:"images/naila.png",
  typingSpeed:28,
  autoHideAfter:5200,
  showPointer:true,
  showSpeechBubble:true
};

const QUESTIONS = [
  {n:"01",q:"Be honest… which one sounds most like you?",opts:[
    {l:"I'll sleep early tonight.",r:"Okay… noted. 😌"},
    {l:"One more episode.",r:"Classic move. 🍿"},
    {l:"One more scroll.",r:"We've all been there. 📱"},
    {l:"I have no idea how it became 3 AM.",r:"Thought so. 🌙"}
  ]},
  {n:"02",q:"If you suddenly got a completely free day, what would you choose?",opts:[
    {l:"Sleep",r:"Pure bliss. 🛌"},
    {l:"Go somewhere",r:"Wanderlust wins. ✈️"},
    {l:"Spend time with people",r:"Connection over everything. ✨"},
    {l:"Disappear from everyone for a while",r:"A peaceful retreat. 🍃"}
  ]},
  {n:"03",q:"Which matters more?",opts:[
    {l:"A perfect photograph",r:"Capturing a moment forever."},
    {l:"A perfect memory",r:"Interesting choice… some moments are worth keeping."}
  ]},
  {n:"04",q:"Do you think some ordinary days become special only when you look back at them?",opts:[
    {l:"Yes",r:"Perspective changes everything."},
    {l:"Maybe",r:"Time has a quiet way of showing us."},
    {l:"Absolutely",r:"And today might just become one of them."}
  ]}
];

const fileState={memory:false,moment:false,message:false,something:false,final:false};
let qIndex=0;
let memOpened=new Set();
let guideHideTimer=null;
let guideBusy=false;
let idleTimer=null;

const $=id=>document.getElementById(id);
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function typeLine(el,text,speed=30){
  el.textContent="";
  for(const ch of text){el.textContent+=ch;await wait(speed)}
}

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active","fade-in"));
  const el=$(id);
  if(!el)return;
  el.classList.add("active");
  requestAnimationFrame(()=>el.classList.add("fade-in"));
  resetIdleTimer();
}

function placeholderImg(seed){
  const hues=[270,330,25,200,300,15];
  const h=hues[seed%hues.length];
  return "data:image/svg+xml;utf8,"+encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
    <defs><linearGradient id="p" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${h},35%,18%)"/>
      <stop offset="100%" stop-color="hsl(${h+30},30%,10%)"/>
    </linearGradient></defs>
    <rect width="300" height="300" fill="url(#p)"/>
    <circle cx="150" cy="150" r="34" fill="none" stroke="#C9A876" stroke-width="1.5" opacity=".6"/>
    <circle cx="150" cy="150" r="4" fill="#C9A876"/>
  </svg>`);
}

/* PARTICLES */
(function(){
  const canvas=$("particles"),ctx=canvas.getContext("2d");
  let w=0,h=0;
  const parts=[];
  function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight}
  resize();addEventListener("resize",resize);
  const n=innerWidth<600?26:50;
  for(let i=0;i<n;i++)parts.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+.4,s:Math.random()*.3+.05,o:Math.random()*.5+.1});
  function tick(){
    ctx.clearRect(0,0,w,h);
    parts.forEach(p=>{
      p.y-=p.s;if(p.y<-5){p.y=h+5;p.x=Math.random()*w}
      ctx.beginPath();ctx.fillStyle=`rgba(201,168,118,${p.o})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

/* GUIDE */
const guideWrap=$("guide-wrap"),guideAvatar=$("guide-avatar"),guideBubble=$("guide-bubble"),guidePointer=$("guide-pointer"),guideImg=$("guide-img");
guideImg.src=guideConfig.image;
guideImg.onerror=()=>{guideImg.onerror=null;guideImg.style.display="none"};

function positionPointer(selector){
  const target=document.querySelector(selector);
  if(!target){guidePointer.style.opacity=0;return}
  const r=target.getBoundingClientRect();
  guidePointer.style.left=(r.left+r.width/2-17)+"px";
  guidePointer.style.top=(r.top-42)+"px";
  guidePointer.style.opacity=guideConfig.showPointer?1:0;
  target.classList.add("glow-target");
  setTimeout(()=>target.classList.remove("glow-target"),4000);
}
function hideGuide(){
  clearTimeout(guideHideTimer);
  guideWrap.classList.remove("show");guideWrap.classList.add("hide");guidePointer.style.opacity=0;
}
async function showGuide(opts){
  if(!guideConfig.enabled||!guideConfig.showSpeechBubble)return;
  guideBusy=true;clearTimeout(guideHideTimer);
  guideWrap.classList.remove("hide");guideWrap.classList.toggle("left",opts.side==="left");guideWrap.classList.add("show");
  if(opts.mood){guideAvatar.classList.remove("bounce","shake");void guideAvatar.offsetWidth;guideAvatar.classList.add(opts.mood)}
  const lines=Array.isArray(opts.message)?opts.message:[opts.message];
  for(let i=0;i<lines.length;i++){
    guideBubble.innerHTML="";
    const span=document.createElement("span"),cursor=document.createElement("span");
    cursor.className="guide-cursor";guideBubble.append(span,cursor);
    await typeLine(span,lines[i],guideConfig.typingSpeed);cursor.remove();
    if(i<lines.length-1)await wait(550);
  }
  if(opts.target)positionPointer(opts.target);
  guideBusy=false;
  const t=opts.autoHide!==undefined?opts.autoHide:guideConfig.autoHideAfter;
  if(t!==null)guideHideTimer=setTimeout(hideGuide,t);
}
function resetIdleTimer(){
  clearTimeout(idleTimer);
  idleTimer=setTimeout(()=>{if(!guideBusy)showGuide({message:["Still there?","Naila, don't make me do all the work."]})},10000);
}
document.addEventListener("click",resetIdleTimer);

/* ARRIVAL */
async function runArrival(){
  showScreen("s-arrival");
  $("arrival-line").style.display="block";
  $("arrival-you").style.display="none";$("arrival-sub").style.display="none";$("btn-enter").style.display="none";
  const line=$("arrival-line"),dots=$("arrival-dots");
  await wait(700);await typeLine(line,"Initializing...",38);
  await wait(650);await typeLine(line,"Searching for someone...",38);
  dots.style.display="flex";await wait(1300);dots.style.display="none";
  await typeLine(line,"Person found.",42);await wait(700);line.style.display="none";
  $("arrival-you").style.display="block";await wait(450);
  $("arrival-sub").style.display="block";await wait(350);
  $("btn-enter").style.display="inline-block";
  showGuide({message:["pssst...","Someone very specific was expected.","Let's make sure it's you."],target:"#btn-enter"});
}
$("btn-enter").addEventListener("click",()=>{hideGuide();showScreen("s-name")});

/* NAME VERIFICATION */
$("name-form").addEventListener("submit",async e=>{
  e.preventDefault();
  const input=$("name-input"),feedback=$("name-feedback");
  const value=input.value.trim().toLowerCase().replace(/\s+/g," ");
  const allowed=["naila","naila islam","shifa","naila islam shifa"];
  if(allowed.includes(value)){
    feedback.textContent="Hmm… That sounds familiar. But I need one more confirmation.";
    await wait(1500);runQuestions();
  }else{
    feedback.textContent="Interesting… but I don't think that's who I was looking for.";
    input.value="";input.focus();
    showGuide({message:["Nice try.","But this file knows who it's waiting for. 😌"],autoHide:2600});
  }
});

/* QUESTIONS */
function renderQuestion(){
  const q=QUESTIONS[qIndex];
  $("q-num").textContent="QUESTION "+q.n;
  $("q-text").textContent=q.q;
  $("q-reaction").textContent="";
  const opts=$("q-options");opts.innerHTML="";
  q.opts.forEach(o=>{
    const b=document.createElement("button");b.className="btn";b.textContent=o.l;
    b.addEventListener("click",()=>answerQuestion(o));opts.appendChild(b);
  });
  if(qIndex===0)showGuide({message:["Easy.","Just answer honestly."]});
}
async function answerQuestion(o){
  $("q-options").innerHTML="";
  await typeLine($("q-reaction"),o.r,28);
  await wait(1100);qIndex++;
  if(qIndex<QUESTIONS.length)renderQuestion();else runConfirm();
}
function runQuestions(){qIndex=0;showScreen("s-questions");renderQuestion()}

/* CONFIRM */
async function runConfirm(){
  showScreen("s-confirm");const line=$("confirm-line");
  for(const [text,delay] of [
    ["Interesting...",650],
    ["Your answers tell us something.",800],
    ["I think I know who you are now.",900],
    ["✓ IDENTITY CONFIRMED",850],
    ["Naila Islam Shifa.",650],
    ["Which means...",550],
    ["...you are allowed to access the file.",500]
  ]){await typeLine(line,text,34);await wait(delay)}
  const btn=document.createElement("button");btn.className="btn primary";btn.textContent="OPEN THE FILE";
  btn.onclick=()=>{hideGuide();openHub()};$("s-confirm").appendChild(btn);
}

/* HUB */
const FILE_SECTIONS=[
  {key:"memory",label:"MEMORY ARCHIVE",run:openMemory},
  {key:"moment",label:"MOMENT",run:openMoment},
  {key:"message",label:"MESSAGE",run:openMessage},
  {key:"something",label:"SOMETHING ELSE",run:openSomething},
  {key:"final",label:"FINAL FILE",run:openFinalQuestion}
];
function unlockedIndex(){
  for(let i=0;i<FILE_SECTIONS.length;i++)if(!fileState[FILE_SECTIONS[i].key])return i;
  return FILE_SECTIONS.length;
}
function renderHub(){
  const list=$("file-list");list.innerHTML="";
  const idx=unlockedIndex();
  FILE_SECTIONS.forEach((sec,i)=>{
    const done=fileState[sec.key],unlocked=i<=idx;
    const div=document.createElement("div");
    div.className="file-item "+(unlocked?"unlocked":"locked")+(done?" done":"");
    div.innerHTML=`<span class="fi-name">${sec.label}</span><span class="fi-mark">${done?"✓":unlocked?"🔓":"🔒"}</span>`;
    if(unlocked&&!done)div.onclick=sec.run;
    list.appendChild(div);
  });
}
function openHub(){
  showScreen("s-hub");renderHub();
  const idx=unlockedIndex();
  if(idx===0)showGuide({message:["Welcome to the archive.","There are 17 dates waiting for you."],target:".file-item.unlocked"});
  else if(idx===4)showGuide({message:["Almost there, Naila.","No jokes this time.","You're at the final file."],target:".file-item.unlocked:not(.done)"});
}

/* MEMORY */
function buildMemoryGrid(){
  const grid=$("mem-grid");grid.innerHTML="";
  $("mem-total").textContent=birthdayData.memories.length;
  birthdayData.memories.forEach((m,i)=>{
    const card=document.createElement("div");card.className="mem-card";card.textContent=m.date;
    card.dataset.opened=memOpened.has(i)?"true":"false";
    if(memOpened.has(i))card.classList.add("opened");
    card.onclick=()=>openMemoryDetail(i,card);grid.appendChild(card);
  });
  $("mem-count").textContent=memOpened.size;
}
function openMemory(){
  showScreen("s-memory");
  $("memory-grid-view").style.display="block";$("memory-view").classList.remove("show");
  $("btn-mem-next").style.display="none";buildMemoryGrid();
  showGuide({message:["See those dates?","Each one has a little piece of the story."],target:".mem-card"});
}
async function openMemoryDetail(i,card){
  memOpened.add(i);card.dataset.opened="true";card.classList.add("opened");
  $("mem-count").textContent=memOpened.size;showMemoryScreen(i);
  await wait(1000);showGuide({message:["Oh.","That's a good one."],autoHide:2100});
}
function showMemoryScreen(i){
  const m=birthdayData.memories[i];
  $("memory-grid-view").style.display="none";$("memory-view").classList.add("show");
  $("mv-date").textContent=m.date;$("mv-title").textContent=m.title;$("mv-caption").textContent=m.caption;
  const img=$("mv-photo");img.classList.remove("reveal");
  img.onerror=()=>{img.onerror=null;img.src=placeholderImg(i);img.classList.add("reveal")};
  img.src=m.image;requestAnimationFrame(()=>requestAnimationFrame(()=>img.classList.add("reveal")));
}
$("btn-close-memory").onclick=()=>{
  $("memory-view").classList.remove("show");$("memory-grid-view").style.display="block";
  if(memOpened.size===birthdayData.memories.length){
    $("btn-mem-next").style.display="inline-block";
    showGuide({message:["All 17 memories recovered.","I think you're ready for the next file."],autoHide:3000});
  }
};
$("btn-mem-next").onclick=()=>{fileState.memory=true;hideGuide();openHub()};

/* MOMENT */
function openMoment(){
  showScreen("s-moment");$("moment-reaction").textContent="";
  const grid=$("moment-options");grid.innerHTML="";
  birthdayData.momentOptions.forEach(o=>{
    const b=document.createElement("button");b.className="opt-btn";b.textContent=o.label;b.onclick=()=>answerMoment(o);grid.appendChild(b);
  });
}
async function answerMoment(o){
  $("moment-options").innerHTML="";
  const reaction=$("moment-reaction");
  for(const line of o.response.split("\n")){await typeLine(reaction,line,28);await wait(450)}
  await wait(700);
  const btn=document.createElement("button");btn.className="btn";btn.textContent="CONTINUE";
  btn.onclick=()=>{fileState.moment=true;openHub()};$("s-moment").appendChild(btn);
}

/* MESSAGE */
function openMessage(){
  showScreen("s-message");
  $("envelope").classList.remove("open");$("btn-open-envelope").style.display="inline-block";
  $("message-text").classList.remove("show");$("message-text").innerHTML="";$("btn-message-continue").style.display="none";
  showGuide({message:["Someone left something here for Naila."],target:"#btn-open-envelope"});
}
$("btn-open-envelope").onclick=async()=>{
  hideGuide();$("envelope").classList.add("open");$("btn-open-envelope").style.display="none";await wait(900);
  $("message-text").innerHTML=birthdayData.messageText.split("\n\n").map(p=>`<p>${p}</p>`).join("");
  $("message-text").classList.add("show");await wait(1100);$("btn-message-continue").style.display="inline-block";
};
$("btn-message-continue").onclick=()=>{fileState.message=true;openHub()};

/* SOMETHING ELSE */
function openSomething(){
  showScreen("s-something");const list=$("spark-list");list.innerHTML="";
  birthdayData.somethingElse.forEach(text=>{
    const d=document.createElement("div");d.className="spark-item";d.textContent="tap to reveal";
    d.onclick=()=>{if(d.classList.contains("revealed"))return;d.classList.add("revealed");d.textContent=text};list.appendChild(d);
  });
}
$("btn-something-continue").onclick=()=>{fileState.something=true;openHub()};

/* FINAL QUESTION */
function openFinalQuestion(){
  showScreen("s-finalq");$("finalq-reaction").textContent="";$("countdown").style.display="none";$("finalq-options").style.display="flex";
  showGuide({message:["I know what's inside.","You don't.","Ready, Naila?"]});
}
$("btn-final-yes").onclick=()=>{fileState.final=true;hideGuide();runFinalReveal()};
$("btn-final-notready").onclick=async()=>{
  $("finalq-options").style.display="none";const r=$("finalq-reaction");
  await typeLine(r,"Okay.",32);await wait(650);await typeLine(r,"...I'll give you 3 seconds.",32);await wait(500);
  const cd=$("countdown");cd.style.display="block";
  for(const n of [3,2,1]){cd.textContent=n;await wait(750)}
  cd.style.display="none";await typeLine(r,"Too late. 😌",36);await wait(450);
  const btn=document.createElement("button");btn.className="btn primary";btn.textContent="CONTINUE";
  btn.onclick=()=>{fileState.final=true;runFinalReveal()};$("s-finalq").appendChild(btn);
};

/* FINAL REVEAL */
async function runFinalReveal(){
  showScreen("s-finalreveal");
  const opened=$("fr-opened"),subject=$("fr-subject"),you=$("fr-you"),hb=$("fr-hb"),sub=$("fr-sub"),tw=$("fr-tw");
  opened.textContent="";subject.style.display="none";you.style.display="none";hb.style.display="none";sub.style.display="none";tw.innerHTML="";
  $("btn-final-onething").style.display="none";
  await typeLine(opened,"File opened.",40);await wait(800);
  subject.style.display="block";await wait(350);you.style.display="block";await wait(700);
  hb.style.display="block";await wait(450);sub.style.display="block";await wait(650);
  for(const line of birthdayData.finalMessage){
    const p=document.createElement("div");p.className="tw-line";tw.appendChild(p);
    await typeLine(p,line,30);p.classList.add("show");await wait(420);
  }
  await wait(700);$("btn-final-onething").style.display="inline-block";
}
$("btn-final-onething").onclick=runFinalPhoto;

/* FINAL PHOTO */
async function runFinalPhoto(){
  showScreen("s-finalphoto");
  $("fp-wrap").style.display="none";$("fp-caption").style.display="none";$("btn-photo-continue").style.display="none";$("btn-reveal-photo").style.display="inline-block";
  const l=$("fp-line1");await typeLine(l,"There's one more thing.",32);await wait(700);await typeLine(l,"Actually...",32);await wait(550);await typeLine(l,"One last memory.",32);
}
$("btn-reveal-photo").onclick=async()=>{
  $("btn-reveal-photo").style.display="none";const wrap=$("fp-wrap");wrap.style.display="flex";
  const img=$("fp-img");img.classList.remove("reveal");
  img.onerror=()=>{img.onerror=null;img.src=placeholderImg(3);img.classList.add("reveal")};
  img.src=birthdayData.finalImage;requestAnimationFrame(()=>requestAnimationFrame(()=>img.classList.add("reveal")));
  await wait(1200);$("fp-caption").textContent=birthdayData.finalCaption;$("fp-caption").style.display="block";await wait(750);
  $("btn-photo-continue").style.display="inline-block";
};
$("btn-photo-continue").onclick=runEnd;

/* END */
async function runEnd(){
  showScreen("s-end");
  ["end-l2","end-l3","end-important","end-hb","btn-replay"].forEach(id=>$(id).style.display="none");
  await wait(900);$("end-l2").style.display="block";await wait(900);$("end-l3").style.display="block";
  await wait(900);$("end-important").style.display="block";await wait(1200);$("end-hb").style.display="block";
  await wait(800);$("btn-replay").style.display="inline-block";
}
$("btn-replay").onclick=()=>{
  Object.keys(fileState).forEach(k=>fileState[k]=false);
  qIndex=0;memOpened.clear();$("name-input").value="";$("name-feedback").textContent="";
  hideGuide();runArrival();
};

/* BOOT */
runArrival();
