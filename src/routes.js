//路由配置比较复杂，提取到一个单独的文件中// src/routes.js// src/routes.js// src/routes.js

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TestPage from './pages/TestPage';
import MarkdownPage from './pages/MarkdownPage';
import BlogPage from './pages/BlogPage';
import i18n from './i18n/i18n';

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
        path: '/:lang/blog/markdown-test',
        element: <MarkdownPage
            filePath="/md/WhatToOut.md"
            i18nKey="WhatToOut"
        />,
    },
    {
        path: "/:lang/blog/bare-metal/0-About-bare-metal-programming",
        element: <MarkdownPage
            i18nKey="bareMetal.0-About-bare-metal-programming"
            filePath="/md/bare-metal/0-About-bare-metal-programming.md"
        />,
    },
    {
        path: "/:lang/blog/bare-metal/1-Development-environment-setup",
        element: <MarkdownPage
            i18nKey="bareMetal.1-Development-environment-setup"
            filePath="/md/bare-metal/1-Development-environment-setup.md"
        />,
    },
    {
        path: "/:lang/blog/bare-metal/2-Create-project",
        element: <MarkdownPage
            i18nKey="bareMetal.2-Create-project"
            filePath="/md/bare-metal/2-Create-project.md"
        />,
    },
    {
        path: "/:lang/blog/bare-metal/3-Writing-boot-code",
        element: <MarkdownPage
            i18nKey="bareMetal.3-Writing-boot-code"
            filePath="/md/bare-metal/3-Writing-boot-code.md"
        />,
    },
    {
        path: "/:lang/blog/bare-metal/4-Writing-the-main-program",
        element: <MarkdownPage
            i18nKey="bareMetal.4-Writing-the-main-program"
            filePath="/md/bare-metal/4-Writing-the-main-program.md"
        />,
    },
    {
        path: "/:lang/blog/bare-metal/4½-Supplement-for-the-main-program-of-operating-systems",
        element: <MarkdownPage
            i18nKey="bareMetal.4½-Supplement-for-the-main-program-of-operating-systems"
            filePath="/md/bare-metal/4½-Supplement-for-the-main-program-of-operating-systems.md"
        />,
    },
    {
        path: "/:lang/blog/bare-metal/5-Compiling-code",
        element: <MarkdownPage
            i18nKey="bareMetal.5-Compiling-code"
            filePath="/md/bare-metal/5-Compiling-code.md"
        />,
    },
    {
        path: "/:lang/blog/bare-metal/6-Linking-code",
        element: <MarkdownPage
            i18nKey="bareMetal.6-Linking-code"
            filePath="/md/bare-metal/6-Linking-code.md"
        />,
    },
    {
        path: "/:lang/blog/bare-metal/7-Generating-image-files",
        element: <MarkdownPage
            i18nKey="bareMetal.7-Generating-image-files"
            filePath="/md/bare-metal/7-Generating-image-files.md"
        />,
    },
    {
        path: "/:lang/blog/bare-metal/8-Running-on-the-target-platform",
        element: <MarkdownPage
            i18nKey="bareMetal.8-Running-on-the-target-platform"
            filePath="/md/bare-metal/8-Running-on-the-target-platform.md"
        />,
    },
];
export default routes;


