import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import navItems from '../../config/navConfig';
import { ReactComponent as TranslateIcon } from '../../assets/svg/trasnlate.svg';
import { useTranslation } from 'react-i18next';

const SmallNavBar = ({ showNav, isActive, toggleLanguage, currentLang, theme, changeTheme }) => {
    const { t } = useTranslation();
    const location = useLocation(); // 用于监听路由变化
    const [openMenu, setOpenMenu] = useState(null); // 用于跟踪哪个下拉菜单是展开的

    // 监听路由变化并关闭下拉菜单
    useEffect(() => {
        setOpenMenu(null); // 当路由变化时，关闭所有下拉菜单
    }, [location.pathname]);

    // 切换菜单展开状态
    const toggleMenu = (name) => {
        setOpenMenu(openMenu === name ? null : name); // 切换当前菜单的展开状态
    };

    const renderNavItems = (items) => {
        return items.map((item) => {
            const fullPath = currentLang === 'en' ? `/en${item.path}` : item.path;
            const isMenuOpen = openMenu === item.name; // 判断当前菜单是否展开

            if (item.children) {
                // 有子菜单，生成下拉菜单
                return (
                    <div className="dropdown" key={item.name}>
                        <button
                            tabIndex={0}
                            className={`btn btn-ghost h-12 w-16 hover:bg-base-100 ${isActive(item.path) ? 'bg-base-100' : ''}`}
                            onClick={() => toggleMenu(item.name)} // 点击切换菜单展开/收起状态
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-sm">{t(item.name)}</span>
                            </div>
                        </button>
                        {isMenuOpen && (
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-36"
                            >
                                {item.children.map((child) => {
                                    const childPath = currentLang === 'en' ? `/en${child.path}` : child.path;
                                    return (
                                        <li key={child.name}>
                                            <Link to={childPath} className={`hover:bg-base-100 ${isActive(child.path) ? 'bg-base-100' : ''}`}>
                                                <div className="flex items-center">
                                                    <span className="text-sm">{t(child.name)}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
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
                                <span className="text-sm">{t(item.name)}</span>
                            </div>
                        </button>
                    </Link>
                );
            }
        });
    };

    return (
        <div className="mynavbar bg-base-200 z-[90] fixed top-0 w-full flex justify-center items-center">

            <span className="text-sm font-bold mr-2 hidden sm:block">Lzzs.fun</span>
            {renderNavItems(navItems)}
            {/* 切换语言和主题的按钮 */}
            <button className="text-sm btn btn-ghost m-0 p-0 w-12" onClick={toggleLanguage}>
                <div className="flex flex-col items-center">
                    <TranslateIcon />
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
