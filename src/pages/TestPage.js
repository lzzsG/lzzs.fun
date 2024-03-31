// src/pages/AboutPage.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';
import ScrollToTopButton from '../components/ScrollToTopButton.js';
import { marked } from 'marked';

const AboutPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('about')} - ${config.siteName}`;
    }, [t, config.siteName]);

    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch('./md/WhatToOut.md')
            .then(response => response.text())
            .then(text => {
                const html = marked.parse(text);
                setMarkdown(html);
            });
    }, []);

    return (
        <div className="m-6 md:m-12">


            <ScrollToTopButton />
            {/* <CircularNavigation /> */}
            <div className="flex justify-center ">

                <div class="grid  grid-cols-1 w-full xl:max-w-[800px] md:max-w-[600px] mr-2 md:mr-6 lg:mr-12">

                    <div className="flex bg-base-300 rounded-none   h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src='https://www.thebreuers.com/files/00-content/reiseberichte-usa/03-nationalparks/yosemite-np/reisebericht-yosemite-nationalpark-mirror-lake.jpg' alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-4">{t('aboutPage')}</h2>
                                </a>
                                <p>{t('aboutContent')}</p>
                                <h2>{t('aboutPage')},{t('aboutPage')}48648</h2>
                            </div>

                        </div>
                    </div>

                    <div className="flex bg-base-300 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src="https://bpic.51yuansu.com/backgd/cover/00/63/09/64b52b1426fff_800.jpg?x-oss-process=image/resize,w_780/sharpen,100" alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-4">{t('aboutPage')}</h2>
                                </a>
                                <p>{t('aboutContent')}</p>
                                <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                            </div>

                        </div>
                    </div>

                    <div className="flex bg-base-300 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src='https://www.thebreuers.com/files/00-content/reiseberichte-usa/03-nationalparks/yosemite-np/reisebericht-yosemite-nationalpark-mirror-lake.jpg' alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-4">{t('aboutPage')}</h2>
                                </a>
                                <p>{t('aboutContent')}</p>
                                <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                            </div>

                        </div>
                    </div>

                    <div className="flex bg-base-300 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src="https://bpic.51yuansu.com/backgd/cover/00/63/09/64b52b1426fff_800.jpg?x-oss-process=image/resize,w_780/sharpen,100" alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-4">{t('aboutPage')}</h2>
                                </a>
                                <p>{t('aboutContent')}</p>
                                <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                            </div>

                        </div>
                    </div>
                    <div className="flex bg-base-300 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src='https://www.thebreuers.com/files/00-content/reiseberichte-usa/03-nationalparks/yosemite-np/reisebericht-yosemite-nationalpark-mirror-lake.jpg' alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-4">{t('aboutPage')}</h2>
                                </a>
                                <p>{t('aboutContent')}</p>
                                <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                            </div>

                        </div>
                    </div>

                    <div className="flex bg-base-300 rounded-none h-36 mb-12">
                        <figure className="flex-none py-4 pl-4 md:block">
                            <img className="hidden md:block h-28 w-40 mr-4 object-cover" src="https://bpic.51yuansu.com/backgd/cover/00/63/09/64b52b1426fff_800.jpg?x-oss-process=image/resize,w_780/sharpen,100" alt="Movie" />
                        </figure>
                        <div className="flex-grow flex justify-between items-center my-4 mr-4">
                            <div>
                                <a className="https" href="https://lzzs.fun" target="_blank" rel="noopener noreferrer">
                                    <h2 className="card-title hover:underline mb-1 md:mb-4">{t('aboutPage')}</h2>
                                </a>
                                <p>{t('aboutContent')}</p>
                                <h2>{t('aboutPage')},{t('aboutPage')}</h2>
                            </div>

                        </div>
                    </div>


                </div>
                <div>
                    <ul className="steps steps-vertical w-24 -mt-6 -mr-6">
                        <li data-content="15" className="step step-primary h-48">3/30</li>
                        <li className="step step-primary">3/30</li>
                        <li className="step">3/30</li>
                        <li data-content="1" className="step">3/30</li>
                        <li className="step">3/30</li>
                        <li data-content="1" className="step">3/30</li>

                    </ul>
                </div>
            </div>

            <div class="mt-12 md:mt-48 flex justify-center ">

                <article class="prose prose-slate max-w-full lg:prose-xl max-w-[800px]">
                    <div dangerouslySetInnerHTML={{ __html: markdown }} />
                </article>
            </div>



        </div>

    )
};

export default AboutPage;