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
                {t('about')}
            </div>
        </div>
    )
};

export default AboutPage;