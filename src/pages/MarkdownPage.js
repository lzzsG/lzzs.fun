import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import PropTypes from 'prop-types';

const MarkdownPage = ({ filePath }) => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch(filePath)
            .then(response => response.text())
            .then(text => {
                const html = marked.parse(text);
                setMarkdown(html);
            });
    }, [filePath]);

    return (
        <div className="m-6 md:m-12 2xl:m-24 flex justify-center">
            <article className="prose prose-slate lg:prose-xl max-w-[800px]">
                <div dangerouslySetInnerHTML={{ __html: markdown }} />
            </article>
        </div>
    );
};

MarkdownPage.propTypes = {
    filePath: PropTypes.string.isRequired,
};

export default MarkdownPage;
