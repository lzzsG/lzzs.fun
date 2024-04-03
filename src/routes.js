//路由配置比较复杂，提取到一个单独的文件中// src/routes.js// src/routes.js// src/routes.js
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TestPage from './pages/TestPage';
import MarkdownPage from './pages/MarkdownPage';
import BlogPage from './pages/BlogPage';

const routes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/about',
        element: <AboutPage />,
    },
    {
        path: '/test',
        element: <TestPage />,
    },
    {
        path: '/blog',
        element: <BlogPage />,
    },
    {
        path: '/blog/markdown1',
        element: <MarkdownPage filePath="/md/WhatToOut.md" />,
    },
    {
        path: '/blog/os-test',
        element: <MarkdownPage filePath="/md/os-test/p2-osviewrv.md" />,
    },
];
export default routes;


