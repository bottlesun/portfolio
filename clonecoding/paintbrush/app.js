const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');

/*
html canvas 태그는 context (픽셀을 컨트롤 하는 것)를 사용 할 수 있다.
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#basic_example
*/

/* pixel modifler 사이즈 적용 해야함*/
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2,5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;   
}

function startPainting(){
    painting = true;
}

function onMouseMove(e) {
   const x = e.offsetX;
   const y = e.offsetY;
   if(!painting){
       //console.log('creating path in' , x,y);
       ctx.beginPath();
       ctx.moveTo(x,y);
   } else {
       /* 마우스 움직이는 내내 발생 */
       //console.log('creating line in' , x,y);
       ctx.lineTo(x,y);
       ctx.stroke();
   }
}

function handleColorClick(e) {
    ctx.strokeStyle = e.target.style.backgroundColor;
}

function handleRangeChange(e){
    ctx.lineWidth = e.target.value;
}

function handleModeClick(){
    if(filling === true) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown' , startPainting);
    canvas.addEventListener('mouseup' , stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}


if(colors){
    Array.from(colors).forEach(color =>
        color.addEventListener('click',handleColorClick)
        );
}


if(range){
    range.addEventListener('input' , handleRangeChange);
}

if(mode){
    mode.addEventListener('click' ,handleModeClick);
}