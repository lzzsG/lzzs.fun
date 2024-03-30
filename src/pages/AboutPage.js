// src/pages/AboutPage.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import backgroundImage from '../assets/images/bg-td-long.jpg';
import CircularNavigation from '../components/CircularNavigation';
import config from '../config/config.js';
import ScrollToTopButton from '../components/ScrollToTopButton.js';

const AboutPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('about')} - ${config.siteName}`;
    }, [t, config.siteName]);

    const [selectedTab, setSelectedTab] = useState('Tab 2');

    const handleChange = (event) => {
        setSelectedTab(event.target.value);
    };
    return (
        <div className="m-6  md:m-12  2xl:m-24">
            <ScrollToTopButton />
            {/* <CircularNavigation /> */}

            <div class="grid  grid-cols-1 2xl:grid-cols-2 2xl:gap-12">

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

                <div className="flex bg-base-300 rounded-none h-48 ">
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


            <div className="z-0">
                <div className="collapse collapse-arrow bg-base-200 mb-4 mt-12">
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
    )
};

export default AboutPage;