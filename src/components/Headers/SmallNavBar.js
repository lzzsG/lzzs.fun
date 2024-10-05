import React from 'react';
import { Link } from 'react-router-dom';
import navItems from '../../config/navConfig';  // 导入导航配置
import { ReactComponent as TranslateIcon } from '../../assets/svg/trasnlate.svg';

const SmallNavBar = ({ showNav, isActive, toggleLanguage, currentLang, theme, changeTheme }) => {
    return (
        <div className={`mynavbar block z-30 fixed top-0 w-full flex justify-center items-center bg-base-200 border-b-2 border-base-100 ${showNav ? 'opacity-100' : 'opacity-0'}`}>
            {navItems.map((item) => {
                const Icon = item.icon;
                const fullPath = currentLang === 'en' ? `/en${item.path}` : item.path;

                return (
                    <Link to={fullPath} key={item.name}>
                        <button className={`text-sm btn h-12 w-16 p-0 pb-0.5 btn-sm btn-ghost hover:bg-base-100 ${isActive(item.path) ? 'bg-base-100' : ''}`}>
                            <div className="flex flex-col items-center">
                                <Icon className="" />
                                <span className="text-xs">{item.name}</span>  {/* 添加文字 */}
                            </div>
                        </button>
                    </Link>
                );
            })}

            {/* 切换语言按钮 */}
            <button className="text-sm btn h-12 w-16 btn-sm btn-ghost" onClick={toggleLanguage}>
                <div className="flex flex-col items-center">
                    <TranslateIcon className="translate-y-px" />
                    <span className="text-xs">{currentLang === 'en' ? '中文' : 'English'}</span>  {/* 添加文字 */}
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
