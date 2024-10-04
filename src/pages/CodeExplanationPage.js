import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked'; // 使用具名导入
import Prism from 'prismjs'; // 使用 Prism.js 进行代码高亮
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'; // 行号样式
import 'prismjs/plugins/line-numbers/prism-line-numbers'; // 行号插件
import 'prismjs/themes/prism-tomorrow.css'; // Prism.js 主题

const CodeExplanationPage = ({ codeFile, markdownFile }) => {
    const [code, setCode] = useState(''); // 存储代码内容
    const [markdown, setMarkdown] = useState(''); // 存储讲解内容

    // 引用滚动区域
    const codeRef = useRef(null);
    const explanationRef = useRef(null);
    const isSyncingScroll = useRef(false); // 防止滚动事件互相影响

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

    // 加载代码文件
    useEffect(() => {
        fetch(codeFile)
            .then((response) => response.text())
            .then((text) => {
                setCode(text);
                Prism.highlightAll(); // 使用 Prism.js 进行代码高亮
            })
            .catch((error) => console.error('Error loading code file:', error));
    }, [codeFile]);

    // 加载 Markdown 文件
    useEffect(() => {
        fetch(markdownFile)
            .then((response) => response.text())
            .then((text) => {
                const parsedMarkdown = marked(text, { gfm: true, breaks: true });
                setMarkdown(parsedMarkdown); // 使用 marked 解析 Markdown 为 HTML，保留格式
                Prism.highlightAll(); // 对渲染后的 Markdown 内容中的代码块进行高亮
            })
            .catch((error) => console.error('Error loading markdown file:', error));
    }, [markdownFile]);

    return (
        <div className="flex h-screen mt-12">
            {/* 左边代码区域 */}
            <div
                ref={codeRef}
                className="w-1/2 -my-2 overflow-y-scroll"
                onScroll={() => syncScroll(codeRef, explanationRef)}
            >
                <pre
                    className="line-numbers"
                    style={{
                        whiteSpace: 'pre-wrap',    // 保持换行
                        wordBreak: 'break-word',   // 自动换行处理长单词
                        overflowWrap: 'break-word',// 支持自动断行
                    }}
                >
                    <code className="language-c">{code}</code>
                </pre>
            </div>

            {/* 分割线 */}
            <div className="w-0.5 bg-gray-500"></div>

            {/* 右边讲解区域 */}
            <div
                ref={explanationRef}
                className="w-1/2 p-4 bg-base-100 overflow-y-scroll"
                onScroll={() => syncScroll(explanationRef, codeRef)}
                dangerouslySetInnerHTML={{ __html: markdown }} // 渲染 Markdown 内容为 HTML
            ></div>
        </div>
    );
};

export default CodeExplanationPage;