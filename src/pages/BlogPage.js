// BlogPage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';

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
                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
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

                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/bare-metal/0-About-bare-metal-programming`}>
                                <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('bareMetal.0-About-bare-metal-programming.title')}</h3>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('bareMetal.0-About-bare-metal-programming.description')}</p>
                        </div>
                    </div>
                </div>
                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/bare-metal/1-Development-environment-setup`}>
                                <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('bareMetal.1-Development-environment-setup.title')}</h3>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('bareMetal.1-Development-environment-setup.description')}</p>
                        </div>
                    </div>
                </div>
                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/bare-metal/2-Create-project`}>
                                <h3 className="text-lg overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('bareMetal.2-Create-project.title')}</h3>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('bareMetal.2-Create-project.description')}</p>
                        </div>
                    </div>
                </div>
                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/bare-metal/3-Writing-boot-code`}>
                                <h3 className="text-xl overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('bareMetal.3-Writing-boot-code.title')}</h3>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('bareMetal.3-Writing-boot-code.description')}</p>
                        </div>
                    </div>
                </div>
                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/bare-metal/3-Writing-boot-code`}>
                                <h3 className="text-xl overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('bareMetal.3-Writing-boot-code.title')}</h3>
                            </Link>
                            <p className="overflow-hidden line-clamp-2">{i18n.t('bareMetal.3-Writing-boot-code.description')}</p>
                        </div>
                    </div>
                </div>



                {/* <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to={`/${currentLang}/blog/markdown-test`}>
                                <h3 className="text-xl hover:underline mb-2">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>

                    </div>
                </div> */}

                <div className="z-0 ">

                    <div className="collapse collapse-arrow bg-base-300 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            {i18n.t('bareMetal')}
                        </div>
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
                            </ul>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-300 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Click to open this one and close others
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

                    <div className="collapse collapse-arrow bg-base-300 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Click to open this one and close others
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
                    <div className="collapse collapse-arrow bg-base-300 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Click to open this one and close others
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
                </div>
                <div className="z-0 ">

                    <div className="collapse collapse-arrow bg-base-300 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Click to open this one and close others
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
                    <div className="collapse collapse-arrow bg-base-300 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Click to open this one and close others
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
                    <div className="collapse collapse-arrow bg-base-300 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Click to open this one and close others
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

                    <div className="collapse collapse-arrow bg-base-300 mb-2 md:mb-4">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Click to open this one and close others
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
                </div>
            </div>
        </div >
    );
};

export default BlogPage;
