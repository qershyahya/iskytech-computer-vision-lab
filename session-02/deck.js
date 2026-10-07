const slides=[...document.querySelectorAll('.slide')];
const timing=['0–5 min · frame + predict','5–16 min · compare visual evidence','16–28 min · see five results','28–37 min · run one controlled change','37–42 min · record the evidence','42–47 min · find failure points','47–50 min · reflect + exit'];
let i=Math.max(0,slides.findIndex(s=>`#${s.id}`===location.hash));
const timer=document.querySelector('#timer span');
function show(n){i=Math.max(0,Math.min(slides.length-1,n));slides.forEach((s,x)=>s.classList.toggle('active',x===i));timer.textContent=timing[i];history.replaceState(null,'',`#${slides[i].id}`);document.querySelector('#prev').disabled=!i;document.querySelector('#next').disabled=i===slides.length-1}
show(i);document.querySelector('#prev').onclick=()=>show(i-1);document.querySelector('#next').onclick=()=>show(i+1);document.onkeydown=e=>{if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight'||e.key===' ')show(i+1)};document.querySelector('#timer button').onclick=()=>document.body.classList.add('timer-hidden');document.querySelector('#show-timer').onclick=()=>document.body.classList.remove('timer-hidden');

const original=document.querySelector('#original-input');
const canvas=document.querySelector('#transform-output');
const prompt=document.querySelector('#prompt');
const controls=[...document.querySelectorAll('[data-effect]')];
const defaults={crop:0,detail:100,blur:0,light:100,colour:100};
const values=()=>Object.fromEntries(controls.map(input=>[input.dataset.effect,Number(input.value)]));
const labelValue=(name,value)=>name==='blur'?`${value}px`:`${value}%`;
function draw(){
  if(!original.complete||!original.naturalWidth)return;
  const {crop,detail,blur,light,colour}=values();
  const width=original.naturalWidth, height=original.naturalHeight;
  canvas.width=width;canvas.height=height;
  const inset=crop/200;
  const sx=width*inset,sy=height*inset,sw=width*(1-crop/100),sh=height*(1-crop/100);
  const work=document.createElement('canvas');
  work.width=Math.max(1,Math.round(width*detail/100));work.height=Math.max(1,Math.round(height*detail/100));
  const workContext=work.getContext('2d');workContext.imageSmoothingEnabled=detail>55;
  workContext.drawImage(original,sx,sy,sw,sh,0,0,work.width,work.height);
  const context=canvas.getContext('2d');context.filter=`blur(${blur}px) brightness(${light/100}) saturate(${colour/100})`;
  context.drawImage(work,0,0,width,height);context.filter='none';
  controls.forEach(input=>{const value=Number(input.value);document.querySelector(`[data-value="${input.dataset.effect}"]`).textContent=labelValue(input.dataset.effect,value)});
  prompt.textContent=`Change one control at a time. Crop ${crop}%, detail ${detail}%, blur ${blur}px, light ${light}%, colour ${colour}%. What evidence changed?`;
}
function reset(){controls.forEach(input=>input.value=defaults[input.dataset.effect]);draw();prompt.textContent='Reset to the original. Now change one control at a time and observe the evidence.'}
controls.forEach(input=>input.addEventListener('input',draw));
original.addEventListener('dblclick',reset);
original.addEventListener('load',draw);
if(original.complete)draw();
