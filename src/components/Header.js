// src/components/Header.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher'

import { ReactComponent as TranslateIcon } from '../assets/svg/trasnlate.svg';
import { ReactComponent as HomeIcon } from '../assets/svg/home.svg';
import { ReactComponent as AboutIcon } from '../assets/svg/about.svg';
import { ReactComponent as RustIcon } from '../assets/svg/rust.svg';

const Header = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const location = useLocation();

    // 判断当前选中的导航项
    const isActive = (path) => location.pathname === path;

    const toggleLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'zh' : 'en';
        i18n.changeLanguage(newLanguage);
    };

    return (
        <header className="flex justify-between  items-center z-40">
            <div className="navbar bg-base-300 rounded-none h-24 p-0">
                <div className="navbar-start flex">
                    <div className="dropdown  h-24">
                        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-base-100 w-20 h-20 m-2 flex items-center md:hidden p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content  shadow  w-24  bg-base-300">
                            <Link to="/">
                                <button className={`text-base btn h-20 w-20 btn-sm btn-ghost hover:bg-base-100 ${isActive('/') ? 'bg-base-100' : ''}`}>
                                    <div className="flex items-center">
                                        <HomeIcon className="-ml-0.5 mx-0.5" />
                                        {t('home')}
                                    </div>
                                </button>
                            </Link>
                            <Link to="/about">
                                <button className={`text-base btn h-20 w-20 mt-2 btn-sm btn-ghost hover:bg-base-100 ${isActive('/about') ? 'bg-base-100' : ''}`}>
                                    <div className="flex items-center">
                                        <AboutIcon className="-ml-0.5 mx-0.5" />
                                        {t('about')}
                                    </div>
                                </button>
                            </Link>


                        </ul>
                    </div>
                    <Link to="/">
                        <div className="justify-center items-center flex h-24 w-48">
                            <RustIcon className="hidden md:flex px-6 -ml-5 w-24 h-24" />
                            <a className="text-lg font-bold w-24 -ml-5 h-24 flex justify-center items-center">{t('siteName')}</a>
                        </div>
                    </Link>
                    <div className=" hidden md:flex">

                        <Link to="/">
                            <button className={`text-base btn h-24 w-24 btn-sm btn-ghost hover:bg-base-100 ${isActive('/') ? 'bg-base-100' : ''}`}>
                                <div className="flex items-center">
                                    <HomeIcon className="-ml-0.5 mx-0.5" />
                                    {t('home')}
                                </div>
                            </button>
                        </Link>
                        <Link to="/about">
                            <button className={`text-base btn h-24 w-24 btn-sm btn-ghost hover:bg-base-100 ${isActive('/about') ? 'bg-base-100' : ''}`}>
                                <div className="flex items-center">
                                    <AboutIcon className="-ml-0.5 mx-0.5" />
                                    {t('about')}
                                </div>
                            </button>
                        </Link>

                    </div>

                </div>
                <div className="navbar-end ">

                    <div className="bg-base-300">
                        <button className="text-base btn h-24 w-24 btn-sm 
                            btn-ghost" onClick={toggleLanguage}>
                            <div className="flex items-center">
                                <TranslateIcon className="-ml-0.5 mx-0.5" />
                                {i18n.language === 'en' ? '中文' : 'English'}
                            </div>
                        </button>
                    </div>
                    <ThemeSwitcher />

                </div>
            </div>

        </header>
    );
};

export default Header;
