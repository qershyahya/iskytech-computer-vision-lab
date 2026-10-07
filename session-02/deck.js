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

(() => {
  const originalImage=document.querySelector('#original-input');
  const cards=[...document.querySelectorAll('[data-failure-case]')];
  if(!originalImage||!cards.length)return;
  const prompt=document.querySelector('#failure-prompt');
  const measure=(image)=>{const size=96,ratio=image.naturalHeight/image.naturalWidth,canvas=document.createElement('canvas');canvas.width=size;canvas.height=Math.max(1,Math.round(size*ratio));const context=canvas.getContext('2d');context.drawImage(image,0,0,canvas.width,canvas.height);const {data}=context.getImageData(0,0,canvas.width,canvas.height);let sum=0,sumSquare=0,edges=0,count=0;const luminance=[];for(let y=0;y<canvas.height;y++){for(let x=0;x<canvas.width;x++){const n=(y*canvas.width+x)*4;const value=.2126*data[n]+.7152*data[n+1]+.0722*data[n+2];luminance.push(value);sum+=value;sumSquare+=value*value;count++;if(x){edges+=Math.abs(value-luminance[luminance.length-2])}if(y){edges+=Math.abs(value-luminance[(y-1)*canvas.width+x])}}}return{contrast:Math.sqrt(sumSquare/count-(sum/count)**2),edge:edges/(count*2)}};
  const transformed=Object.fromEntries(cards.map(card=>[card.dataset.failureCase,card.querySelector('img')]));
  const calculate=()=>{const base=measure(originalImage),dark=measure(transformed.light),blurred=measure(transformed.blur);const light=Math.max(0,Math.round((1-dark.contrast/base.contrast)*100));const blur=Math.max(0,Math.round((1-blurred.edge/base.edge)*100));const crop=Math.round((1-(1-Number(document.querySelector('[data-crop-percent]')?.dataset.cropPercent||0)/100)**2)*100);const values={light:`${light}% lower`,blur:`${blur}% lower`,crop:`${crop}%`};Object.entries(values).forEach(([name,value])=>document.querySelector(`[data-metric="${name}"]`).textContent=value)};
  const ready=()=>[originalImage,...Object.values(transformed)].every(image=>image.complete&&image.naturalWidth);
  if(ready())calculate();else [originalImage,...Object.values(transformed)].forEach(image=>image.addEventListener('load',calculate,{once:true}));
  cards.forEach(card=>card.addEventListener('click',()=>{cards.forEach(item=>item.classList.toggle('selected',item===card));const type=card.dataset.failureCase;prompt.textContent=`You chose ${type}. Name the calculated warning, then say which visual clue a person should verify before trusting a detection.`}));
})();