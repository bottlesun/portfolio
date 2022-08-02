gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline();

tl.from('.oh', {
  scale: 3, // 크기
  opacity: 0, // 투명도
  duration: 1, // 지속시간
  ease: 'expo.inout', // 애니메이션 부드러움정도?  https://greensock.com/docs/v3/Eases
  //stagger - 시차
}, 0).from('.logo-box', { // logo
   opacity: 0, y: -50, ease: 'expo.inout'}, 1)
  .from('li:nth-child(3), li:nth-child(4)', {
    opacity: 0, y: 50, ease: 'expo.inout'}, 1)
  .from('.friends', {
     opacity: 0, y: 50,ease: 'expo.inout'}, 1)


/* ---------------------------------------------------------------------------- */
let videosHeight = document.querySelector('.videos').clientHeight
let dumpHeight = document.querySelector('.dump-section').clientHeight
const Heights = (dumpHeight - videosHeight) / 2
console.log(Heights)
console.log(videosHeight)

gsap.timeline({
  scrollTrigger: {
    start: ".main_wrap",
    endTrigger:'.main_wrap',
    scrub: 2,

  }
}).from(".oh", {scale: 1,}, 0)
  .to('li:nth-child(3), li:nth-child(4)', {y: -50, opacity: 0 }, 0)
  .to('.ryan', {y: -200, x: -150, scale: 2, opacity: 1}, 0)
  .to('.chun', {y: 320, x: 150, scale: 2, opacity: 1}, 0)
  .to('.Surprise', {y: -50, opacity: 1}, 1)
  .to('.main_wrap', {scale: 2, opacity: 0 , display :'none'}, 2)
  .to('.block', {opacity: 0}, 2)
  .to('.mask',{opacity:0, scale: 5 },3)
  .to('.activeBg',{opacity:1},4)

/*

gsap.timeline({
  scrollTrigger:{
    start: '.information',
    scrub: 2,
  }
}).to('.videos,.logo' , {position:"absolute", top : `${dumpHeight}` })
*/

/*
window.addEventListener('scroll', (e) => {
  let scrollY = this.scrollY;
  let scrollX = this.scrollX;
  console.log('x,y' , scrollX , scrollY)
})*/
