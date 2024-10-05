import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import RecursiveBoxes from '../iconBox.js';
import SmallNavBar from './SmallNavBar';
import NavbarDropdown from './NavbarDropdown';
import NavbarLinks from './NavbarLinks';
import LanguageSwitcher from './LanguageSwitcher';
import { ReactComponent as GithubIcon } from '../../assets/svg/github.svg';

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [theme, setTheme] = useState('default');
    const [showNav, setShowNav] = useState(window.innerWidth <= 640);
    let navigate = useNavigate();

    // 获取当前语言
    const currentLang = i18n.language;

    // 判断当前选中的导航项
    const isActive = (path) => {
        const currentPath = location.pathname;
        const fullPath = currentLang === 'en' ? `/en${path}` : path;
        return currentPath === fullPath;
    };

    // 切换语言的逻辑
    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'zh' : 'en';
        i18n.changeLanguage(newLang);

        let newPath = location.pathname;

        // 英文路径以 /en 开头，中文不带前缀
        if (currentLang === 'en') {
            newPath = newPath.replace('/en', ''); // 切换到中文时移除 /en
        } else if (newLang === 'en') {
            newPath = `/en${newPath}`; // 切换到英文时加上 /en
        }

        navigate(newPath, { replace: true });
    };

    useEffect(() => {
        const handleScroll = () => {
            // 判断当前路径是否包含 '/code'
            const isCodePage = location.pathname.includes('/code');

            // 如果在小屏幕，始终显示导航栏
            if (window.innerWidth <= 640) {
                setShowNav(true);
            } else {
                // 如果当前路由不包含 '/code'，则根据滚动距离控制导航栏显示
                if (!isCodePage) {
                    setShowNav(window.scrollY > 48); // 大屏上滚动超过 48px 后显示
                } else {
                    setShowNav(false); // 如果是 /code 页面，隐藏导航栏
                }
            }
        };


        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setShowNav(true);
            } else {
                handleScroll(); // 重新评估是否显示导航
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // 判断是否为特定页面下显示 SmallNavBar
    const isSmallNavBarOnlyPage = location.pathname.includes('/code');


    return (
        <>
            {!isSmallNavBarOnlyPage && (
                <header className="flex justify-between items-center">
                    <div className="navbar justify-between items-center z-[100] bg-base-300 hidden sm:flex rounded-none h-24 top-0 p-0 border-b-2 border-base-100">
                        <div className="flex">
                            <NavbarDropdown currentLang={currentLang} isActive={isActive} t={t} />
                            <Link to={`/${currentLang === 'en' ? 'en/' : ''}`}>
                                <div className="justify-between items-center flex h-24 w-48">
                                    <div className="justify-center items-center flex h-24 w-24">
                                        <RecursiveBoxes size={60} />
                                    </div>
                                    <div className="justify-center items-center flex h-24 w-24">
                                        <div className="flex-col">
                                            <a className="text-lg font-bold w-24 flex justify-center content-center">{t('siteName')}</a>
                                            <a className="text-sm font-bold w-24 flex justify-center content-center">temp</a>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <NavbarLinks currentLang={currentLang} isActive={isActive} t={t} />
                        </div>
                        <div className="">
                            <LanguageSwitcher toggleLanguage={toggleLanguage} currentLang={currentLang} />
                            <ThemeSwitcher />
                        </div>
                    </div>

                    <div className="block sm:hidden fixed bottom-0 w-full h-12 bg-base-200 border-t-2 border-base-100 z-30 flex justify-center items-center text-2xl">
                        <Link to={`/${currentLang === 'en' ? 'en/' : ''}`}>
                            {t('siteName')}
                        </Link>
                        <a className="tooltip ml-1" data-tip="GitHub: LzzsG" href="https://github.com/lzzsG" target="_blank" rel="noopener noreferrer">
                            <GithubIcon className="size-6" />
                        </a>
                    </div>
                </header>
            )}

            {/* 根据路由条件渲染 SmallNavBar */}
            <SmallNavBar
                showNav={showNav}
                isActive={isActive}
                toggleLanguage={toggleLanguage}
                currentLang={currentLang}
                theme={theme}
                changeTheme={changeTheme}
            />
        </>
    );
};

export default Header;
