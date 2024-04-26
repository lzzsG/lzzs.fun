import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../config/config.js';
import SankeyChart from '../components/D3Sankey.js';
import data from '../assets/d3/data.json';


const D3Page = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = `${t('Rust Sankey')} - ${config.siteName}`;
    })

    return (
        <div className="mt-20">
            <div class="flex justify-center items-center">
                <SankeyChart data={data} />
            </div>
        </div >
    )
};

export default D3Page;