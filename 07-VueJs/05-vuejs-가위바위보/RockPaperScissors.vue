<template>
  <div>
    <div id="computer" :style="computedStyleObject"></div>
    <!-- v-bind:class,style 에서는 객체형식으로도 사용 가능 -->
    <div>
      <button @click="onClickButton('Rock')">바위</button>
      <button @click="onClickButton('Scissors')">가위</button>
      <button @click="onClickButton('Paper')">보</button>
    </div>
    <div>{{result}}</div>
    <div>{{score}}점 입니다.</div>
  </div>
</template>

<script>
let interval = null;

const rspCoords = {
  Rock : '0',
  Scissors : '-142px',
  Paper : '-284px'
}

  const scores = {
    Scissors: 1,
    Rock: 0,
    Paper: -1,
  };

  const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
      return v[1] === imgCoord;
    })[0];
  };

    export default {
        data(){
           return{
             imgCoord : rspCoords.Rock ,
             result : '',
             score : 0,
      };
    },
        computed : {
      computedStyleObject() {
        return {
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
           };
          }
        },
        methods: {
          changeHand(){
           interval = setInterval(()=> {
            if(this.imgCoord === rspCoords.Rock) {
              this.imgCoord = rspCoords.Scissors;
            } else if(this.imgCoord === rspCoords.Scissors){
               this.imgCoord = rspCoords.Paper;
            } else if(this.imgCoord === rspCoords.Paper){
               this.imgCoord = rspCoords.Rock;
            }
          },100);
          },
          onClickButton(choice){
            // onClick 에 인자를 넣어서 매개변수로 받아올 수 있다.
            clearInterval(interval)
             const myScore = scores[choice];
             const cpuScore = scores[computerChoice(this.imgCoord)];
             const diff = myScore - cpuScore;

            if(diff === 0) {
              this.result = '비겼습니다'
            } else if(diff === 1) {
              this.result = '이겼습니다.'
              this.score ++;
            } else if(diff == -1){
              this.result = '졌습니다.'
              this.score --;
            }

            setTimeout(()=>{
              this.changeHand()
            },1000)
          },
        },
        beforeCreate() {
           console.log('beforeCreate');
        },
        created() {
          // 랜더링이 되기 전 실행
           console.log('created');
        },
        beforeMount(){
          console.log('beforeMount');
        },
        mounted(){
          // 화면 조작을 하는 작업들은 주로 마운티드에서 작업 함
          // 화면 랜더링 후 실행
          console.log('mounted');
          this.changeHand();
        },
        beforeUpdate(){
          console.log('beforeUpdate');
        },
        updated(){
          // 화면 속 데이터가 변경 되어 다시 화면에 그려줄 경우 실행
          console.log('updated');
        },
        beforeDestroy(){
          console.log('beforeDestroy');
          // 메모리 누수 방지 -> 불필요한 작업을 없애주는 역할
          clearInterval(interval);
        },
        destroyed(){
          // 화면에서 컴포넌트가 사라졌을 경우 실행
          console.log('destroyed');
        }
    };
</script>

<style scoped>
  #computer {
    width: 142px;
    height: 200px;
    background-position: 0 0;
  }
</style>