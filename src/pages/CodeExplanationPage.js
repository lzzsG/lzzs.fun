import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked'; // 使用 marked 来解析 Markdown
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/themes/prism-tomorrow.css';
import { Link, useLocation } from 'react-router-dom'; // 引入 useLocation 来监听路由变化
import blogConfig from '../blogConfig.json';

const CodeExplanationPage = ({ codeFile, markdownFile }) => {
    const [code, setCode] = useState('');
    const [markdown, setMarkdown] = useState(''); // 存储解析后的 Markdown 内容
    const [series, setSeries] = useState(null); // 存储系列信息
    const [codeType, setCodeType] = useState('plaintext'); // 默认代码类型为 plaintext
    const [isTocVisible, setIsTocVisible] = useState(() => {
        const saved = localStorage.getItem('tocVisible');
        return saved === 'true';
    });

    const location = useLocation(); // 获取当前路由信息
    const codeRef = useRef(null);
    const explanationRef = useRef(null);
    const isSyncingScroll = useRef(false);

    // 同步滚动功能，按照比例滚动
    const syncScroll = (source, target) => {
        if (isSyncingScroll.current) return;
        isSyncingScroll.current = true;

        const sourceScrollHeight = source.current.scrollHeight - source.current.clientHeight;
        const targetScrollHeight = target.current.scrollHeight - target.current.clientHeight;

        if (sourceScrollHeight > 0 && targetScrollHeight > 0) {
            const sourceScrollRatio = source.current.scrollTop / sourceScrollHeight;
            const targetScrollTop = sourceScrollRatio * targetScrollHeight;
            target.current.scrollTop = targetScrollTop;
        }

        requestAnimationFrame(() => {
            isSyncingScroll.current = false;
        });
    };

    // 根据 codeFile 查找对应的 codeType
    useEffect(() => {
        if (blogConfig?.sections && Array.isArray(blogConfig.sections)) {
            const matchedSection = blogConfig.sections.find(section =>
                section.articles && Array.isArray(section.articles) &&
                section.articles.some(article => article.codeFile === codeFile)
            );

            if (matchedSection) {
                const matchedArticle = matchedSection.articles.find(article => article.codeFile === codeFile);
                if (matchedArticle) {
                    setCodeType(matchedArticle.codeType || 'plaintext'); // 根据配置文件中的 codeType 设置高亮类型
                }
                setSeries(matchedSection);

                // 动态设置页面标题和描述
                const title = matchedSection.title || 'Code Explanation';
                const description = matchedSection.description || `Learn more about ${title}`;

                document.title = `${title} - Code Explanation`;

                let metaDescriptionTag = document.querySelector('meta[name="description"]');
                if (!metaDescriptionTag) {
                    metaDescriptionTag = document.createElement('meta');
                    metaDescriptionTag.setAttribute('name', 'description');
                    document.head.appendChild(metaDescriptionTag);
                }
                metaDescriptionTag.setAttribute('content', description);
            }
        }
    }, [codeFile]);

    // 加载代码文件
    useEffect(() => {
        fetch(codeFile)
            .then((response) => response.text())
            .then((text) => {
                setCode(text);
                Prism.highlightAll();
            })
            .catch((error) => console.error('Error loading code file:', error));
    }, [codeFile]);

    // 配置 Markdown 解析器并加载 Markdown 文件
    useEffect(() => {
        const renderer = new marked.Renderer();

        // 配置高亮代码块
        marked.setOptions({
            renderer: renderer,
            gfm: true,
            breaks: true, // 支持换行符
            highlight: function (code, lang) {
                const language = Prism.languages[lang] || Prism.languages.plaintext;
                return Prism.highlight(code, language, lang);
            }
        });

        fetch(markdownFile)
            .then((response) => response.text())
            .then((text) => {
                const parsedMarkdown = marked(text); // 使用 marked 解析 Markdown 为 HTML
                setMarkdown(parsedMarkdown); // 设置解析后的 HTML 内容
                Prism.highlightAll(); // 高亮代码
            })
            .catch((error) => console.error('Error loading markdown file:', error));
    }, [markdownFile]);

    // 切换目录可见性
    const toggleTocVisibility = () => {
        setIsTocVisible((prev) => {
            const newValue = !prev;
            localStorage.setItem('tocVisible', newValue.toString());
            return newValue;
        });
    };

    // 生成系列章节的链接
    const generateCodeSeries = (series) => {
        return (
            <div className="w-full mb-4">
                <div className="flex">
                </div>
                {series.date && <p className="text-sm text-gray-500 mb-2">{series.date}</p>}
                {series.description && <p className="mb-2">{series.description}</p>}
                <div className="divider m-0"></div>
                <ul className="list-disc list-inside">
                    {series.articles.map((article, index) => {
                        const isSelected = location.pathname === article.link; // 判断当前路径是否与文章链接匹配
                        return (
                            <li key={index} className={`text-base mb-2 flex items-center ${isSelected ? 'bg-base-100' : 'hover:bg-base-100'}`}>
                                {article.linkType === 'internal' ? (
                                    <Link to={article.link} className="flex items-center w-full">
                                        {article.title}
                                    </Link>
                                ) : (
                                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                                        {article.title}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    return (
        <div className="flex h-screen mt-10 -mb-2">
            {/* TOC 按钮 */}
            <button
                onClick={toggleTocVisibility}
                className="btn btn-ghost fixed top-12 right-2 w-16 z-50"
            >
                {isTocVisible ? '隐藏目录' : '显示目录'}
            </button>

            {/* TOC 目录 (仅显示系列信息) */}
            {isTocVisible && series && (
                <div className="toc-sidebar fixed top-12 right-2 z-40 h-full overflow-y-auto bg-base-200 p-4 w-64 border border-base-100 border-2">
                    <h2 className="text-lg font-bold">{series?.title || '目录'}</h2>
                    {generateCodeSeries(series)}
                </div>
            )}

            {/* 左边代码区域 */}
            <div
                ref={codeRef}
                className="w-1/2 overflow-y-scroll"
                onScroll={() => syncScroll(codeRef, explanationRef)}
            >
                {/* 使用 codeType 来动态设置 Prism.js 的语言类 */}
                <pre className="line-numbers" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <code className={`language-${codeType}`}>{code}</code>
                </pre>
            </div>

            {/* 分割线 */}
            <div className="w-0.5 bg-gray-500"></div>

            {/* 右边讲解区域 */}
            <div
                ref={explanationRef}
                className="w-1/2 p-4 bg-base-100 overflow-y-scroll prose max-w-none" // 确保右边内容占满 1/2
                onScroll={() => syncScroll(explanationRef, codeRef)}
                dangerouslySetInnerHTML={{ __html: markdown }} // 渲染解析后的 Markdown 内容
            ></div>
        </div>
    );
};

export default CodeExplanationPage;
