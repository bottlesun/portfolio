<template>

<div class="black-bg" v-if="modalState == true" >
  <div class="whith-bg">
    <h4>상세페이지</h4>
    <p>상세페이지 내용</p>
     <button @click="modalState = false">닫기</button>
  </div>
</div>

<div class="menu">
  <a v-for="(menus,i) in menu" :key="i">{{menus}}</a>
</div>

<!--
   <div v-for="(article,i) in products" :key="i">
    <h4>{{article}}</h4>
    <p>{{i+1}}00 만원</p>
  </div> 
-->

  <div v-for="(a,i) in oneRoom" :key="i">
    <!--
      속성 데이터 바인딩 :
      태그 안 내용 데이터 바인딩 {{}}
    -->
    <img :src="a.image" class="room-img">
    <h4 @click="modalState = true">{{a.title}}</h4>
    <p>{{a.price}}원</p>
    <button @click="count[i] += 1">허위매물신고</button>  <span>신고수 : {{count[i]}}</span>
  </div>

</template>

<script>

import oneRoom from './assets/oneroomData';

export default {
  name: 'App',
  data(){
    return {
      oneRoom : oneRoom,
      modalState : false,
      count : [0,0,0,0,0,0],
      menu : ['Home' , 'Products' , 'About'],
      products : ['역삼동원룸','천호동원룸','마포구원룸'],
    }
  },
  methods : {
  //함수 만드는 공간
  CountArray(){
    //data 안에 있는 값을 가지고 오기 위해서는 this. 를 붙여야 한다.
        for(let i = 0; i < this.oneRoom.length; i++){
      this.count.push(0);
    }
   },
  },
  
  components: {

  }
}


</script>

<style>

body{
  margin: 0;
}
div{
  box-sizing: border-box;
}
.black-bg{
  width:100%;height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}
.whith-bg {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu{
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}

.menu a {
  color:#fff;
  padding: 10px;
}

.room-img{
  width:100%;
  margin-top: 40px;
}

</style>
