//路由配置比较复杂，提取到一个单独的文件中// src/routes.js// src/routes.js// src/routes.js

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TestPage from './pages/TestPage';
import MarkdownPage from './pages/MarkdownPage';
import BlogPage from './pages/BlogPage';

const routes = [
    {
        path: '/:lang/',
        element: <HomePage />,
    },
    {
        path: '/:lang/about',
        element: <AboutPage />,
    },
    {
        path: '/:lang/test',
        element: <TestPage />,
    },
    {
        path: '/:lang/blog',
        element: <BlogPage />,
    },
    {
        path: '/:lang/blog/markdown1',
        element: <MarkdownPage filePath="/md/WhatToOut.md" />,
    },
    {
        path: '/:lang/blog/os-test',
        element: <MarkdownPage filePath="/md/os-test/p2-osviewrv.md" />,
    },
];
export default routes;


