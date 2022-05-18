<template>
    <div class="ball" :style="{background}">{{number}}</div>
</template>

<script>
    export default {
        name : 'LottoBall',
        props : {
            // props의 값을 임의로 바꿀 수 없다. (읽기전용)
            // 부모 컴포넌트에서 값을 물려 주는 기능
            // props : ['Number'] 로도 사용 가능
            number : Number,
        },
        data() {
            let background;
            return {
                background,
            }
        },
    }
</script>

<style>
  .ball {
    display: inline-block;
    border: 1px solid black;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
  }
</style>