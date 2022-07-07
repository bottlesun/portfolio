import loadable from '@loadable/component';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


// 페이지 단위로 Code Spliting
// 싱글페이지 어플리케이션에서 번들 사이즈가 커지면 로딩속도나 성능면에서 문제가 생길 수 있다. 코드 스플리팅은 이것들을 여러개의 번들로 나누거나 동적으로 import 하는 기법을 말한다.

const Workspace = loadable(() => import('@layouts/Workspace'));
const LogIn = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
    <Route path="/login" component={LogIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/workspace/:workspace" component={Workspace} />
    {/* /workspace/:workspace  라우트 파라미터는 제일 마지막으로 넣어야 한다 */}
  </Switch>
);

export default App;