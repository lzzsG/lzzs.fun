import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import routes from './routes';
import './assets/styles/global.css';
import Redirector from './utils/Redirector';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    // 检查 URL 中是否包含锚点
    const hash = location.hash;

    // 从 localStorage 读取并清除重定向路径
    const redirectPathname = localStorage.getItem('redirectPathname');
    if (redirectPathname && redirectPathname === location.pathname + location.search + location.hash) {
      localStorage.removeItem('redirectPathname');
    }

    // 如果包含锚点，则滚动到目标元素
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
}

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
        <ScrollToHash />
        <MainLayout>
          <Routes>
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
