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
        element: <MarkdownPage
            filePath="/md/WhatToOut.md"
            titleEN="What to expect next: a Markdown typography journey deep into daisyUI and tailwindcss"
            titleZH="接下来可以期待什么：深入daisyUI和tailwindcss的Markdown排版之旅"
            descriptionEN="Explore the fascination of typography and layout designed with daisyUI, tailwindcss, markdown, hljs: This article, translated from the official daisyUI documentation, takes you step by step into the world of Markdown. From basic text formatting to complex code blocks and lists, experience how to elegantly present content with Markdown. Whether it's bold, italic, ordered/unordered lists, or code highlighting, every detail is designed to enhance the reading experience. Start your Markdown journey with this article and discover the endless possibilities of typography and layout."
            descriptionZH="探索使用daisyUI、tailwindcss、markdown、hljs设计的排版和布局的魅力：本文翻译自daisyUI官方文档，带你一步步走进Markdown的世界。从基本的文本格式到复杂的代码块和列表，体验如何利用Markdown优雅地展现内容。无论是粗体、斜体、有序/无序列表，还是代码高亮，每一个细节都旨在提升阅读体验。通过本文，开启你的Markdown旅程，发现排版和布局的无限可能性。。"
        />,
    },
    {
        path: '/:lang/blog/os-test',
        element: <MarkdownPage
            filePath="/md/os-test/p2-osviewrv.md"
            titleEN="# 【总结笔记】"
            titleZH="第三讲 基于特权级的隔离与批处理"
            descriptionEN="# 主流CPU架构比较
            x86和ARM：由于兼容性和历史原因，这两种架构的设计实现较为复杂。它们的发展历史悠久，以向后兼容性为重，因此积累了大量的指令和特性，这增加了它们的实现复杂度。
            RISC-V：与x86和ARM相比，RISC-V架构以其简洁、灵活和可扩展性著称。RISC-V是一个较新的开源指令集架构（ISA），设计时就考虑到了易于学习和使用，特别适合教育和研究，同时也因为其开放性和模块化设计，在工业应用中越来越受欢迎。"
            descriptionZH="# 第二节 从OS角度看RISC-V 向勇 陈渝 李国良 任炬 2024年春季 提纲 # 1. 主流CPU比较 RISC-V系统模式 RISC-V系统编程：用户态编程 RISC-V系统编程：M-Mode编程 RISC-V系统编程：内核编程 # 本节主要目标 了解 RISC-V 特权级和硬件隔离方式 了解 RISC-V 的 M-Mode 和 S-Mode 的基本特征 了解OS在 M-Mode 和 S-Mode 下如何访问和控制计算机系统 了解不同软件如何在 M-Mode<–>S-Mode<–>U-Mode 之间进行切换"
        />,
    },
];
export default routes;


