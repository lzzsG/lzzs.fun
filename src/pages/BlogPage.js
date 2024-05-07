// BlogPage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';
import UpdatesLog from '../components/UpdatesLog.js'
import { ReactComponent as LinkIcon } from '../assets/svg/link.svg';
import { useLocation } from 'react-router-dom';

const BlogPage = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    const location = useLocation();
    console.log("Current language:", i18n.language);


    useEffect(() => {
        document.title = `${t('blog')} - ${config.siteName}`;

        // 设置页面描述
        const descriptionContent = "这是lzzsSite的BlogPage";
        let descriptionMetaTag = document.querySelector('meta[name="description"]');
        if (!descriptionMetaTag) {
            descriptionMetaTag = document.createElement('meta');
            descriptionMetaTag.setAttribute('name', 'description');
            document.head.appendChild(descriptionMetaTag);
        }
        descriptionMetaTag.setAttribute('content', descriptionContent);
    }, [t, config.siteName]);

    useEffect(() => {
        const hash = window.location.hash;

        // 如果有锚点，滚动到对应元素
        if (hash) {
            const targetElement = document.getElementById(hash.substring(1));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);  // 没有锚点时滚动到页面顶部
        }
    }, [location]);

    return (
        <div class="m-6 mt-20 sm:mt-6 md:m-12 flex justify-center items-center">


            <div class="grid grid-cols-1 md:grid-cols-2 max-w-full md:max-w-[1200px] md:gap-4">
                {/* 项目展示 */}
                <h2 className="text-xl md:col-span-2 m-0 font-semibold text-base-content">{t('projectBlog')}
                    <Link to="/zh/blog" className="text-accent-content text-base hover:underline ml-2"><div className="tooltip" data-tip="暂时还没">  {t('more')}</div>
                    </Link></h2>

                {/* all-to-mdbooks */}
                <div className="flex bg-base-200 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <div className="flex">
                                <LinkIcon className="size-4 mr-1 translate-y-1.5" />
                                <a href='https://github.com/lzzsG/all-to-mdbook' target="_blank" rel="noopener noreferrer">
                                    <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">All To Mdbook</h3>
                                </a>
                            </div>
                            <p className="overflow-hidden line-clamp-2">
                                {t('alltoMDAbout')}

                            </p>
                        </div>
                    </div>
                </div>

                {/* lzzsg.github.io */}
                <div className="flex bg-base-200 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <div className="flex">
                                <LinkIcon className="size-4 mr-1 translate-y-1.5" />
                                <a href='https://github.com/lzzsG/lzzsg.github.io' target="_blank" rel="noopener noreferrer">
                                    <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">lzzsg.github.io(lzzs.fun)
                                    </h3>
                                </a>
                            </div>
                            <p className="overflow-hidden line-clamp-2">
                                {t('lzzsfunAbout')}
                            </p>
                        </div>
                    </div>
                </div>



                <div className="divider md:col-span-2 m-0 "></div>
                {/* 系列文章 */}
                <h2 className="text-xl md:col-span-2 m-0 font-semibold text-base-content">{t('seriesArticles')}
                    <Link to="/zh/blog" className="text-accent-content text-base hover:underline ml-2">
                        <div className="tooltip" data-tip="暂时还没">  {t('more')}</div>
                    </Link></h2>

                {/* 左边系列 */}
                <div className="z-10 ">
                    {/* 裸机编程系列 */}
                    <div className="collapse collapse-arrow bg-base-200 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            {i18n.t('bareMetal')}
                        </div>
                        {/* <div className="absolute top-[20px] right-[48px] text-sm text-gray-400">2024-04</div> */}
                        <div className="collapse-content m-0">
                            <div className="divider -translate-y-1 m-0 mb-1"></div>
                            <ul class="list-disc list-inside">
                                <Link to={`/${currentLang}/blog/bare-metal/0-About-bare-metal-programming`}>
                                    <li class="text-base mb-2 hover:underline">{i18n.t('bareMetal.0-About-bare-metal-programming.title')}</li>
                                </Link>
                                <Link to={`/${currentLang}/blog/bare-metal/1-Development-environment-setup`}>
                                    <li class="text-base mb-2 hover:underline">{i18n.t('bareMetal.1-Development-environment-setup.title')}</li>
                                </Link>
                                <Link to={`/${currentLang}/blog/bare-metal/2-Create-project`}>
                                    <li class="text-base mb-2 hover:underline">{i18n.t('bareMetal.2-Create-project.title')}</li>
                                </Link>
                                <Link to={`/${currentLang}/blog/bare-metal/3-Writing-boot-code`}>
                                    <li class="text-base mb-2 hover:underline">{i18n.t('bareMetal.3-Writing-boot-code.title')}</li>
                                </Link>
                                <Link to={`/${currentLang}/blog/bare-metal/4-Writing-the-main-program`}>
                                    <li class="text-base mb-2 hover:underline">{i18n.t('bareMetal.4-Writing-the-main-program.title')}</li>
                                </Link>
                                <Link to={`/${currentLang}/blog/bare-metal/4½-Supplement-for-the-main-program-of-operating-systems`}>
                                    <li class="text-base mb-2 hover:underline">
                                        {i18n.t('bareMetal.4½-Supplement-for-the-main-program-of-operating-systems.title')}</li>
                                </Link>

                                <Link to={`/${currentLang}/blog/bare-metal/5-Compiling-code`}>
                                    <li class="text-base mb-2 hover:underline">{i18n.t('bareMetal.5-Compiling-code.title')}</li>
                                </Link>
                                <Link to={`/${currentLang}/blog/bare-metal/6-Linking-code`}>
                                    <li class="text-base mb-2 hover:underline">{i18n.t('bareMetal.6-Linking-code.title')}</li>
                                </Link>
                                <Link to={`/${currentLang}/blog/bare-metal/7-Generating-image-files`}>
                                    <li class="text-base mb-2 hover:underline">{i18n.t('bareMetal.7-Generating-image-files.title')}</li>
                                </Link>
                                <Link to={`/${currentLang}/blog/bare-metal/8-Running-on-the-target-platform`}>
                                    <li class="text-base mb-2 hover:underline">{i18n.t('bareMetal.8-Running-on-the-target-platform.title')}</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    {/* 占位 */}
                    <div className="collapse collapse-arrow bg-base-200 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            {t('ClickToOpen')}
                        </div>
                        <div className="collapse-content m-0">
                            <div className="divider -translate-y-1 m-0 mb-1"></div>
                            <ul class="list-decimal list-inside">
                                <Link to={`/${currentLang}/blog/markdown-test`}>
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to={`/${currentLang}/blog/markdown-test`}>
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* 右边系列 */}
                <div className="z-0 ">
                    {/* MITseries */}
                    <div className="collapse collapse-arrow bg-base-200 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-1" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            {t('MITseries')}
                        </div>
                        <div className="collapse-content m-0">
                            <div className="divider -translate-y-1 m-0 mb-1"></div>
                            <ul class="list-decimal list-inside">
                                {/* MIT-digital-systems */}
                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <a href='https://lzzs.fun/MIT-digital-systems/' target="_blank" rel="noopener noreferrer">
                                        <li className="text-base mb-1 hover:underline">
                                            MIT Digital Systems Design ({t('ing')})</li>
                                    </a>
                                </div>
                                <p className="overflow-hidden mb-1 line-clamp-2">{t('MITAbout')}
                                </p>
                                <div className="divider"></div>

                                {/* mit6.175-labs-instruction */}
                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <a href='https://lzzs.fun/mit6.175-labs-instruction/' target="_blank" rel="noopener noreferrer">
                                        <li className="text-base mb-1 hover:underline">
                                            MIT6.175 Labs Instruction</li>
                                    </a>
                                </div>
                                <p className="overflow-hidden mb-1 line-clamp-2">{t('175LabInsAbout')}  <a className="hover:underline" href='https://lzzs.fun/6.175-labs-instruction/' target="_blank" rel="noopener noreferrer"> "BSV highlighted version" </a>
                                </p>
                                <div className="divider"></div>

                                {/* Labs */}
                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <a href='https://github.com/lzzsG/MIT-digital-systems-design-series-labs' target="_blank" rel="noopener noreferrer">
                                        <li className="text-base mb-1 hover:underline">
                                            MIT Digital Systems Design Series Labs ({t('ing')})</li>
                                    </a>
                                </div>
                                <p className="overflow-hidden mb-1 line-clamp-2">{t('MITlabsAbout')}
                                </p>



                            </ul>
                        </div>
                    </div>
                    {/* rust/mdbook */}
                    <div className="collapse collapse-arrow bg-base-200 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-1" />
                        <div className="collapse-title text-xl font-medium">
                            {t('MdbookSeries')}
                        </div>
                        <div className="collapse-content m-0">
                            <div className="divider -translate-y-1 m-0 mb-1"></div>
                            <ul class="list-decimal list-inside">
                                {/* rustlings-notebook */}
                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <a href='https://lzzs.fun/rustlings-notebook/' target="_blank" rel="noopener noreferrer">
                                        <li className="text-base mb-1 hover:underline">
                                            rustlings-notebook</li>
                                    </a>
                                </div>
                                <p className="overflow-hidden mb-1 line-clamp-2"> {t('rustlingsAbout')}
                                </p>


                                <div className="divider"></div>

                                {/* Tsinghua-OS-mdbook */}
                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <a href='https://lzzs.fun/Tsinghua-OS-mdbook/' target="_blank" rel="noopener noreferrer">
                                        <li className="text-base mb-1 hover:underline">
                                            Tsinghua-OS-mdbook
                                        </li>
                                    </a>
                                </div>

                                <p className="overflow-hidden mb-1 line-clamp-2">
                                    {t('thpptAbout')}
                                </p>
                                <div className="divider"></div>


                                {/* Tsinghua-OS-mdbook */}
                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <a href='https://lzzs.fun/rustlings-notebook/final/std.html' target="_blank" rel="noopener noreferrer">
                                        <li className="text-base mb-1 hover:underline">
                                            {t('Ruststd')}
                                        </li>
                                    </a>
                                </div>

                                <p className="overflow-hidden mb-1 line-clamp-2">
                                    <Link to={`/${currentLang}/d3`}>
                                        <p class="text-base hover:underline">
                                            {t('RustSankey')}
                                        </p>
                                    </Link>
                                </p>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="divider md:col-span-2 m-0 "></div>

                {/* 博客文章 */}
                <h2 className="text-xl md:col-span-2 m-0 font-semibold text-base-content">{t('singleBlog')}
                    <Link to="/zh/blog" className="text-accent-content text-base hover:underline ml-2"><div className="tooltip" data-tip="暂时还没">  {t('more')}</div>
                    </Link></h2>
                {/* Markdown 排版 */}
                <div className="flex bg-base-200 h-28 mb-2 md:mb-0">
                    <div className="flex-grow  flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/markdown-test`}>
                                <div className="flex-grow flex justify-between items-center">
                                    <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('WhatToOut.title')}</h3>
                                    <div className="mb-2 text-sm text-gray-400 mr-2">2024-04-02</div>
                                </div>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('WhatToOut.description')}</p>
                        </div>
                        <div className="card-actions">
                            {/* <button className="btn size-16 ml-4 btn-ghost">Watch</button> */}
                        </div>
                    </div>
                </div>
                {/* [裸机编程系列] - 0 关于裸机编程 */}
                <div className="flex bg-base-200 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div >
                            <Link to={`/${currentLang}/blog/bare-metal/0-About-bare-metal-programming`}>
                                <div className="flex-grow flex justify-between items-center">
                                    <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('bareMetal.0-About-bare-metal-programming.title')}</h3>
                                    <div className="mb-2 text-sm text-gray-400 mr-2">2024-04-06</div>
                                </div>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('bareMetal.0-About-bare-metal-programming.description')}</p>
                        </div>
                    </div>
                </div>
                {/* learning */}
                <div className="flex bg-base-200 h-28 mb-2 md:mb-0">
                    <div className="flex-grow  flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/learning`}>
                                <div className="flex-grow flex justify-between items-center">
                                    <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('learning.title')}</h3>
                                    <div className="mb-2 text-sm text-gray-400 mr-2">2024-04-28</div>
                                </div>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('learning.description')}</p>
                        </div>
                        <div className="card-actions">
                            {/* <button className="btn size-16 ml-4 btn-ghost">Watch</button> */}
                        </div>
                    </div>
                </div>
                {/* 5A */}
                <div className="flex bg-base-200 h-28 mb-2 md:mb-0">
                    <div className="flex-grow  flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/5A`}>
                                <div className="flex-grow flex justify-between items-center">
                                    <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('5A.title')}</h3>
                                    <div className="mb-2 text-sm text-gray-400 mr-2">2024-04-28</div>
                                </div>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('5A.description')}</p>
                        </div>
                        <div className="card-actions">
                            {/* <button className="btn size-16 ml-4 btn-ghost">Watch</button> */}
                        </div>
                    </div>
                </div>



                <div className="divider md:col-span-2 m-0 "></div>
                <div className="md:col-span-2">
                    <UpdatesLog filterType="blogAddition" limit={6} /></div>
            </div>
        </div >
    );
};

export default BlogPage;
