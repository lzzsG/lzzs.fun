import React, { useEffect } from 'react';

const GiscusComments = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'lzzsG/lzzsg.github.io');
        script.setAttribute('data-repo-id', 'R_kgDOLm4KXQ');
        script.setAttribute('data-category', 'Announcements');
        script.setAttribute('data-category-id', 'DIC_kwDOLm4KXc4Ch8BA');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-theme', 'noborder_gray');
        script.setAttribute('data-lang', 'zh-CN');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        document.getElementById('giscus-container').appendChild(script);
    }, []);

    return <div id="giscus-container"></div>;
};

export default GiscusComments;
