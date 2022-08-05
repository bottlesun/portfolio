let tl = gsap.timeline();
const button = document.querySelectorAll('.buttonComponent');
const modalWrap = document.querySelector('.modal_wrap');
const toggleBtn = document.querySelector('.toggleBtn');
const navList = document.querySelector('nav ul ');
const navListLi = document.querySelectorAll('nav ul li a');


//getBoundingClientRect() |  DomRect 구하기 (각종 좌표값이 들어있는 객체)
//  getBoundingClientRect().top; | Viewport의 시작지점을 기준으로한 상대좌표 Y 값.
let quiz = document.querySelector('.quizBtn a')
let gift = document.querySelector('.giftBtn a')
let limited = document.querySelector('.limitBtn a')

//gsap

gsap.registerPlugin(ScrollTrigger);

tl.from('.oh', {
  scale: 3, // 크기
  opacity: 0, // 투명도
  duration: 1, // 지속시간
  ease: 'expo.inout', // 애니메이션 부드러움정도?  https://greensock.com/docs/v3/Eases
  //stagger - 시차
}, 0).from('.logo-box', { // logo
  opacity: 0, y: -50, ease: 'expo.inout', duration: 1.1
}, 0)
  .from('.friends', {
    opacity: 0, y: 50, ease: 'expo.inout'
  }, ">")


/* ---------------------------------------------------------------------------- */
//scrollTrigger

gsap.timeline({
  immediateRender: false,
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
  .to('.mask', {scale: 5}, 4)
  .to('.down_arrow', {opacity: 0}, "<")
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


gsap.timeline({
  scrollTrigger: {
    trigger: ".quizInfo",
    start: 'top 5%  ',
    endTrigger: '.footer',
    scrub: 2,
    onToggle: (self) => navAction(self),
  }
})


gsap.timeline({
  scrollTrigger: {
    trigger: ".quizInfo",
    start: 'top 50% ',
  }
})
  .to('#quiz .inner',{y:50 ,opacity:1 },">")
  .to('#gift .inner',{y:50 ,opacity:1 },">")
  .to('#limited .inner',{y:50 ,opacity:1 },">")


const PositionEvent = (e) => {
  const logo = document.querySelector('.logo');
  const videos = document.querySelector('.videos');
  const arr = [videos, logo];

  arr.map((i, v) => {
    (!e.isActive) ? (i.style.cssText = 'top:0; position:fixed') : (i.style.cssText = `top:100%; position:absolute `)
  });
}

const navAction = (self) => {
  const nav = document.getElementsByTagName('nav')[0];
  (!self.isActive) ? (nav.style.cssText = 'display: none') : (nav.style.cssText = 'display: block');
}


/* ---------------------------------------------------------------------------- */
// click Event
//toggleButton
toggleBtn.addEventListener('click', () => {
  let icon = document.querySelector('.toggleBtn > span ')
  let detail = document.querySelector('.detail ')
  icon.classList.toggle('on');
  detail.classList.toggle('on');
})

//modal
button.forEach((v) => {
  v.addEventListener('click', () => {
    modalWrap.style.display = 'flex'
  })
})
modalWrap.addEventListener('click', (e) => {
  modalWrap.style.display = 'none';
})

/* 클릭 이벤트로 구현 */

/*
navList.addEventListener('click', (e) => {
  let thisClick = e.target;
  navListLi.forEach((v) => {
    thisClick === v ? thisClick.classList.add('on') : v.classList.remove('on');
  })
})
*/

/* ---------------------------------------------------------------------------- */

/* 스크롤 시 */

console.log(document.getElementsByTagName('main')[0].offsetHeight)
console.log(document.body.offsetHeight + window.innerHeight)

window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY;
  // console.log(document.getElementsByTagName('main')[0].scrollHeight )

  let per = Math.ceil(scrollTop / (document.body.scrollHeight - window.outerHeight) * 100);

  if(64 <= per && per < 65) {
    quiz.classList.add('on')
    gift.classList.remove('on')
    limited.classList.remove('on')
  } else if(65 <= per && per < 83 ){
    quiz.classList.remove('on')
    gift.classList.add('on')
    limited.classList.remove('on')
  }  else if(per >= 90){
    quiz.classList.remove('on')
    gift.classList.remove('on')
    limited.classList.add('on')
  }
});

