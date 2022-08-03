let tl = gsap.timeline();
const button = document.querySelectorAll('.buttonComponent');
const modalWrap = document.querySelector('.modal_wrap');
const toggleBtn = document.querySelector('.toggleBtn');
//gsap

gsap.registerPlugin(ScrollTrigger);

tl.from('.oh', {
  scale: 3, // 크기
  opacity: 0, // 투명도
  duration: 1, // 지속시간
  ease: 'expo.inout', // 애니메이션 부드러움정도?  https://greensock.com/docs/v3/Eases
  //stagger - 시차
}, 0).from('.logo-box', { // logo
  opacity: 0, y: -50, ease: 'expo.inout'
}, 0)
  .from('.friends', {
    opacity: 0, y: 50, ease: 'expo.inout'
  }, 1)


/* ---------------------------------------------------------------------------- */
//scrollTrigger

gsap.timeline({
  scrollTrigger: {
    trigger: ".main_wrap",
    endTrigger: '.main_wrap',
    start: 'top 0%',
    end: 'bottom 0%',
    scrub: 2,
    pin: true,
  }
}).from(".oh", {scale: 1,}, 0)
  .to('.main_wrap .inner > ul > li:nth-child(3),' +
    ' .main_wrap .inner > ul >li:nth-child(4)', {y: -50, opacity: 0}, 0)
  .to('.Surprise', {y: -50, opacity: 1}, ">")
  .to('.ryan', {y: -200, x: -150, scale: 2, opacity: 1}, 0)
  .to('.chun', {y: 320, x: 150, scale: 2, opacity: 1}, 0)
  .to('.main_wrap', {scale: 2, opacity: 0, display: 'none'}, 2)
  .to('.block', {opacity: 0}, 3)
  .to('.mask', {scale: 5}, "<")
  .to('.mask', {opacity: 0}, "<")
  .to('.activeBg', {opacity: 1}, "<")
  .to('.cute_chun', {y: -50, opacity: 1, duration: 2}, "<")

gsap.timeline({
  scrollTrigger: {
    trigger: ".videos",
    start: 'bottom 0% += 300px',
    endTrigger: '.quizInfo',
    scrub: 2,
    onToggle: (e) => PositionEvent(e),
  }
})

const PositionEvent = (e) => {
  console.log(e.isActive)
  const logo = document.querySelector('.logo');
  const videos = document.querySelector('.videos');
  const arr = [videos, logo];

  arr.map((i, v) => {
    (!e.isActive) ? (i.style.cssText = 'top:0; position:fixed') : (i.style.cssText = `top:100%; position:absolute `)
  })
}

/* ---------------------------------------------------------------------------- */

//toggleButton
toggleBtn.addEventListener('click' , () => {
  let icon = document.querySelector('.toggleBtn > span ')
  let detail = document.querySelector('.detail ')
  icon.classList.toggle('on') ;
  detail.classList.toggle('on') ;

})

//modal
button.forEach((v)=> {
  v.addEventListener('click', () => {
    modalWrap.style.display = 'flex'
  })
})

modalWrap.addEventListener('click', (e) => {
  modalWrap.style.display =  'none';
})