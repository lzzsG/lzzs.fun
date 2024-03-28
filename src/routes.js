//路由配置比较复杂，提取到一个单独的文件中// src/routes.js// src/routes.js// src/routes.js
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const routes = [
    {
        path: '/',
        element: <HomePage />,

    },
    {
        path: '/about',
        element: <AboutPage />,
    },
];

export default routes;
