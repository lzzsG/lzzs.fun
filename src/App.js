//应用的主组件，通常用于定义路由和全局布局。
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import routes from './routes';
import './assets/styles/global.css';
import Redirector from './utils/Redirector';

function App() {

  const getDefaultLanguagePath = () => {
    const preferredLanguage = window.navigator.language.startsWith('zh') ? 'zh' : 'en';
    return `/${preferredLanguage}`;
  };
  useEffect(() => {
    const redirectPathname = localStorage.getItem('redirectPathname');
    if (redirectPathname) {
      localStorage.removeItem('redirectPathname'); // 清除以避免重复重定向
      window.location.href = redirectPathname; // 实际跳转
    }
  }, []);


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
