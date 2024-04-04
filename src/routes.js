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
        path: '/:lang/blog/markdown-test',
        element: <MarkdownPage
            filePath="/md/WhatToOut.md"
            titleEN="What to expect next: a Markdown typography journey deep into daisyUI and tailwindcss"
            titleZH="接下来可以期待什么：深入daisyUI和tailwindcss的Markdown排版之旅"
            descriptionEN="Explore the fascination of typography and layout designed with daisyUI, tailwindcss, markdown, hljs: This article, translated from the official daisyUI documentation, takes you step by step into the world of Markdown. From basic text formatting to complex code blocks and lists, experience how to elegantly present content with Markdown. Whether it's bold, italic, ordered/unordered lists, or code highlighting, every detail is designed to enhance the reading experience. Start your Markdown journey with this article and discover the endless possibilities of typography and layout."
            descriptionZH="探索使用daisyUI、tailwindcss、markdown、hljs设计的排版和布局的魅力：本文翻译自daisyUI官方文档，带你一步步走进Markdown的世界。从基本的文本格式到复杂的代码块和列表，体验如何利用Markdown优雅地展现内容。无论是粗体、斜体、有序/无序列表，还是代码高亮，每一个细节都旨在提升阅读体验。通过本文，开启你的Markdown旅程，发现排版和布局的无限可能性。。"
        />,
    }
];
export default routes;


