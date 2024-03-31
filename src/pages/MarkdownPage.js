// import React, { useState, useEffect } from 'react';
// import { marked } from 'marked';
// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';

// const MarkdownPage = ({ filePath }) => {
//     const { i18n } = useTranslation();
//     const [markdown, setMarkdown] = useState('');

//     useEffect(() => {
//         // 根据当前语言，构建正确的文件路径
//         const localizedFilePath = filePath.replace('.md', `.${i18n.language}.md`);

//         fetch(localizedFilePath)
//             .then(response => response.text())
//             .then(text => {
//                 const html = marked.parse(text);
//                 setMarkdown(html);
//             });
//     }, [filePath, i18n.language]); // 当filePath或语言改变时重新加载

//     return (
//         <div className="m-6 md:m-12 2xl:m-24 flex justify-center">
//             <article className="prose  lg:prose-xl max-w-full md:max-w-[800px]">
//                 <div dangerouslySetInnerHTML={{ __html: markdown }} />

//             </article>
//         </div>
//     );
// };

// MarkdownPage.propTypes = {
//     filePath: PropTypes.string.isRequired,
// };

// export default MarkdownPage;

import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ScrollToTopButton from '../components/ScrollToTopButton.js';
import hljs from 'highlight.js'; // 引入highlight.js
import 'highlight.js/styles/monokai-sublime.css'; // 引入你喜欢的highlight.js样式

const MarkdownPage = ({ filePath }) => {
    const { i18n } = useTranslation();
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        const localizedFilePath = filePath.replace('.md', `.${i18n.language}.md`);

        fetch(localizedFilePath)
            .then(response => response.text())
            .then(text => {
                const html = marked.parse(text);
                setMarkdown(html);
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


    return (
        <div className="m-6 md:m-12 2xl:m-24 flex justify-center">
            <ScrollToTopButton />
            <article className="prose lg:prose-xl max-w-full md:max-w-[800px]">
                <div dangerouslySetInnerHTML={{ __html: markdown }} />
            </article>
        </div>
    );
};

MarkdownPage.propTypes = {
    filePath: PropTypes.string.isRequired,
};

export default MarkdownPage;
