
/* 글자 마우스 오버 시 변경  */
function textChange(){
let contactText = document.getElementById('context');
contactText.innerText = 'Contact Me!';

}

/* 글자 마우스 아웃 시 변경 */
function textChange2(){
    let contactText = document.getElementById('context');
    contactText.innerText = 'About Me?';
    
    }


/* 스크롤 이벤트 */
document.addEventListener('scroll', function() {
   let currentScrollValue = document.documentElement.scrollTop; //스크롤 위치 구하기
   let icon = document.getElementById('icons');

   // console.log('지금 스크롤의 위치는? ' + currentScrollValue + 'px'); //스크롤 위치 콘솔에 출력
    
    //위치에따른 이벤트 주기
    if(currentScrollValue <= 100){

        icon.classList.add('offdisplay');
        icon.classList.remove('ondisplay');

    } else{
        icon.classList.add('ondisplay');
        icon.classList.remove('offdisplay');
    }
    
    });

 /* 제일 밑으로 */
function ClickonBottom() {
    window.scrollTo(0,document.body.scrollHeight);
}

/* 제일 위로 */
function ClickonTop() {
window.scrollTo(0,document.body.scrollTop);
}


// 탭에 필요한 리스트 아이템 
const tabList = document.querySelectorAll(".portfolio_bar li a");
let currentTab; // 클릭이벤트가 전달된 엘리먼트
let parentEl; // 연결된 엘리먼트의 부모
let childEl; // 부모 엘리먼트의 자식 엘리먼트들
let tabIndex; // 연결된 엘리먼트의 인덱스

let tabSlideAction = (tabEvents)=>{
	currentTab = tabEvents.currentTarget;
  	parentEl = currentTab.parentElement;
  	childEl = parentEl.children;
  	tabIndex = Array.from(childEl).indexOf(currentTab);
    
    currentTab.classList.add('bar_action');
    console.log(parentEl)
   
}

tabList.forEach((items)=>{
  items.addEventListener("click", tabSlideAction)
})
