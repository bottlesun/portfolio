<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" :key="ball" v-bind:number="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한 번 더!</button>
  </div>
</template>

<script>
  import LottoBall from './LottoBall';

  function getWinNumbers() {
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
  }

const timeouts = []

 export default {
    components: {
      LottoBall,
    },
    data() {
      return {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
      };
    },
   methods: {
     onClickRedo(){
       this.winNumbers = getWinNumbers();
       this.winBalls = [];
       this.bonus = null;
       this.redo = false;
       this.showBalls();
     },
     showBalls() {
      for(let i = 0; i < this.winNumbers.length - 1; i ++){
     timeouts[i] = setTimeout(()=> {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
     timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000);
     }
    },
    mounted() {
    // 화면단 실행
     this.showBalls();
    },
    beforeDestroy() {
    // 화면이 사라진 후 데이터 누수 방지
      timeouts.forEach((t) => {
        clearTimeout(t);
      });
    },
    watch : {
      // 어떤 값이 바뀔 시에 특정 동작을 수행한다.
      // 최대한 사용하지 않기 (권장)
      redo(val,oldval){ //val -> 현재 값 oldval => 이전 값
        console.log('지금값 '+val , '이전값 '+oldval)
        // 변수의 값이 바뀔때 추가적인 동작 사용 가능
        if(val.length === 0){
          this.showBalls();
        }
      }
    },
  };
</script>

<style scoped>
</style>