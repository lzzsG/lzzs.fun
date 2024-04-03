//应用的主组件，通常用于定义路由和全局布局。
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import routes from './routes';
import './assets/styles/global.css';
import Redirector from './utils/Redirector';

function App() {


  return (
    <div>
      <Router>
        <Redirector />
        <MainLayout>
          <Routes >
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
