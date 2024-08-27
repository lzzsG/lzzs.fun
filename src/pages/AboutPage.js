// src/pages/AboutPage.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';
import ScrollToTopButton from '../components/ScrollToTopButton.js';

const AboutPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('about')} - ${config.siteName}`;

        // 设置页面描述
        const descriptionContent = "这是lzzsSite的AboutPage";
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
            <div class="grid grid-cols-1 max-w-full md:max-w-[1200px] md:gap-4">
                <ScrollToTopButton />
                {/* <CircularNavigation /> */}

                <div className="flex bg-base-200 rounded-none mt-4 md:mt-12 2xl:mt-24 justify-between items-center  p-6 md:p-12">
                    <div className="text">
                        <h2 className="text-4xl font-bold ">{t('nothing')}</h2>
                        {/* <div>Re:Zero − Starting Life in Computer Science, Graduated from Bioengineering</div> */}
                    </div>
                    {/* <button className="btn btn-outline">About</button> */}
                </div>
            </div>
        </div>
    )
};

export default AboutPage;