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
                                <a href='https://github.com/lzzsG/all-to-mdbook' target="_blank" rel="noopener noreferrer">
                                    <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">all-to-mdbook</h3>
                                </a>
                            </div>
                            <p className="overflow-hidden line-clamp-2">
                                {t('alltoMDAbout')}

                            </p>
                        </div>
                    </div>
                </div>

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

                                <li class="text-base mb-2 hover:underline">
                                    5 。。。({t('ing')}) 。。。</li>
                                <li class="text-base mb-2 hover:underline">
                                    6 。。。 。。。</li>
                                <li class="text-base mb-2 hover:underline">
                                    7 。。。 。。。</li>
                                <li class="text-base mb-2 hover:underline">
                                    8 。。。 。。。</li>
                                <li class="text-base mb-2 hover:underline">
                                    。。。 。。。</li>
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
                            {t('MdbookSeries')}
                        </div>
                        <div className="collapse-content m-0">
                            <div className="divider -translate-y-1 m-0 mb-1"></div>
                            <ul class="list-decimal list-inside">

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
                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <a href='https://lzzs.fun/MIT-digital-systems-notebook/' target="_blank" rel="noopener noreferrer">
                                        <li className="text-base mb-1 hover:underline">
                                            MIT-digital-systems-notebook ({t('ing')})</li>
                                    </a>
                                </div>
                                <p className="overflow-hidden mb-1 line-clamp-2">{t('MITAbout')}
                                </p>
                                <div className="divider"></div>
                                <div className="flex">
                                    <LinkIcon className="size-4 mr-1 translate-y-1" />
                                    <a href='https://lzzs.fun/mit6.175-labs-instruction/' target="_blank" rel="noopener noreferrer">
                                        <li className="text-base mb-1 hover:underline">
                                            mit6.175-labs-instruction</li>
                                    </a>
                                </div>
                                <p className="overflow-hidden mb-1 line-clamp-2">{t('175LabInsAbout')}
                                </p>
                                <div className="divider"></div>


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
