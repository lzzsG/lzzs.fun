import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import routes from './routes';
import './assets/styles/global.css';
import Redirector from './utils/Redirector';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { useTranslation } from 'react-i18next';

import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-c';     // C 语言
import 'prismjs/components/prism-rust';  // Rust 语言
import 'prismjs/components/prism-python'; // Python 语言
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'; // 行号样式
import 'prismjs/plugins/line-numbers/prism-line-numbers';     // 行号插件




const AppContent = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // 如果是根路径，没有指定语言前缀，则设置默认语言为中文
    if (location.pathname === '/') {
      i18n.changeLanguage('zh');
    }
  }, [location, i18n]);

  return (
    <MainLayout>
      <Routes>
        {/* 中文首页 */}
        <Route path="/" element={<HomePage />} />

        {/* 英文首页 */}
        <Route path="/en" element={<HomePage />} />

        {/* 其他路由 */}
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* 捕获所有未定义路径的路由 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

function App() {
  return (
    <Router>
      <Redirector />
      <AppContent />
    </Router>
  );
}

export default App;
