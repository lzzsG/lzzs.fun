import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import PropTypes from 'prop-types';
import ScrollToTopButton from '../components/ScrollToTopButton.js';
import GiscusComments from '../components/GiscusComments';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css'; // 引入你喜欢的highlight.js样式
import { useLocation, Link } from 'react-router-dom';
import config from '../config/config.js';
import directoryStructure from '../assets/directory/_directoryStructure.json';
import blogConfig from '../blogConfig.json';


const NewMarkdownPage = ({ filePath }) => {
    const [markdown, setMarkdown] = useState('');
    const [toc, setToc] = useState([]);
    const [activeId, setActiveId] = useState('');
    const [series, setSeries] = useState(null); // 用于存储从 blogConfig 中提取的数据
    const location = useLocation();
    const [isTocVisible, setIsTocVisible] = useState(() => {
        const saved = localStorage.getItem('tocVisible');
        return saved === 'true' ? true : false; // 注意 localStorage 只能存储字符串
    });

    // 监听 isTocVisible 的变化，并更新 localStorage
    useEffect(() => {
        localStorage.setItem('tocVisible', isTocVisible.toString());
    }, [isTocVisible]);

    const scrollToHash = (hash) => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            // 获取导航栏高度，确保内容不会被遮挡
            const navbarHeight = document.querySelector('.mynavbar')?.offsetHeight || 0;
            window.scrollTo({
                top: element.offsetTop - navbarHeight, // 确保锚点下方
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const { hash } = location;
        if (hash) {
            // 在 TOC 切换可见性后确保正确滚动
            setTimeout(() => scrollToHash(hash), 1000); // 延迟滚动
        }
    }, [location.hash]);

    // 切换目录可见状态的函数
    const toggleTocVisibility = () => {
        setIsTocVisible((prev) => {
            const newValue = !prev;
            localStorage.setItem('tocVisible', newValue.toString());
            return newValue;
        });
    };

    useEffect(() => {
        // 从 blogConfig 中查找与当前 filePath 匹配的条目
        const matchedSection = blogConfig.sections.find(section =>
            (section.type === 'series' && section.articles.some(article => article.filePath === filePath)) ||
            (section.type === 'blog' && section.filePath === filePath)
        );

        // 如果找到了匹配的条目，则设置页面标题和描述
        if (matchedSection) {
            const title = matchedSection.title;
            const description = matchedSection.description || `Documentation for ${title}`;

            document.title = `${title} - ${config.siteName}`;

            let descriptionTag = document.querySelector('meta[name="description"]');
            if (!descriptionTag) {
                descriptionTag = document.createElement('meta');
                descriptionTag.setAttribute('name', 'description');
                document.head.appendChild(descriptionTag);
            }
            descriptionTag.setAttribute('content', description);
        }
    }, [filePath]);


    useEffect(() => {
        fetch(filePath)
            .then(response => response.text())
            .then(text => {
                const renderer = new marked.Renderer();
                let headingId = 0; // 初始化计数器
                const headings = []; // 存储标题信息

                renderer.heading = function (text, level) {
                    // 对于每个标题，生成一个递增的ID
                    const escapedText = `heading-${++headingId}`;

                    // 替换标题中的<code></code>为Markdown的代码表示
                    const modifiedText = text.replace(/<code>(.*?)<\/code>/g, '`$1`').replace(/<strong>(.*?)<\/strong>/g, '$1');;

                    headings.push({ id: escapedText, level: level, text: modifiedText }); // 收集经过修改的标题信息

                    return `
                        <h${level} id="${escapedText}">
                            <a href="#${escapedText}" class="header-link">#</a>
                            ${modifiedText}
                        </h${level}>`;
                };

                const originalImageRenderer = renderer.image;

                renderer.image = function (href, title, text) {
                    // 检查路径是否以 "figs/" 开始
                    if (href.startsWith('figs/')) {
                        // 获取Markdown文件的目录路径
                        const mdDirPath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
                        // 构建新的图片路径
                        const newHref = mdDirPath + href;
                        // 使用新的图片路径渲染图片
                        return originalImageRenderer.call(this, newHref, title, text);
                    }
                    // 对于其他不需要特殊处理的路径，使用默认逻辑
                    return originalImageRenderer.call(this, href, title, text);
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
                        button.className = 'btn btn-xs lg:btn-sm btn-ghost absolute top-0 right-0 m-0'; // 添加样式类以便自定义样式
                        button.onclick = function () {
                            navigator.clipboard.writeText(block.textContent).then(() => {
                                button.textContent = 'Copied!';
                                setTimeout(() => { button.textContent = 'Copy'; }, 1000);
                            });
                        };
                        const pre = block.parentNode;
                        pre.style.position = 'relative';
                        block.parentNode.insertBefore(button, block);
                    });
                }, 0);
            });
    }, [filePath]);

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

    useEffect(() => {
        // 根据滚动位置更新活跃的标题ID
        const handleScroll = () => {
            let closestId = '';
            let closestDistance = Infinity;

            toc.forEach((item) => {
                const element = document.getElementById(item.id);
                if (element) {
                    const distance = Math.abs(element.getBoundingClientRect().top);
                    if (distance < closestDistance) {
                        closestId = item.id;
                        closestDistance = distance;
                    }
                }
            });

            setActiveId(closestId);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [toc]);

    useEffect(() => {
        if (activeId) {
            // 找到当前高亮的目录项
            const activeItem = document.querySelector(`.toc-sidebar li a[href="#${activeId}"]`);

            if (activeItem) {
                // 获取目录容器
                const tocContainer = document.querySelector('.toc-sidebar');
                // 检查容器和目标项是否存在
                if (tocContainer && activeItem) {
                    const itemRect = activeItem.getBoundingClientRect();
                    const containerRect = tocContainer.getBoundingClientRect();

                    // 计算需要滚动的距离
                    const scrollDistance = itemRect.top - containerRect.top - (tocContainer.clientHeight / 2) + (itemRect.height / 2);

                    // 使用 scrollBy 方法实现平滑滚动
                    tocContainer.scrollBy({
                        top: scrollDistance,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }, [activeId, isTocVisible]);

    useEffect(() => {
        // 从 blogConfig 中找到与当前 filePath 匹配的 series 或 blog 项
        const matchedSection = blogConfig.sections.find(section =>
            (section.type === 'series' || section.type === 'blog') &&
            (section.articles ? section.articles.some(article => article.filePath === filePath) : section.filePath === filePath)
        );
        setSeries(matchedSection);
    }, [filePath]);


    return (
        <div className="m-4 mt-16 sm:mt-4 md:m-14 flex justify-center">
            <ScrollToTopButton />
            <button onClick={toggleTocVisibility} className="btn btn-ghost z-50 text-bold fixed top-0 sm:top-24 right-1 mb-0.5 h-12 w-12 ">{isTocVisible ? '隐藏' : '目录'}</button>
            {isTocVisible && (
                <div className={`toc-sidebar z-20 fixed top-0 sm:mt-24 right-1 overflow-y-auto`} style={{ maxHeight: '80%' }}>
                    <ul className="mt-12 pr-3 sm:mt-0 bg-base-200 w-72  p-2">
                        {series && (
                            <div className="w-full  mx-2">
                                <div className="flex">
                                    <h3 className="text-lg mb-2 font-bold">{series.title}</h3>
                                </div>
                                {series.date && <p className="text-sm text-gray-500 mb-2 ">{series.date}</p>}
                                {series.description && <p className="mb-2">{series.description}</p>}
                                {series.type === 'series' && (
                                    <>
                                        <div className="divider m-0"></div>
                                        <ul className="list-disc list-inside">
                                            {series.articles.map((article, index) => (
                                                <Link key={index} to={article.link}>
                                                    <li className="text-base mb-2 hover:underline">
                                                        {article.title}
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}
                        <div className="divider m-0"></div>
                        {toc.map((item, index) => (
                            <li key={index} className={`toc-item hover:underline mb-1 text-sm ${activeId === item.id ? 'text-primary font-bold' : ''}`} style={{ paddingLeft: `${(item.level - 1) * 2 * 4}px` }}>
                                <a href={`#${item.id}`}>
                                    <a className="text-neutral mr-1">
                                        -
                                    </a>
                                    {item.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>)}
            <ul className="list-disc list-inside"></ul>
            <article className="prose max-w-full md:max-w-[780px] ">
                <div dangerouslySetInnerHTML={{ __html: markdown }} />
                <GiscusComments />
                <br />
            </article>

        </div >
    );
};

NewMarkdownPage.propTypes = {
    filePath: PropTypes.string.isRequired,
};

export default NewMarkdownPage;
