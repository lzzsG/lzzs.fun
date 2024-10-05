import React from 'react';
import { Link } from 'react-router-dom';

const DropdownList = ({ items, dropdownOpen, toggleDropdown, currentLang, isActive, t }) => {
    return (
        <ul className="menu menu-sm dropdown-content shadow w-24 bg-base-300 ring-2 ring-base-100 ring-inset">
            {items.map((item, index) => {
                const Icon = item.icon;

                // 如果有子导航项，则生成一个折叠菜单
                if (item.subItems) {
                    return (
                        <div key={item.name}>
                            <button
                                className="text-base btn h-20 w-20 btn-sm btn-ghost hover:bg-base-100 flex items-center"
                                onClick={() => toggleDropdown(index)} // 切换下拉菜单
                            >
                                <Icon className="-ml-0.5 mx-0.5" />
                                {t(item.name)}
                            </button>
                            {dropdownOpen === index && (
                                <ul className="menu menu-sm shadow bg-base-300 ring-2 ring-base-100 ring-inset">
                                    {item.subItems.map((subItem) => {
                                        const SubIcon = subItem.icon;
                                        return (
                                            <Link to={`/${currentLang === 'en' ? 'en/' : ''}${subItem.path}`} key={subItem.name}>
                                                <button className={`text-base btn h-16 w-20 btn-sm btn-ghost hover:bg-base-100 ${isActive(subItem.path) ? 'bg-base-100' : ''}`}>
                                                    <div className="flex items-center">
                                                        <SubIcon className="-ml-0.5 mx-0.5" />
                                                        {t(subItem.name)}
                                                    </div>
                                                </button>
                                            </Link>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    );
                }

                // 没有子导航项
                return (
                    <Link to={`/${currentLang === 'en' ? 'en/' : ''}${item.path}`} key={item.name}>
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
    );
};

export default DropdownList;
