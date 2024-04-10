// BlogPage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';
import UpdatesLog from '../components/UpdatesLog.js'
import { ReactComponent as LinkIcon } from '../assets/svg/link.svg';

const BlogPage = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
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

    return (
        <div class="m-6 mt-20 sm:mt-6 md:m-12 flex justify-center items-center">

            <div class="grid grid-cols-1 md:grid-cols-2 max-w-full md:max-w-[1200px] md:gap-4">
                <h2 className="text-xl md:col-span-2 m-0 font-semibold text-base-content">{t('singleBlog')}
                    <Link to="/zh/blog" className="text-accent-content text-base hover:underline ml-2"><div className="tooltip" data-tip="暂时还没">  {t('more')}</div>

                    </Link></h2>
                <div className="flex bg-base-200 h-28 mb-2 md:mb-0">
                    <div className="flex-grow  flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/markdown-test`}>
                                <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('WhatToOut.title')}</h3>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('WhatToOut.description')}</p>
                        </div>
                        <div className="card-actions">
                            {/* <button className="btn size-16 ml-4 btn-ghost">Watch</button> */}
                        </div>
                    </div>
                </div>
                <div className="flex bg-base-200 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/bare-metal/0-About-bare-metal-programming`}>
                                <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('bareMetal.0-About-bare-metal-programming.title')}</h3>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('bareMetal.0-About-bare-metal-programming.description')}</p>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <div className="flex">
                                <LinkIcon className="size-4 mr-1 translate-y-1.5" />
                                <Link to='https://github.com/lzzsG/all-to-mdbook'>
                                    <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">all-to-mdbook</h3>
                                </Link>
                            </div>
                            <p className="overflow-hidden line-clamp-2">本仓库旨在提供一种自动化的方式来部署包含 Markdown 文件结构的仓库到 mdBook。利用 GitHub Actions，它能够自动识别指定仓库中的 Markdown 文件，并生成相应的 mdBook。此外，它支持自定义配置，如目标仓库链接、忽略特定文件夹、启用自然排序等，使得生成的书籍结构更加合理和美观。
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <div className="flex">
                                <LinkIcon className="size-4 mr-1 translate-y-1.5" />
                                <Link to='https://lzzs.fun/zh'>
                                    <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">lzzsg.github.io(lzzs.fun)
                                    </h3>
                                </Link>
                            </div>
                            <p className="overflow-hidden line-clamp-2">本站源码，未来可能会做一个静态网站系列，虽然作者很业余。
                            </p>
                        </div>
                    </div>
                </div>



                <div className="divider md:col-span-2 m-0 "></div>
                <h2 className="text-xl md:col-span-2 m-0 font-semibold text-base-content">{t('seriesArticles')}
                    <Link to="/zh/blog" className="text-accent-content text-base hover:underline ml-2">
                        <div className="tooltip" data-tip="暂时还没">  {t('more')}</div>
                    </Link></h2>
                <div className="z-10 ">
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
                                <Link to={`/${currentLang}/blog/bare-metal/4½-Supplement-for-the-main-program-of-operating-systems`}>
                                    <li class="text-base mb-2 hover:underline">
                                        。。。(进行中) 。。。</li>
                                </Link>
                            </ul>
                        </div>
                    </div>

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
                <div className="z-0 ">

                    <div className="collapse collapse-arrow bg-base-200 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-1" />
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
                                <Link to={`/${currentLang}/blog/markdown-test`}>
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to={`/${currentLang}/blog/markdown-test`}>
                                    <li className="text-base hover:underline ">{t('aboutPage')}</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-1" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            Mdbook Series
                        </div>
                        <div className="collapse-content m-0">
                            <div className="divider -translate-y-1 m-0 mb-1"></div>
                            <ul class="list-decimal list-inside">

                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <Link to='https://lzzs.fun/rustlings-notebook/'>
                                        <li className="text-base mb-0.5 hover:underline">
                                            rustlings-notebook (进行中)</li>
                                    </Link>
                                </div>
                                <p className="overflow-hidden mb-3 line-clamp-2">rustlings 110题版本的解答和扩展mdbook。
                                </p>

                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <Link to='https://lzzs.fun/Tsinghua-OS-mdbook/'>
                                        <li className="text-base mb-0.5 hover:underline">
                                            Tsinghua-OS-mdbook (待调整)</li>
                                    </Link>
                                </div>
                                <p className="overflow-hidden mb-3 line-clamp-2">清华操作系统幻灯片 mdbook 版
                                </p>

                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <Link to='https://lzzs.fun/mit-note/'>
                                        <li className="text-base mb-0.5 hover:underline">
                                            MIT-note (进行中)</li>
                                    </Link>
                                </div>
                                <p className="overflow-hidden mb-3 line-clamp-2">MIT电子工程和计算机科学课程 (6.004计算结构、6.175微电子器件设计、6.375微电子器件制造)
                                </p>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="divider md:col-span-2 m-0 "></div>
                <div className="md:col-span-2">
                    <UpdatesLog filterType="blogAddition" /></div>
            </div>
        </div >
    );
};

export default BlogPage;
