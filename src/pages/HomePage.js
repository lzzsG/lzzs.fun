// src/pages/HomePage.js
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as TranslateIcon } from '../assets/svg/trasnlate.svg';
import { ReactComponent as HomeIcon } from '../assets/svg/home.svg';
import { ReactComponent as AboutIcon } from '../assets/svg/about.svg';
import { ReactComponent as RustIcon } from '../assets/svg/rust.svg';

const HomePage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div>


            <br />
            <br />
            <br />
            <div class="min-h-12">
                <p>{t('homePage')}</p>
                <p>{t('homeContent')}</p>
            </div>
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

        </div>
    );
};

export default HomePage;