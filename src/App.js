//应用的主组件，通常用于定义路由和全局布局。
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import routes from './routes';
import './assets/styles/global.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function App() {

  const history = useHistory();

  useEffect(() => {
    const redirectPathname = localStorage.getItem('redirectPathname');
    if (redirectPathname) {
      history.push(redirectPathname);
      localStorage.removeItem('redirectPathname'); // 清除记录，避免重复重定向
    }
  }, [history]);


  return (
    <div>
      <Router>
        <MainLayout>
          <Routes >
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {/* <div>
            <h2>{t('welcome')}</h2>
            <p>{t('description')}</p>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('zh')}>中文</button>
          </div> */}
          </Routes>
        </MainLayout>
      </Router>
    </div>

  );
}

export default App;
