import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import navItems from '../../config/navConfig';

const NavbarLinks = ({ currentLang, isActive, t }) => {
    const [openMenu, setOpenMenu] = useState(null); // 跟踪当前展开的菜单
    const dropdownRefs = useRef([]); // 用于引用每个下拉菜单的 Ref

    // 点击外部时关闭菜单并重置箭头状态
    useEffect(() => {
        const handleClickOutside = (event) => {
            // 如果点击发生在任何一个菜单外部，关闭菜单
            if (!dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
                setOpenMenu(null); // 重置所有菜单状态和箭头状态
            }
        };

        // 添加全局点击事件监听器
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // 在组件卸载时移除监听器
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (name) => {
        // 如果点击的是已经展开的菜单，则收起；否则展开新的菜单
        setOpenMenu(openMenu === name ? null : name);
    };

    const renderNavItems = (items) => {
        return items.map((item, index) => {
            const Icon = item.icon;
            const fullPath = currentLang === 'en' ? `/en${item.path}` : item.path;
            const isMenuOpen = openMenu === item.name; // 判断当前菜单是否展开

            if (item.children) {
                // 有子菜单，生成下拉菜单
                return (
                    <div
                        className="dropdown"
                        key={item.name}
                        ref={(el) => (dropdownRefs.current[index] = el)} // 为每个菜单添加 ref
                    >
                        <button
                            tabIndex={0}
                            className={`btn btn-ghost h-24 w-24 hover:bg-base-200 ${isActive(item.path) ? 'bg-base-100' : ''}`}
                            onClick={() => toggleMenu(item.name)} // 点击切换菜单展开/收起状态
                        >
                            <div className="flex w-24 items-center text-base translate-x-1">
                                <Icon className="mr-1" />
                                <span className="truncate">{t(item.name)}</span>
                                <svg
                                    className={`ml-1 w-5 h-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''
                                        }`} // 根据菜单状态设置旋转效果
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>
                        {isMenuOpen && ( // 只有在菜单展开时才显示子菜单
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-48"
                            >
                                {item.children.map((child) => {
                                    const ChildIcon = child.icon;
                                    const childPath = currentLang === 'en' ? `/en${child.path}` : child.path;

                                    return (
                                        <li key={child.name}>
                                            <Link to={childPath} className={` ${isActive(child.path) ? 'bg-base-200' : ''}`}>
                                                <ChildIcon className="mr-1" />
                                                <span className="truncate">{t(child.name)}</span>
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
