// src/pages/AboutPage.js
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';
import ScrollToTopButton from '../components/ScrollToTopButton.js';


const AboutPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('test')} - ${config.siteName}`;

        // 设置页面描述
        const descriptionContent = "这是lzzsSite的TestPage";
        let descriptionMetaTag = document.querySelector('meta[name="description"]');
        if (!descriptionMetaTag) {
            descriptionMetaTag = document.createElement('meta');
            descriptionMetaTag.setAttribute('name', 'description');
            document.head.appendChild(descriptionMetaTag);
        }
        descriptionMetaTag.setAttribute('content', descriptionContent);
    }, [t, config.siteName]);



    return (
        <div className="m-6 mt-20 sm:mt-6 md:m-12">
            <ScrollToTopButton />
            {/* <CircularNavigation /> */}
            <div className="flex justify-center ">

                <div class="grid  grid-cols-1 w-full sm:max-w-[700px] mr-2 md:mr-6 lg:mr-12">

                    <div className="flex bg-base-200 rounded-none  h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src='https://www.thebreuers.com/files/00-content/reiseberichte-usa/03-nationalparks/yosemite-np/reisebericht-yosemite-nationalpark-mirror-lake.jpg' alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-4">{t('aboutPage')}</h2>
                                </a>
                                <p>-{t('aboutContent')}</p>
                                <h2>{t('aboutPage')},{t('aboutPage')}48648</h2>
                            </div>

                        </div>
                    </div>

                    <div className="flex bg-base-200 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src="https://bpic.51yuansu.com/backgd/cover/00/63/09/64b52b1426fff_800.jpg?x-oss-process=image/resize,w_780/sharpen,100" alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-4">{t('aboutPage')}</h2>
                                </a>
                                <p>-{t('aboutContent')}</p>
                                <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                            </div>

                        </div>
                    </div>

                    <div className="flex bg-base-200 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src='https://www.thebreuers.com/files/00-content/reiseberichte-usa/03-nationalparks/yosemite-np/reisebericht-yosemite-nationalpark-mirror-lake.jpg' alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-2">MarkdownPage</h2>
                                </a>
                                <p>-添加 md 文件转 MarkdownPage</p>
                                <p>- hljs 高亮优化, 添加当前文章目录</p>
                                <p>-完成响应式新样式 header/footer, ScrollToTopButton 添加 back</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex bg-base-200 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src="https://bpic.51yuansu.com/backgd/cover/00/63/09/64b52b1426fff_800.jpg?x-oss-process=image/resize,w_780/sharpen,100" alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-2">TestPage/BlogPage</h2>
                                </a>
                                <p>-TestPage.js 测试时间线卡片</p>
                                <p>-添加 404.html 在此重定向</p>
                                <p>-添加 BlogPage, 添加 MarkdownPage 框架</p>
                            </div>

                        </div>
                    </div>
                    <div className="flex bg-base-200 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src='https://www.thebreuers.com/files/00-content/reiseberichte-usa/03-nationalparks/yosemite-np/reisebericht-yosemite-nationalpark-mirror-lake.jpg' alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-2">美化响应式</h2>
                                </a>
                                <p>-页面内 markdown 内容测试</p>
                                <p>-添加 ScrollToTopButton.js</p>
                                <p>-主页美化，页面响应式优化，布局优化</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-base-200 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src="images/v1.png" alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-2">部署上线</h2>
                                </a>
                                <p>-部署到 GitHub Pages</p>
                                <p>-GitHub Actions CI/CD</p>
                                <p>-使用 A记录 自定义域名 lzzs.fun</p>

                            </div>
                        </div>
                    </div>

                    <div className="flex bg-base-200 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src="images/v1.png" alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-2">初始框架</h2>
                                </a>
                                <p>-奠定主题与方块基调</p>
                                <p>-测试 i8n 双语效果</p>
                                <p>-配置合理文件结构框架 单独文件路由</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ul className="steps steps-vertical w-24 -mt-6 -mr-6">
                        <li data-content="6" className="step h-48">4/2</li>
                        <li data-content="5" className="step">4/1</li>
                        <li data-content="4" className="step step-primary">3/31</li>
                        <li data-content="3" className="step step-primary">3/30</li>
                        <li data-content="2" className="step step-primary">3/29</li>
                        <li data-content="1" className="step step-primary">3/28</li><li data-content="0" className="step step-primary">3/27-</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default AboutPage;