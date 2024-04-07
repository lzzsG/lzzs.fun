import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';
import ScrollToTopButton from '../components/ScrollToTopButton.js';
import UpdatesLog from '../components/UpdatesLog.js'


const TestPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('test')} - ${config.siteName}`;

        // 设置页面描述
        const descriptionContent = "这是lzzsSite的TestPage，用于测试各种组件";
        let descriptionMetaTag = document.querySelector('meta[name="description"]');
        if (!descriptionMetaTag) {
            descriptionMetaTag = document.createElement('meta');
            descriptionMetaTag.setAttribute('name', 'description');
            document.head.appendChild(descriptionMetaTag);
        }
        descriptionMetaTag.setAttribute('content', descriptionContent);
    }, [t, config.siteName]);

    const [selectedTab, setSelectedTab] = useState('Tab 2');

    const handleChange = (event) => {
        setSelectedTab(event.target.value);
    };

    return (
        <div className="m-6 mt-20 sm:mt-6 md:m-12">
            <ScrollToTopButton />

            {/* <CircularNavigation /> */}

            <div class="m-6 mt-20 sm:mt-6 md:m-12 flex justify-center items-center">

                <div class="grid grid-cols-1 max-w-full md:max-w-[1000px] md:gap-4">
                    这是TestPage，用于测试各种组件
                    <div className="divider mt-4"></div>

                    <UpdatesLog limit={8} />
                    <div className="divider mt-4"></div>
                    <div >
                        <article class="prose">
                            <div>
                                <section>
                                    <h2>{t('welcome')}</h2>
                                    <p>{t('mainContent')}</p>
                                    <blockquote>{t('quote')}</blockquote>
                                    <ul>
                                        {t('items', { returnObjects: true }).map((item, index) => (
                                            <li key={index}>
                                                <strong>{item.title}: </strong>
                                                {item.description}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                <section>
                                    <h2>{t('latestNews')}</h2>
                                    <ul>
                                        <li>{t('news1')}</li>
                                        <li>{t('news2')}</li>
                                    </ul>
                                </section>
                            </div>
                        </article>
                    </div>
                    <div className="divider mb-4"></div>
                    <div class="grid rid-cols-1 2xl:grid-cols-2 2xl:gap-6 ">

                        <div className="flex bg-base-300 rounded-none h-48 mb-6 md:mb-12 2xl:mb-0">
                            <figure className="flex-none py-4 pl-4 md:block">
                                <img className="hidden md:block h-40 w-40 mr-4 object-coverr" src='https://www.thebreuers.com/files/00-content/reiseberichte-usa/03-nationalparks/yosemite-np/reisebericht-yosemite-nationalpark-mirror-lake.jpg' alt="Movie" />
                            </figure>
                            <div className="flex-grow flex justify-between items-center my-4 mr-4">
                                <div>
                                    <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                        <h2 className="card-title hover:underline mb-4">{t('aboutPage')}</h2>
                                    </a>
                                    <p>{t('aboutContent')}</p>
                                    <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                                </div>
                                <div className="card-actions">
                                    <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-base-300 rounded-none h-48  mb-6 md:mb-12 2xl:mb-0">
                            <figure className="flex-none py-4 pl-4 md:block">
                                <img className="hidden md:block h-40 w-40 mr-4 object-cover" src="https://bpic.51yuansu.com/backgd/cover/00/63/09/64b52b1426fff_800.jpg?x-oss-process=image/resize,w_780/sharpen,100" alt="Movie" />
                            </figure>
                            <div className="flex-grow flex justify-between items-center my-4 mr-4">
                                <div>
                                    <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                        <h2 className="card-title hover:underline mb-4">{t('aboutPage')}</h2>
                                    </a>
                                    <p>{t('aboutContent')}</p>
                                    <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                                </div>
                                <div className="card-actions">
                                    <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="divider m-4"></div>

                    <div className="z-0">
                        <div className="collapse collapse-arrow bg-base-200 mb-4 mt-0">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                                {t('aboutPage')}
                            </div>
                            <div className="collapse-content">
                                <div className="divider m-0 mb-4"></div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-4">{t('aboutPage')}</h2>
                                </a>
                                <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                                <p>{t('aboutContent')},{t('aboutContent')}</p>  <h2>{t('aboutPage')},{t('aboutPage')}</h2>


                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200 mb-4">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                Click to open this one and close others
                            </div>
                            <div className="collapse-content">
                                <div className="divider m-0 mb-4"></div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-4">{t('aboutPage')}</h2>
                                </a>
                                <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                                <p>{t('aboutContent')},{t('aboutContent')}</p>  <h2>{t('aboutPage')},{t('aboutPage')}</h2>

                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200  mb-4">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                Click to open this one and close others
                            </div>
                            <div className="collapse-content">
                                <div className="divider m-0 mb-4"></div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-4">{t('aboutPage')}</h2>
                                </a>
                                <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                                <p>{t('aboutContent')},{t('aboutContent')}</p>

                            </div>
                        </div>

                    </div>
                    <div className="divider m-4"></div>
                    <div role="tablist" className="tabs tabs-lifted mt-24">
                        <input type="radio" name="my_tabs_2" value="Tab 1" role="tab" className="tab 
                [--tab-bg:oklch(var(--b3))]" aria-label="Tab 1" onChange={handleChange} checked={selectedTab === 'Tab 1'} />
                        <div role="tabpanel" className="tab-content bg-base-300 rounded-box p-6  border-base-300 ">
                            Tab 1  Tab 1  Tab 1
                        </div>
                        <input type="radio" name="my_tabs_2" value="Tab 2" role="tab" className="tab
                [--tab-bg:oklch(var(--b3))]" aria-label="Tab 2" onChange={handleChange} checked={selectedTab === 'Tab 2'} />
                        <div role="tabpanel" className="tab-content bg-base-300 rounded-box p-6  border-base-300 ">
                            Tab 2   Tab 2   Tab 2   Tab 2
                        </div>
                        <input type="radio" name="my_tabs_2" value="Tab 3" role="tab" className="tab
                [--tab-bg:oklch(var(--b3))]" aria-label="Tab 3" onChange={handleChange} checked={selectedTab === 'Tab 3'} />
                        <div role="tabpanel" className="tab-content bg-base-300 rounded-box p-6  border-base-300 ">
                            Tab 3 Tab 3 Tab 3 Tab 3 Tab 3
                        </div>
                    </div>
                </div>

            </div>

            <div className="divider mb-12"></div>
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
                                    <h2 className="card-title hover:underline mb-1 md:mb-2">MarkdownPage</h2>
                                </a>
                                <p>-修复构建 MarkdownPage 图片路径</p>
                                <p>-完成 MarkdownPage toc动态高亮滚动</p>
                                <p>-修复添加路由层级</p>
                            </div>

                        </div>
                    </div>

                    <div className="flex bg-base-200 rounded-none  h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src='https://www.thebreuers.com/files/00-content/reiseberichte-usa/03-nationalparks/yosemite-np/reisebericht-yosemite-nationalpark-mirror-lake.jpg' alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-2">MarkdownPage</h2>
                                </a>
                                <p>-添加到 Cloudflare，提高国内访问速度 </p>
                                <p>-添加 Cloudflare 相关安全措施设置</p>

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
                                <p>- hljs 高亮优化, 添加当前文章目录toc</p>
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
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src="/images/v1.png" alt="Movie" />
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
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src="/images/v1.png" alt="Movie" />
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
                        <li data-content="7" className="step h-48">4/3</li>
                        <li data-content="6" className="step h-48">4/2</li>
                        <li data-content="5" className="step">4/1</li>
                        <li data-content="4" className="step step-primary">3/31</li>
                        <li data-content="3" className="step step-primary">3/30</li>
                        <li data-content="2" className="step step-primary">3/29</li>
                        <li data-content="1" className="step step-primary">3/28</li><li data-content="0" className="step step-primary">3/27-</li>
                    </ul>
                </div>
            </div>

            <div className="divider m-0"></div>
        </div>
    )
};

export default TestPage;