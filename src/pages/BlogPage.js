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
        <div class="m-6 mt-20 sm:mt-6 md:m-12 flex justify-center items-center">
            <div class="grid grid-cols-1 md:grid-cols-2 max-w-full md:max-w-[1200px] md:gap-4">
                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow  flex justify-between items-center m-4">
                        <div>
                            <Link to="/blog/markdown1">
                                <h3 className="text-xl hover:underline mb-4">WhatToOut.md</h3>
                            </Link>
                            <p>What to expect from here on out</p>
                        </div>
                        <div className="card-actions">
                            {/* <button className="btn size-16 ml-4 btn-ghost">Watch</button> */}
                        </div>
                    </div>
                </div>

                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/blog/os-test">
                                <h3 className="text-xl hover:underline mb-4">os-test</h3>
                            </Link>
                            <p>/blog/os-test</p>
                        </div>

                    </div>
                </div>

                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/blog/markdown1">
                                <h3 className="text-xl hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>

                    </div>
                </div>

                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/blog/markdown1">
                                <h3 className="text-xl hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>

                    </div>
                </div>

                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/blog/markdown1">
                                <h3 className="text-xl hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
                        </div>

                    </div>
                </div>

                <div className="flex bg-base-300 h-28 mb-2 md:mb-0">
                    <div className="flex-grow flex justify-between items-center m-4">
                        <div>
                            <Link to="/blog/markdown1">
                                <h3 className="text-xl hover:underline mb-4">{t('aboutPage')}</h3>
                            </Link>
                            <p>{t('aboutContent')}</p>
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>

                                <Link to="/blog/markdown1">
                                    <li className="text-base mb-2 hover:underline">{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
                                    <li className="text-base hover:underline mb-2">{t('aboutPage')},{t('aboutPage')},{t('aboutPage')}</li>
                                </Link>
                                <Link to="/blog/markdown1">
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
