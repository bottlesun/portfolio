import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import SWRDevtool from '@jjordy/swr-devtools';


import App from './layouts/App';


axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? 'https://sleact.nodebird.com' : 'http://localhost:3090';

render(
  <BrowserRouter>
    <SWRDevtool>
      <App/>
    </SWRDevtool>
  </BrowserRouter>
  ,
  document.querySelector('#app'));


// pages - 서비스 페이지
// components - 짜잘 컴포넌트
// layouts - 공통 레이아웃