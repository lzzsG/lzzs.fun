// BlogPage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';

const BlogPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('blog')} - ${config.siteName}`;
    }, [t, config.siteName]);

    return (
        <div class="m-6 mt-20 sm:mt-6 md:m-12  2xl:m-24">
            <div class="grid  grid-cols-1 md:grid-cols-2 md:gap-12">
                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">WhatToOut.md</h3>
                            </Link>
                            <p>What to expect from here on out</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>


                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-200 rounded-none h-24 mb-6 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/markdown1">
                                <h3 className="card-title hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn size-16 ml-4 btn-ghost">Watch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BlogPage;
