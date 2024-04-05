// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';
import { useParams } from 'react-router-dom';
import ScrollToTopButton from '../components/ScrollToTopButton.js';
import ImageModal from '../components/ImageModal.js';



const HomePage = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    let { lang } = useParams();

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);


    useEffect(() => {
        // 设置页面标题
        document.title = `${t('home')} - ${config.siteName}`;

        // 设置页面描述
        const descriptionContent = "欢迎访问我的网站，这是一个用于学习演示的网站，包括测试静态网页构建、汇总我的学习项目以及一些简单的博客！Analyse, Action, Accumulate, Anti-Fear, and Again 解析问题 采取行动 积累经验 消除畏惧 如此反复。还没什么特别的，保持学习吧。";
        let descriptionMetaTag = document.querySelector('meta[name="description"]');
        if (!descriptionMetaTag) {
            descriptionMetaTag = document.createElement('meta');
            descriptionMetaTag.setAttribute('name', 'description');
            document.head.appendChild(descriptionMetaTag);
        }
        descriptionMetaTag.setAttribute('content', descriptionContent);
    }, [t, config.siteName]);

    const [dynamicMinHeight, setDynamicMinHeight] = useState('calc(100vh - 192px)');

    useEffect(() => {
        const updateSize = () => {
            const newMinHeight = window.innerWidth > 1536
                ? 'calc(100vh - 285px)' // 当屏幕宽度大于1536px
                : window.innerWidth <= 768
                    ? 'calc(100vh - 128px)' // 当屏幕宽度小于或等于768px
                    : 'calc(100vh - 192px)'; // 其他情况

            setDynamicMinHeight(newMinHeight);
        };

        window.addEventListener('resize', updateSize);
        updateSize(); // 初始化

        return () => window.removeEventListener('resize', updateSize);
    }, []);



    return (
        <div class=" m-4 mt-16 sm:mt-4 md:m-12 2xl:m-24">
            <ScrollToTopButton />
            <div style={
                {
                    // backgroundImage: 'url(./images/24e34724a659216137faf607b4cb973.jpg)',
                    minHeight: dynamicMinHeight
                }} className="hero bg-base-300">
                {/* <div className="hero-overlay bg-opacity-50"></div> */}

                <div className="hero-content text-center ">
                    <div class="text-5xl font-extrabold ...">

                    </div>
                    <div className="text-base-content max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{t('hello')}</h1>

                        <p className="mb-5">{t('homeHello')}</p>
                        <button className="btn btn-primary">Get Started</button>

                    </div>
                </div>
            </div>


            <br /><br /><br />

            <div className="divider -mt-14 md:-mt-7 2xl:mt-4"></div>
            <div className="flex justify-between bg-base-200 rounded-none mt-4 md:mt-12 2xl:mt-24  items-center  p-6 md:p-12">
                <div className="text">
                    <h2 className="text-4xl font-bold ">{t('nothing')}</h2>

                </div>
                {/* <button className="btn btn-outline">About</button> */}
            </div>

            <div className="flex justify-between bg-base-100 rounded-none items-center mt-6 md:mt-12   p-6 md:p-12 border border-base-200">
                <div className="text">
                    <h1 class=" text-5xl font-bold mb-5">
                        {t('hello')}
                    </h1>
                    <h1 class="text-3xl font-bold mb-5">
                        {t('useful')}
                    </h1>
                </div>
                {/* <button className="btn btn-outline">About</button> */}
            </div>

            <div className="flex justify-between bg-base-content rounded-none  items-center mt-6 md:mt-12  p-6 md:p-12">
                <div className="text-base-300">
                    <h2 className="text-4xl font-bold "> Analyse, <br className="sm:hidden" />
                        Action, Accumulate, Anti-Fear, and Again</h2 >
                    <h2 className="text-3xl mt-6"> 解析问题 采取行动 积累经验 消除畏惧 如此反复</h2>
                </div>
                <button className="btn">About</button>
            </div>

            <div className="flex justify-between bg-base-100 rounded-none items-center mt-6 md:mt-12   p-6 md:p-12 border border-base-200">
                <div className="text">
                    <h1 class="bg-clip-text text-transparent bg-gradient-to-t from-base-content via-base-content to-base-200 text-4xl font-bold mb-5">
                        Built with React, tailwindcss, daisyUI and GitHub Pages
                    </h1>
                    <h1 class="bg-clip-text text-transparent bg-gradient-to-b from-base-content via-base-content to-base-200 text-4xl font-bold mb-5">
                        使用React、tailwindcss、daisyUI、GitHub Pages构建
                    </h1>
                </div>
                {/* <button className="btn btn-outline">About</button> */}
            </div>

            <div className="divider mt-6 md:mt-12"></div>

            <div className="m-0 mt-20 sm:mt-6 md:m-12">
                <ScrollToTopButton />
                {/* <CircularNavigation /> */}
                <div className="flex justify-center ">

                    <div class="grid  grid-cols-1 w-full sm:max-w-[700px] mr-0 md:mr-6 lg:mr-12">
                        <div className="text-3xl flex justify-center mb-4 md:mb-6">历史记录
                        </div>

                        <div className="flex bg-base-200 rounded-none  h-36 mb-12">
                            <ImageModal src="/images/bg-td-long.jpg" alt="bg-td-long" />
                            <div className="flex-grow flex justify-between items-center my-4 mr-4">
                                <div>
                                    <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                        <h2 className="card-title hover:underline mb-1 md:mb-2">Todo</h2>
                                    </a>
                                    <p>-有价值的内容!important</p>
                                    <p>-转移部署</p>
                                    <p>-优化页面</p>

                                </div>

                            </div>
                        </div>

                        <div className="flex bg-base-200 rounded-none  h-36 mb-12">
                            <ImageModal src="/images/seo.png" alt="seo" />
                            <div className="flex-grow flex justify-between items-center my-4 mr-4">
                                <div>
                                    <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                        <h2 className="card-title hover:underline mb-1 md:mb-2">SEO 优化</h2>
                                    </a>
                                    <p>-SEO 优化</p>
                                    <p>-但由于对GitHub Pages 使用了404重定向没能达成效果，等待后续其他部署</p>
                                    <p>-修复丰富内容，完成总体框架</p>
                                </div>

                            </div>
                        </div>

                        <div className="flex bg-base-200 rounded-none h-36 mb-12">

                            <ImageModal src="/images/toc-hl.png" alt="toc-hl" />
                            <div className="flex-grow flex justify-between items-center my-4 mr-4">
                                <div>
                                    <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                        <h2 className="card-title hover:underline mb-1 md:mb-2">MarkdownPage/路由优化</h2>
                                    </a>
                                    <p>-修复构建 MarkdownPage 图片路径</p>
                                    <p>-完成 MarkdownPage toc动态高亮滚动</p>
                                    <p>-修复添加路由层级，双语路由，重定向优化</p>
                                </div>

                            </div>
                        </div>

                        <div className="flex bg-base-200 rounded-none  h-36 mb-12">
                            <ImageModal src="/images/cloudf.png" alt="Cloud" />
                            <div className="flex-grow flex justify-between items-center my-4 mr-4">
                                <div>
                                    <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                        <h2 className="card-title hover:underline mb-1 md:mb-2">设置 Cloudflare</h2>
                                    </a>
                                    <p>-添加到 Cloudflare，提高国内访问速度 </p>
                                    <p>-添加 Cloudflare 相关安全措施设置</p>

                                </div>
                            </div>
                        </div>

                        <div className="flex bg-base-200 rounded-none h-36 mb-12">
                            <ImageModal src="/images/hljs.png" alt="hljs" />
                            <div className="flex-grow flex justify-between items-center my-4 mr-4">
                                <div>
                                    <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                        <h2 className="card-title hover:underline mb-1 md:mb-2">MarkdownPage</h2>
                                    </a>
                                    <p>-添加 md 文件转 MarkdownPage</p>
                                    <p>- hljs 高亮优化, 添加当前文章目录toc</p>
                                    <p>-完成响应式新样式 header/footer, ScrollToTopButton 添加 back</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-base-200 rounded-none h-36 mb-12">
                            <ImageModal src="/images/404.png" alt="404" />
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
                            <ImageModal src="/images/md-test.png" alt="md-test" />
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
                            <ImageModal src="/images/github-pages.png" alt="github-pages" />
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
                            <ImageModal src="/images/v1.png" alt="v1" />
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
                        <ul className="steps steps-vertical w-24 mt-8 -mr-4">
                            <li data-content="8" className="step h-48 ">++</li>
                            <li data-content="7" className="step h-48 step-primary">4/3</li>
                            <li data-content="6" className="step step-primary">4/2</li>
                            <li data-content="5" className="step step-primary">4/1</li>
                            <li data-content="4" className="step step-primary">3/31</li>
                            <li data-content="3" className="step step-primary">3/30</li>
                            <li data-content="2" className="step step-primary">3/29</li>
                            <li data-content="1" className="step step-primary">3/28</li><li data-content="0" className="step step-primary">3/27-</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="divider mt-6 md:mt-12"></div>
        </div >
    );
};

export default HomePage;