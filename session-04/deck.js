const slides=[...document.querySelectorAll('.slide')];
const timing=["0–5 min · notice pixels","5–11 min · choose a rule","11–20 min · build + inspect","20–29 min · clean with a reason","29–38 min · measure a region","38–45 min · stress the rule","45–50 min · record the limit"];
let i=Math.max(0,slides.findIndex(s=>`#${s.id}`===location.hash));
const timer=document.querySelector('#timer span');
function show(n){i=Math.max(0,Math.min(slides.length-1,n));slides.forEach((s,x)=>s.classList.toggle('active',x===i));timer.textContent=timing[i];history.replaceState(null,'',`#${slides[i].id}`);document.querySelector('#prev').disabled=!i;document.querySelector('#next').disabled=i===slides.length-1}
show(i);document.querySelector('#prev').onclick=()=>show(i-1);document.querySelector('#next').onclick=()=>show(i+1);document.onkeydown=e=>{if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight'||e.key===' ')show(i+1)};document.querySelector('#timer button').onclick=()=>document.body.classList.add('timer-hidden');document.querySelector('#show-timer').onclick=()=>document.body.classList.remove('timer-hidden');
