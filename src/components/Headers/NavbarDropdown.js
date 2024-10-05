import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import navItems from '../../config/navConfig'; // 导入导航配置

const NavbarDropdown = ({ currentLang, isActive, t }) => {
    const [openMenu, setOpenMenu] = useState(null); // 跟踪当前展开的菜单

    const toggleMenu = (name) => {
        setOpenMenu(openMenu === name ? null : name); // 切换展开/收起
    };

    return (
        <div className="dropdown h-24">
            {/* 汉堡按钮 */}
            <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-base-100 w-20 h-20 m-2 flex items-center md:hidden p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content shadow w-40 bg-base-300 ring-2 ring-base-100 ring-inset">
                {navItems.map((item) => {
                    const Icon = item.icon;  // 取出图标组件
                    const fullPath = currentLang === 'en' ? `/en${item.path}` : item.path;

                    return (
                        <li key={item.name} className="relative">
                            {item.children ? (
                                <button
                                    className={`text-base btn pl-6 h-12 w-full btn-sm btn-ghost hover:bg-base-100 flex items-center justify-between ${openMenu === item.name ? 'bg-base-100' : ''}`}
                                    onClick={() => toggleMenu(item.name)}
                                >
                                    <div className="flex items-center overflow-hidden">
                                        <Icon className="mr-2" />
                                        <span className="truncate">{t(item.name)}</span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${openMenu === item.name ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            ) : (
                                <Link to={fullPath} className="block">
                                    <button
                                        className={`text-base btn h-12 w-full btn-sm btn-ghost hover:bg-base-100 flex items-center justify-between ${isActive(item.path) ? 'bg-base-100' : ''}`}
                                    >
                                        <div className="flex items-center overflow-hidden">
                                            <Icon className="mr-2" />
                                            <span className="truncate">{t(item.name)}</span>
                                        </div>
                                    </button>
                                </Link>
                            )}

                            {/* 子菜单 */}
                            {item.children && openMenu === item.name && (
                                <ul className="m-0 mt-2 p-0 bg-base-300  w-full ring-2 ring-base-100">
                                    {item.children.map((child) => (
                                        <li key={child.name} className="flex items-center justify-between">
                                            <Link to={currentLang === 'en' ? `/en${child.path}` : child.path}>
                                                <button className="text-sm btn btn-ghost hover:bg-base-100 w-28  flex items-center justify-between">
                                                    <span className="">{t(child.name)}</span>
                                                </button>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NavbarDropdown;
