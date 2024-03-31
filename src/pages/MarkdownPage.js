import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ScrollToTopButton from '../components/ScrollToTopButton.js';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css'; // 引入你喜欢的highlight.js样式
import { useLocation } from 'react-router-dom';
import config from '../config/config.js';

const MarkdownPage = ({ filePath }) => {
    const { i18n } = useTranslation();
    const [markdown, setMarkdown] = useState('');
    const [toc, setToc] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('blog')} - ${config.siteName}`;
    }, [t, config.siteName]);


    useEffect(() => {
        const localizedFilePath = filePath.replace('.md', `.${i18n.language}.md`);

        fetch(localizedFilePath)
            .then(response => response.text())
            .then(text => {
                const renderer = new marked.Renderer();
                let headingId = 0; // 初始化计数器
                const headings = []; // 存储标题信息

                renderer.heading = function (text, level) {
                    // 对于每个标题，生成一个递增的ID
                    const escapedText = `heading-${++headingId}`;
                    headings.push({ id: escapedText, level: level, text: text }); // 收集标题信息

                    return `
                        <h${level} id="${escapedText}">
                            <a href="#${escapedText}" class="header-link">#</a>
                            ${text}
                        </h${level}>`;
                };

                marked.setOptions({
                    renderer: renderer,
                    highlight: function (code, lang) {
                        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                        return hljs.highlight(code, { language }).value;
                    },
                });
                const html = marked.parse(text);
                setMarkdown(html);
                setToc(headings);
                hljs.highlightAll();
            })
            .then(() => {
                // 等待DOM更新
                setTimeout(() => {
                    document.querySelectorAll('pre code').forEach((block) => {
                        const button = document.createElement('button');
                        button.textContent = 'Copy';
                        button.className = 'btn btn-xs bg-base-200 lg:btn-sm absolute top-0 right-0 m-4'; // 添加样式类以便自定义样式
                        button.onclick = function () {
                            navigator.clipboard.writeText(block.textContent).then(() => {
                                button.textContent = 'Copied!';
                                setTimeout(() => { button.textContent = 'Copy'; }, 2000);
                            });
                        };

                        const pre = block.parentNode;
                        pre.style.position = 'relative';
                        block.parentNode.insertBefore(button, block);
                    });
                }, 0);
            });
    }, [filePath, i18n.language]);

    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                const offsetTop = element.offsetTop;
                const navbarHeight = document.querySelector('.mynavbar').offsetHeight; // 获取导航栏高度
                window.scrollTo({
                    top: offsetTop - navbarHeight, // 调整滚动位置，使目标元素位于导航栏下方
                });
            }
        }
    }, [hash]); // 当URL的hash部分变化时触发

    return (
        <div className="m-4 mt-16 sm:mt-4 md:m-14 flex justify-center">
            <ScrollToTopButton />

            <div className="toc-sidebar z-30 hidden xl:block fixed top-12 right-0 ">
                <div className="h-12 flex mb-0.5 justify-end w-64 bg-base-100">

                    <botten className="btn w-12 mr-0.5">1</botten>
                </div>
                <ul className="bg-base-200 w-64 p-4">
                    {toc.map((item, index) => (
                        <li key={index} className={`toc-item hover:underline mb-1 text-sm toc-h${item.level}`}>
                            <a href={`#${item.id}`}>
                                <a className="text-neutral mr-1">
                                    >
                                </a>
                                {item.text}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <article className="prose lg:prose-lg max-w-full md:max-w-[730px]">
                <div dangerouslySetInnerHTML={{ __html: markdown }} />
            </article>
        </div>
    );
};

MarkdownPage.propTypes = {
    filePath: PropTypes.string.isRequired,
};

export default MarkdownPage;
