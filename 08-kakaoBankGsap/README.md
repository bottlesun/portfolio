### [ KakaoBank-gsap / 클론코딩 ]

- 사용 기술
    - HTML5
    - SCSS/ CSS
    - javascript
- 주요 라이브러리
    - [**Swiper](https://swiperjs.com/) -** 슬라이더 라이브러리
    - **[Font Awesome](https://fontawesome.com/) - icon**
    - **[Gsap**](https://greensock.com/gsap/) - 애니메이션 라이브러리

---

## GSAP 이란?

**GSAP**는 GrennSock에서 만든 타임라인 기반의 **자바스크립트 애니메이션 라이브러리**이다.

CSS와 바닐라 자바스크립트만으로도 동적인 화면을 만들 수 있지만 GSAP은 세밀한 움직임과 동작의 연속성을 훨씬 간편하게 설정할 수 있다.

### **[GSAP의 Tween을 만드는 방법 ( 기본 메서드)](https://greensock.com/docs/v3/GSAP/Tween)**

- **gsap.to()**
- **gsap.from()**
- **gsap.fromTo()**

간단한 애니메이션(의 경우 위의 방법만 알면 쉽게 사용이 가능하다.

```jsx
// 1초 동안 "box" 클래스("x"는 translateX() 변환의 단축키)로 요소를 회전하고 이동합니다.
gsap.to(".box", {rotation: 27, x: 100, duration: 1});
```

[https://codepen.io/GreenSock/pen/wvwEOZL](https://codepen.io/GreenSock/pen/wvwEOZL)

**gsap**의 장점 중 하나는 , 애니메이션을 적용 시킬 DOM 요소를 첫번째 인자로 **querySelector** 처럼 넣어주기만 하면  적용이 가능하다는 점이다. ( 중복 되는 곳에 전부 적용이 가능 )

두번째 인자로 옵션값들을 담은 객체를 전달한다. 편의성에 특화된 라이브러리이기 때문에 사용 방법이 꽤 직관적이어서 애니메이션 적용 자체는 어렵지 않다.

세번째 인자는 적용 순서 or 적용 방향에 대해 설정이 가능하다. 0 , 1 , 2 등 순번을 줄 수 도 있고

“<” 전에 적용 하는 애니메이션이 끝난 후 바로 사용 처럼 방향을 정해서 적용이 가능하다.

**to()** 메서드타겟을 옵션 값으로 변경 **from()** 메서드타겟을 옵션 값에서 변경 **fromTo() 메서드**타겟을 어디서부터 어디로 변경 의 의미를 가지고 있는 gsap 의 기본 메서드이다.

### **[Scroll 기반 애니메이션 플러그인 ( ScrollTrigger )](https://greensock.com/docs/v3/Plugins/ScrollTrigger)**

쉬운 설정으로 스크롤 기반의 애니메이션 및 스크롤 관련 트리거 역할을 대신 해주는 플러그인이다.

**특정 요소에 애니메이션을 연결** 하면 해당 요소가 뷰포트에 있을 때만 재생된다.

- 쉬운 방법

    ```jsx
    gsap.to(".box", {
      scrollTrigger: ".box", // .box 가 viewport에 들어왔을 경우 해당 애니메이션 한번실행
      x: 500
    });
    ```


- 심화 방법

    ```jsx
    let tl = gsap.timeline({ // 타임라인에 추가
        scrollTrigger: {
          trigger: ".container",
          pin: true,   // 활성 상태인 동안 트리거 요소 고정
          start: "top top", // 맨 위 트리거의 트리거가 뷰포트 상단에 있을때 시작
          end: "+=500", // 시작부터 500px 이 넘어가는 순간 종료
          scrub: 1, // 스크롤 막대를 "따라잡기"까지 1초 소요 (부드러운 스크롤)
          snap: {
            snapTo: "labels", // 타임라인에서 가장 가까운 레이블에 스냅
            duration: {min: 0.2, max: 3}, // 스냅 애니메이션은 속도 조절
            delay: 0.2, // 스냅 애니메이션의 delay 시간
            ease: "power1.inOut" // "power3" by default
          }
        }
      });
    
    // 타임라인에 애니메이션과 레이블을 추가합니다.
    tl.addLabel("start")
      .from(".box p", {scale: 0.3, rotation:45, autoAlpha: 0})
      .addLabel("color")
      .from(".box", {backgroundColor: "#28a92b"})
      .addLabel("spin")
      .to(".box", {rotation: 360})
      .addLabel("end");
    ```

  [https://codepen.io/GreenSock/pen/yLegBwO](https://codepen.io/GreenSock/pen/yLegBwO)

- 커스텀 방법(가장 일반적인 사용 사례일 수 있음)

  애니메이션에 직접 넣는 방식이 아닌 ScrollTrigger의 기능으로 사용이 가능하다.

  callback 으로 사용 하거나 값을 반환 할 수도 있다.

    ```jsx
    ScrollTrigger.create({
      trigger: "#id",
      start: "top top",
      endTrigger: "#otherID",
      end: "bottom 50%+=100px",
      onToggle: self => console.log("toggled, isActive:", self.isActive),
      onUpdate: self => {
        console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
      }
    });
    ```


---

## I**nteractive WEB Design**

‘상호간’ 이라는 뜻을 지닌 **Inter-** 와 ‘활동적’ 이라는 뜻을 지닌 **Active** 의 합성어로, I**nteractive**  디자인이란,  사용자와 상호작용을 하는 텍스트 혹은 그래픽 사용자의 인터페이스를 디자인을 하는 것으로, 사용자의 직접 참여 및 리액션을 필요로 하는 디자인이다.

단면적인 디자인이 아닌 입체적으로 보다 더 사용자에게 볼거리 및 흥미를 유도 시키게 하는 게 목적으로, 대표적인 디자인 사례로는 **[애플(Apple)](https://www.apple.com/kr/macbook-air-m2/)** 의 홈페이지가 있다.

스크롤을 이용하여 동적인 움직임으로 홈페이지에  입체적인 시각 효과를 아주 잘 사용하고 나타내고 있다.

---

## 클론코딩을 하는 이유

회사에서 사용 가능성이 높은 기술 및 라이브러리 이기 때문에, 인터랙티브에 대한 준비도 해야 했고,

**[[원본 홈페이지]](https://event.kakaobank.com/p/5th_bd?type=list)** 의 페이지를 보면 index 및 css 등의 소스가 그대로 노출이 되어 인터랙티브 디자인의 css 및 javascript 의 학습을 하기 위해서 아주 적합하다고 판단하였다.

해당 페이지의 전체적인 디테일을 잡을 순 없더라도 JQuery로 구현되어 있는 원본 사이트에 대한 부분을 ****Vanilla JS**** 로 변경 하기 위함도 있었다.

- **html**

  마크업은 단일 페이지 구성으로 크게는 main footer, 작게는 main 속 요소들을 section 으로 나눠 진행했다.


- **scss**

  **styles** css는 scss로 진행했고, 공통적으로 들어갈 css는 **common.scss ,** 반응형 작업을  하기 위해 **mixin.scss** , color 값이든 한번에 변경이 가능하도록 변수를 담은  **variables.scss** 로 나눠 진행했다. ****


- **javascript**

  주로 다룬 기능은 **gsap**의 **tween** , **timeline** , **scrolltrigger** 다.


**[[ 코드보러가기 ]](https://github.com/bottlesun/study/tree/master/08-kakaoBankGsap)**

**[ tween , timeline ]**

처음 홈페이지가 사용자에게 렌더링이 되었을 때, 나타나는 효과 구현이다.

**tween** 의 **from() , fromTo()** 를 사용하여, 현재 위치를 동적으로 변하도록 애니메이션을 설정했다.

```jsx
let tl = gsap.timeline();

gsap.registerPlugin(ScrollTrigger);

tl.fromTo('.oh', {
  scale: 3, // 크기
  opacity: 0, // 투명도
}, {
  scale: 1, // 크기
  opacity: 1, // 투명도
  duration: 1, // 지속시간
  ease: 'expo.inout', // 애니메이션 부드러움정도?  https://greensock.com/docs/v3/Eases
  //stagger - 시차
}, 0)
  .from('.logo-box', { // logo
    opacity: 0, y: -50, ease: 'expo.inout', duration: 1.1
  }, "-=1")
  .from('.friends', {
    opacity: 0, y: 50, ease: 'expo.inout'
  }, "-=1")
  .from('.main_wrap .inner > ul > li:nth-child(3),' +
    ' .main_wrap .inner > ul >li:nth-child(4)', {
    opacity: 0, y: 50, ease: 'expo.inout', duration: 1.1
  }, "-=1")
```

**[ scrollTrigger ]**

스크롤 시 메인 화면에서 진행 되는 기능 구현이다.

한 화면에서 스크롤 이벤트를 이용하여 화면 전환이 되게 하는 기능을 사용함에 있어서

한번에 동적으로 구현 되어야 할 부분을 전부 **position : fixed**  를 하여 한번에 겹쳐서 스크롤 시 opacity 조절로 변경 되어 나타나게 하는 방법으로 조절 하기로 했다.

```jsx
//scrollTrigger

gsap.timeline({
  immediateRender: false, // 즉시렌더링
  scrollTrigger: {
    trigger: ".main_wrap",   // 실행 될 트리거 
    endTrigger: '.main_wrap', // 끝날 트리거
    start: 'top 0%',  // 시작 지점
    end: 'bottom 0%', // 끝나는 지점
    scrub: 2, // 스크롤 2만큼 부드럽게.
  }
}).set(".oh", {scale: 1}) // 초기화
  .set('.main_wrap .inner > ul > li:nth-child(3),' +
    ' .main_wrap .inner > ul >li:nth-child(4)', {y: 0, opacity: 1}) // 초기화
  .to(".oh", {scale: 3,}, "<") // "<" 애니메이션 실행 순서
  .to('.main_wrap .inner > ul > li:nth-child(3),' +
    ' .main_wrap .inner > ul >li:nth-child(4)', {y: -50, opacity: 0}, "<")
  .to('.Surprise', {y: -50, opacity: 1}, "<")
  .to('.ryan', {y: -200, x: -150, scale: 2, opacity: 1}, "<")
  .to('.chun', {y: 320, x: 150, scale: 2, opacity: 1}, "<")
  .to('.main_wrap', {scale: 2, opacity: 0, display: 'none'}, "<=1")
  .to('.block', {delay:0.5 ,opacity: 0}, "<")
  .to('.mask', {scale: 5}, "<=1")
  .to('.down_arrow', {opacity: 0}, "<")
  .to('.mask', {opacity: 0}, "<")
  .to('.activeBg', {opacity: 1}, "<")
  .to('.cute_chun', {y: -50, opacity: 1, duration: 2}, "<")
```

**[메인 스크롤 끝난 후 포지션 조절]**

메인 스크롤이 끝났을 지점을 트리거로 지정해,  포지션과 위치를 조절하여 자연스럽게 내려가지도록 설정했다. scrollTrigger의 기능 중에는 여러 callback 함수가 내장 되어 있다. toggle 이벤트를 사용 했다.

```jsx
gsap.timeline({ // 포지션 조절
  scrollTrigger: {
    trigger: ".videos",
    start: 'bottom 0% += 300px',
    endTrigger: '.quizInfo',
    scrub: 2,
    onToggle: (e) => PositionEvent(e),
  }
})

const PositionEvent = (e) => {
  const logo = document.querySelector('.logo');
  const videos = document.querySelector('.videos');
  const arr = [videos, logo];

  arr.map((i, v) => {
    (!e.isActive) ? (i.style.cssText = 'top:0; position:fixed') : 
    (i.style.cssText = `top:100%; position:absolute `)
  });
}
```

![[스크롤 트리거 이벤트 정보]](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/27d0e26b-0259-4848-ada9-1af2a0dd4f6c/Untitled.png)

[스크롤 트리거 이벤트 정보]

**[ NavBar 생성 ]**

포지션을 조절하고 나온 페이지의 시작 부분에는 navbar가 나타나게 되는데 해당 navbar 의 기능을 구현했다. quizInfo가 시작하는 지점이 되기 5% 전에 navAction이 기능하도록 설정하여 display 를 관리했다. 그리고 전체 길이 스크롤 % 를 구해 위치 만큼의 값을 “on” 이라는 class를 넣어주며 현재 위치를 표시했다.

```jsx
gsap.timeline({
  scrollTrigger: {
    trigger: ".quizInfo",
    start: 'top 5%  ',
    endTrigger: '.footer',
    scrub: 2,
    onToggle: (self) => navAction(self),
  }
})

const navAction = (self) => {
  const nav = document.getElementsByTagName('nav')[0];
  (!self.isActive) ? (nav.style.cssText = 'display: none') :
  (nav.style.cssText = 'display: block');
}

/* 스크롤 시 */
console.log(document.getElementsByTagName('main')[0].offsetHeight)
console.log(document.body.offsetHeight + window.innerHeight)

window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY;
  // console.log(document.getElementsByTagName('main')[0].scrollHeight )

  let per = Math.ceil(scrollTop / (document.body.scrollHeight - window.outerHeight) * 100);

  if (64 <= per && per < 65) {
    quiz.classList.add('on')
    gift.classList.remove('on')
    limited.classList.remove('on')
  } else if (65 <= per && per < 83) {
    quiz.classList.remove('on')
    gift.classList.add('on')
    limited.classList.remove('on')
  } else if (per >= 90) {
    quiz.classList.remove('on')
    gift.classList.remove('on')
    limited.classList.add('on')
  }
});
```

**[ Button Modal ]**

```jsx
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
```

---

### **문제점 ( 변경 사항 Study 예정 사항 )**

- 매끄럽지 못한 scroll 애니메이션 ( 대안 ScrollMagic GSAP(TweenMax) 으로 적용 예정 )
- 반응형 구현 X ( 추후 React 구현 시 적용 )

**작성 - 22. 08. 05**