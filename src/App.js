//应用的主组件，通常用于定义路由和全局布局。
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import routes from './routes';
import './assets/styles/global.css';
import Redirector from './utils/Redirector';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';


function App() {
  const getDefaultLanguagePath = () => {
    const preferredLanguage = window.navigator.language.startsWith('zh') ? '/' : '/en';
    const redirectPathname = localStorage.getItem('redirectPathname');

    console.log('Preferred Language:', preferredLanguage, 'Redirect Path:', redirectPathname); // 输出调试信息

    if (redirectPathname) {
      return redirectPathname;
    }

    return preferredLanguage;
  };


  return (
    <div>
      <Router>
        <Redirector />
        <MainLayout>
          <Routes>

            {/* 检查根路径的渲染 */}
            <Route path="/" element={<HomePage />} />  // 中文首页
            <Route path="/en/" element={<HomePage />} />  // 英文首页

            {/* 其他路由 */}
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {/* 捕获所有未定义路径的路由 */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
