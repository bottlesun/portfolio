// 랜덤번호 지정 v
// 유저가 번호를 입력 그리고 go 라는 버튼을 누름 
// 만약에 유적가 랜덤 번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 down!!!
// 랜덤번호가 > 유저번호 UP!!
// Rest 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

computerNum = 0;

const playButton = document.querySelector('#playButton');
const resetButton = document.querySelector('#resetButton');
const input = document.querySelector('input');
const result = document.querySelector('#result');
const chance = document.querySelector('#chance')

let div = document.createElement('div');
chance.append(div);

let count = 5;

let history = [];

playButton.addEventListener('click',play);
resetButton.addEventListener('click',reset);
input.addEventListener('focus' , () =>{
    input.value = '';
});

function PickNum() {
    computerNum = Math.floor(Math.random()* 100) + 1 ;
    console.log('정답은 =',computerNum);
}

function play(){
   let inputValue = input.value;

   if(inputValue < 1 || inputValue > 100) {
    div.innerText = '1 부터 100 까지의 숫자만 입력해 주세요. ';
    return;
    }

    if(history.includes(inputValue)){
        div.innerText = ' 중복 된 값 입니다. ';
        return;
    }

   count --;
    console.log('%s번 기회가 남았습니다.',count)
    
    
    if(count < 1) {
        playButton.disabled = true;
        inputAction()
        return;
    }


    if(computerNum < inputValue) {
        div.innerText = 'Down';

    } else if (computerNum > inputValue) {
        div.innerText = 'Up';
    } else {
        div.innerText = '정답입니다.';
        playButton.disabled = true;
        inputAction()
    }

    history.push(inputValue);

}


function reset(){
    div.innerText = '';
    input.value = '';
    playButton.disabled = false;
    inputAction()
    PickNum();
}


function inputAction() {
    if( playButton.disabled == true) {
        playButton.style.backgroundColor = 'red';
        playButton.innerText = 'No'
    } else {
        playButton.style.backgroundColor = '#3b82f6';
        playButton.innerText = 'Go'
    }
}


PickNum()