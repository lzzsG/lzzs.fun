import React from 'react';
import { Link } from 'react-router-dom';
import navItems from '../../config/navConfig';  // 导入导航配置

const NavbarLinks = ({ currentLang, isActive, t }) => {
    return (
        <div className="hidden md:flex">
            {navItems.map((item) => {
                const Icon = item.icon;  // 取出图标组件
                // 动态生成路径，处理当前语言的前缀
                const fullPath = currentLang === 'en' ? `/en${item.path}` : item.path;

                return (
                    <Link to={fullPath} key={item.name}>
                        <button className={`text-base btn h-24 w-24 btn-sm btn-ghost hover:bg-base-100 ${isActive(item.path) ? 'bg-base-100' : ''}`}>
                            <div className="flex items-center">
                                <Icon className="-ml-0.5 mx-0.5" />
                                {t(item.name)}
                            </div>
                        </button>
                    </Link>
                );
            })}
        </div>
    );
};

export default NavbarLinks;
