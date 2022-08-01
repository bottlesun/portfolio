
let tl = gsap.timeline(),
  down = gsap.timeline(),
  up = gsap.timeline(),
  ScrollAction = gsap.timeline();

tl.from('.oh', {
  scale: 3, // 크기
  opacity: 0, // 투명도
  duration: 1.2, // 지속시간
  ease: 'expo.inout', // 애니메이션 부드러움정도?  https://greensock.com/docs/v3/Eases
  //stagger - 시차

})

down.from('.logo-box', { // logo
  delay: 0.3,
  opacity: 0,
  y: -50,
  duration: 1,
  ease: 'expo.inout'
})

up.from('.friends ,li:nth-child(3), li:nth-child(4)', {
  delay: 0.3,
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'expo.inout'
})

/* ---------------------------------------------------------------------------- */


ScrollAction.from(".oh", {
  scale: 1,
})

ScrollAction.to('li:nth-child(3), li:nth-child(4)' , {
  y : -50,
  opacity: 0
})
ScrollAction.to('.Surprise', {
  y : -50,
  opacity: 1
})

ScrollTrigger.create({
  start: ".main_wrap",
  animation: ScrollAction,
  scrub: 2,
  onToggle: self => console.log("toggled, isActive:", self.isActive),
})