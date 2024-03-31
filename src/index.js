//应用的入口文件，包括 ReactDOM 的渲染逻辑。
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18n/i18n'; // 引入i18n配置
import './assets/styles/global.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
