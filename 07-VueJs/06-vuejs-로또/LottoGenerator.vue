<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" :key="ball" number="10"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus"></lotto-ball>
    <button v-if="redo" >한 번 더!</button>
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

    },
    mounted() {
      for(let i = 0; i < this.winNumbers.length; i ++){
        setTimeout(()=> {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
    },
    beforeDestroy() {

    },
  };
</script>

<style scoped>
</style>