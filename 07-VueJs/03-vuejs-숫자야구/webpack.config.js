// webpack 설정을 적는것 (webpacking)
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path'); // node 내장 모듈 자동으로 디렉토리 절대 경로를 찾아준다.

module.exports = {
    mode:'development', // 개발중 - development  배포중 - production
    devtool : 'eval', // 개발중 - eval  배포중 -  hidden-source-map
    resolve : {
        extensions: ['.js', '.vue'], // 확장자 처리
    },
    entry: { // 가장중요한 핵심 파일
        app: path.join(__dirname ,'main.js'),
    },
    module: {
        rules: [{ // js파일을 합칠때 어떻게 합칠것인지 정한다.
            test: /\.vue$/,
            loader : 'vue-loader',
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: { // 모든 js 파일을 하나로 합쳐준다.
        filename : '[name].js', // [name]으로 감싸면 알아서 들어감
        path : path.join(__dirname,'dist'), // join으로 불러온다. dist 라는 폴더 안에 최종 결과물로 나온다.
    },
};