//应用的主组件，通常用于定义路由和全局布局。
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import routes from './routes';
import './assets/styles/global.css';
import Redirector from './utils/Redirector';

function App() {

  const getDefaultLanguagePath = () => {
    // 默认语言逻辑保持不变
    const preferredLanguage = window.navigator.language.startsWith('zh') ? '/zh' : '/en';
    // 检查是否有重定向路径
    const redirectPathname = localStorage.getItem('redirectPathname');
    // 如果有重定向路径，优先使用这个路径
    if (redirectPathname) {
      return redirectPathname;
    }
    // 否则，使用默认语言路径
    return preferredLanguage;
  };

  return (
    <div>
      <Router>
        <Redirector />
        <MainLayout>
          <Routes >
            <Route path="/" element={<Navigate replace to={getDefaultLanguagePath()} />} />
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </MainLayout>
      </Router>
    </div>

  );
}

export default App;
