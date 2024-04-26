import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';




const TempPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('Temp')} - ${config.siteName}`;
    })

    return (
        <div className="m-10 sm:m-6 ">

        </div>
    )
};

export default TempPage;