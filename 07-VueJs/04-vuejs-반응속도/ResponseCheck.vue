<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
    <template v-show="result.length">
      <!-- v-show = "값" 부분이 flase 면 display:none -->
      <div>평균시간 : {{average}} ms</div>
      <!-- result.reduce((a,c) => a + c ,0) / result.length || 0 => 배열을 더하여 평균 구하는 함수 -->
      <button @click="onReset">리셋</button>
    </template> <!-- template은 없는셈 치는 부분으로 화면에 출력 -->
  </div>
</template>

<script>
   let startTime = 0;
   let endTime = 0;
   let TimeOut = 0;
    export default {
        data(){
          // 정보가 들어갈 data를 넣어주는 속성
           return{
             result : [],
             state : 'waiting',
             message : '클릭해서 시작하세요.',
      };
    },
        computed : {
          // 일반 데이터를 가공하여 작업할때 사용하는 속성
          // 값이 케싱이 되기 때문에 사용 해야 한다.
          average() {
            return this.result.reduce((a,c) => a + c ,0) / this.result.length || 0
          }
        },
        methods: {
          // 함수 작업할때 사용 하는 속성
          onReset(){
            this.state = 'waiting';
          },
          onClickScreen(){
            if(this.state === 'waiting'){
              this.state = 'ready';
              this.message = '초록색이 되면 클릭하세요.';
             TimeOut = setTimeout(()=> {
              this.state = 'now';
              this.message = '지금클릭!';
              startTime = new Date();
              }, Math.floor(Math.random() * 1000) + 2000);//2~3초
            } else if(this.state === 'ready'){
              clearTimeout(TimeOut);
              this.state = 'waiting';
              this.message = '초록색이 된 후에 클릭하세요.';
            } else if(this.state ==='now'){
              endTime = new Date();
              this.state = 'waiting';
              this.message = '클릭해서 시작하세요.';
              this.result.push(endTime - startTime);
            }
          }
        },
    };
</script>

<style scoped>
  #screen {
     width: 300px;
     height: 200px;
     text-align: center;
     user-select: none;
     line-height: 200px;
     font-weight: bold;
   }
  #screen.waiting {
    background-color: aqua;
  }
  #screen.ready {
    background-color: red;
    color: white;
  }
  #screen.now {
    background-color: greenyellow;
  }
</style>