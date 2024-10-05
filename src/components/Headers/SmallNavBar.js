// SmallNavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import navItems from '../../config/navConfig';
import { ReactComponent as TranslateIcon } from '../../assets/svg/trasnlate.svg';
import { useTranslation } from 'react-i18next';



const SmallNavBar = ({ showNav, isActive, toggleLanguage, currentLang, theme, changeTheme }) => {


    const { t, i18n } = useTranslation();

    const renderNavItems = (items) => {
        return items.map((item) => {
            const Icon = item.icon;
            const fullPath = currentLang === 'en' ? `/en${item.path}` : item.path;

            if (item.children) {
                // 有子菜单，生成下拉菜单
                return (
                    <div className="dropdown" key={item.name}>
                        <button
                            tabIndex={0}
                            className={`btn btn-ghost h-12 w-16 hover:bg-base-100 ${isActive(item.path) ? 'bg-base-100' : ''}`}
                        >
                            <div className="flex flex-col items-center">

                                <span className="text-sm">{t(item.name)}</span>
                                {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" />
                                </svg> */}

                            </div>
                        </button>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-36"
                        >
                            {item.children.map((child) => {
                                const ChildIcon = child.icon;
                                const childPath = currentLang === 'en' ? `/en${child.path}` : child.path;

                                return (
                                    <li key={child.name}>
                                        <Link to={childPath} className={`hover:bg-base-100 ${isActive(child.path) ? 'bg-base-100' : ''}`}>
                                            <div className="flex items-center">
                                                <ChildIcon className="mr-1" />
                                                {t(child.name)}
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            } else {
                // 普通导航项
                return (
                    <Link to={fullPath} key={item.name}>
                        <button
                            className={`btn btn-ghost h-12 w-16 hover:bg-base-100 ${isActive(item.path) ? 'bg-base-100' : ''}`}
                        >
                            <div className="flex flex-col items-center">
                                {/* <Icon /> */}
                                <span className="text-sm">{t(item.name)}</span>
                            </div>
                        </button>
                    </Link>
                );
            }
        });
    };

    return (
        <div className={`mynavbar block z-30 fixed top-0 w-full flex justify-center items-center bg-base-200 border-b-2 border-base-100 ${showNav ? 'opacity-100' : 'opacity-0'}`}>
            {renderNavItems(navItems)}
            {/* 切换语言和主题的按钮保持不变 */}
            <button className="text-sm btn btn-ghost m-0 p-0 w-12" onClick={toggleLanguage}>
                <div className="flex flex-col items-center">
                    <TranslateIcon />
                    {/* <span className="text-xs">{currentLang === 'en' ? '中文' : 'English'}</span> */}
                </div>
            </button>
            <div className="tooltip tooltip-bottom" data-tip="Change Theme">
                <button className="-translate-y-0.5">
                    <input className="btn btn-xs ml-2 px-2 bg-base-200" name="radio-sm-theme" type="radio" checked={theme === 'black'} aria-label={'☽'} onClick={() => changeTheme('black')} />
                    <input className="btn btn-xs px-2 bg-base-200" name="radio-sm-theme" type="radio" checked={theme === 'light'} aria-label={'☼'} onClick={() => changeTheme('light')} />
                </button>
            </div>
        </div>
    );
};

export default SmallNavBar;
