import React from 'react';
import { Link } from 'react-router-dom';
import navItems from '../../config/navConfig';  // 导入导航配置

const NavbarDropdown = ({ currentLang, isActive, t }) => {
    return (
        <div className="dropdown h-24">
            <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-base-100 w-20 h-20 m-2 flex items-center md:hidden p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content shadow w-24 bg-base-300 ring-2 ring-base-100 ring-inset">
                {navItems.map((item) => {
                    const Icon = item.icon;  // 取出图标组件
                    // 动态生成路径，处理当前语言的前缀
                    const fullPath = currentLang === 'en' ? `/en${item.path}` : item.path;

                    return (
                        <Link to={fullPath} key={item.name}>
                            <button className={`text-base btn h-20 w-20 btn-sm btn-ghost hover:bg-base-100 ${isActive(item.path) ? 'bg-base-100' : ''}`}>
                                <div className="flex items-center">
                                    <Icon className="-ml-0.5 mx-0.5" />
                                    {t(item.name)}
                                </div>
                            </button>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};

export default NavbarDropdown;
