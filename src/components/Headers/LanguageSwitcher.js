import React from 'react';
import { ReactComponent as TranslateIcon } from '../../assets/svg/trasnlate.svg';

const LanguageSwitcher = ({ toggleLanguage, currentLang }) => {
    return (
        <div className="bg-base-300 -translate-y-0.5">
            <button className="text-base btn h-24 w-24 btn-sm btn-ghost translate-y-0.5" onClick={toggleLanguage}>
                <div className="flex items-center">
                    <TranslateIcon className="-ml-0.5 mx-0.5" />
                    {currentLang === 'en' ? '中文' : 'English'}
                </div>
            </button>
        </div>
    );
};

export default LanguageSwitcher;
