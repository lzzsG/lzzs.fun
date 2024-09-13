import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config/config.js';
import { ReactComponent as LinkIcon } from '../assets/svg/link.svg';

// 公用的生成链接的函数
const generateLink = (link, title, linkType, date) => {
    return (
        <div className="flex flex-col">
            <div className="flex">
                {linkType === 'external' ? (
                    <>
                        <LinkIcon className="size-4 mr-1 translate-y-1.5" />
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <h3 className="text-lg hover:underline mb-1 font-bold">{title}</h3>
                        </a>
                    </>
                ) : (
                    <Link to={link}>
                        <h3 className="text-lg hover:underline mb-1 font-bold">{title}</h3>
                    </Link>
                )}
            </div>
            {date && <p className="text-sm text-gray-500 mb-2">{date}</p>}
        </div>
    );
};

// 生成系列文章的函数
const generateSeries = (series) => {
    return (
        <div className="flex bg-base-200 mb-2 md:mb-0">
            <div className="flex-grow flex m-4">
                <div className="w-full">
                    <div className="flex">
                        <h3 className="text-lg mb-2 font-bold">{series.title}</h3>
                    </div>
                    {series.date && <p className="text-sm text-gray-500 mb-2">{series.date}</p>}
                    {series.description && <p className="mb-2">{series.description}</p>}
                    <div className="divider -translate-y-1 m-0"></div>
                    <ul className="list-disc list-inside">
                        {series.articles.map((article, index) => (
                            <Link key={index} to={article.link}>
                                <li className="text-base mb-2 hover:underline">
                                    {article.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// 动态生成页面的主函数
const NewBlogPage = ({ configData }) => {
    // 根据类型对sections进行分类
    const sectionsByType = configData.sections.reduce((acc, section) => {
        if (!acc[section.type]) {
            acc[section.type] = [];
        }
        acc[section.type].push(section);
        return acc;
    }, {});

    // 动态渲染不同的内容块
    const renderSection = (type, section) => {
        switch (type) {
            case 'series':
                return generateSeries(section);
            case 'project':
            case 'blog':
            default:
                return (
                    <div className="flex bg-base-200 mb-2 md:mb-0">
                        <div className="flex-grow flex justify-between m-4">
                            <div>
                                {generateLink(section.link, section.title, section.linkType, section.date)}
                                {section.description && <p className="mb-2">{section.description}</p>}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="m-6 mt-20 sm:mt-6 md:m-12 flex justify-center items-center">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 max-w-full md:max-w-[1200px] md:gap-4">
                {Object.keys(sectionsByType).map((type, index) => (
                    <React.Fragment key={index}>
                        <h2 className="text-xl md:col-span-2 lg:col-span-3 m-0 ml-2 font-semibold text-base-content">
                            {/* 使用配置文件中的 label，如果没有则使用 type */}
                            {sectionsByType[type][0].label || type}
                        </h2>
                        {sectionsByType[type].map((section, sectionIndex) => (
                            <React.Fragment key={sectionIndex}>
                                {renderSection(type, section)}
                            </React.Fragment>
                        ))}
                        <div className="divider md:col-span-2 lg:col-span-3 m-0"></div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default NewBlogPage;
