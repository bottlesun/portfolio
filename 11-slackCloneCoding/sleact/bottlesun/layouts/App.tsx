import React from 'react';
import loadable from "@loadable/component";
import {Route, Switch, Redirect} from "react-router-dom";


// 페이지 단위로 Code Spliting
// 싱글페이지 어플리케이션에서 번들 사이즈가 커지면 로딩속도나 성능면에서 문제가 생길 수 있다. 코드 스플리팅은 이것들을 여러개의 번들로 나누거나 동적으로 import 하는 기법을 말한다.

const Login = loadable(() => import('@pages/Login'))
const SignUp = loadable(() => import('@pages/SignUp'))
const workspace = loadable(() => import('@layouts/Workspace'))



const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login"/>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route path='/workspace' component={workspace} />
    </Switch>
  )};

export default App;
