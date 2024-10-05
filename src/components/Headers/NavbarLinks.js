import React from 'react';
import { Link } from 'react-router-dom';
import navItems from '../../config/navConfig';

const NavbarLinks = ({ currentLang, isActive, t }) => {
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
                            className={`btn btn-ghost h-24 w-24 hover:bg-base-200 ${isActive(item.path) ? 'bg-base-100' : ''}`}
                        >
                            <div className="flex w-24 items-center text-base translate-x-1">
                                <Icon className="mr-1" />
                                <span className="truncate">{t(item.name)}</span>
                                <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-48 "
                        >
                            {item.children.map((child) => {
                                const ChildIcon = child.icon;
                                const childPath = currentLang === 'en' ? `/en${child.path}` : child.path;

                                return (
                                    <li key={child.name}>
                                        <Link to={childPath} className={`hover:bg-base-100 ${isActive(child.path) ? 'bg-base-100' : ''}`}>
                                            <ChildIcon className="mr-1" />
                                            <span className="truncate">{t(child.name)}</span>
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
                            className={`btn btn-ghost h-24 w-24 hover:bg-base-100 ${isActive(item.path) ? 'bg-base-100' : ''}`}
                        >
                            <div className="flex items-center text-base truncate">
                                <Icon className="mr-1" />
                                <span className="truncate">{t(item.name)}</span>
                            </div>
                        </button>
                    </Link>
                );
            }
        });
    };

    return (
        <div className="hidden md:flex">
            {renderNavItems(navItems)}
        </div>
    );
};

export default NavbarLinks;
