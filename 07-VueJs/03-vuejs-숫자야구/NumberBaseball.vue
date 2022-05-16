<template>
<div>
    <h1>{{result}}</h1>
    <form v-on:submit="onSubmitform">
    <input ref="answer" maxlength="4" v-model="value">
    <button>입력</button>
    </form>
    <div>시도 : {{count}}</div>
</div>
</template>

<script>
    export default {
        data(){
           return{
               value : '',
               result : '',
               count : 0,
           }
        },
        methods: {
            onSubmitform(e){
                e.preventDefault();
            }
        },
    };
</script>

<style>

</style>