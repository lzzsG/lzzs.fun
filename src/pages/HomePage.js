// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';
import ScrollToTopButton from '../components/ScrollToTopButton.js';

const HomePage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('home')} - ${config.siteName}`;
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

                <div className="hero-content text-center text-base-content">

                    <div className="max-w-md">
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
                    <h2 className="text-4xl font-bold ">{t('hello')}</h2>
                    <h2 className="text-3xl mt-6">
                        {t('useful')}</h2>
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

            <div className="divider mt-6 md:mt-12"></div>

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


        </div >
    );
};

export default HomePage;