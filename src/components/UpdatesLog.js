import React from 'react';
import updatesData from '../assets/updatesData';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ReactComponent as UpdateIcon } from '../assets/svg/update.svg';


const UpdatesLog = ({ limit = updatesData.length, filterType = 'all' }) => {
    const { t } = useTranslation();
    const filteredUpdates = updatesData
        .filter(update => filterType === 'all' || update.type === filterType) // 筛选更新类型
        .slice(0, limit); // 限制显示的条目数

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-base-content">{t('latestUpdates')}
                <Link to="/zh/history" className="text-accent-content text-base hover:underline ml-2">
                    {t('more')}
                </Link></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredUpdates.map((update, index) => (
                    <div key={index} className="border-2 border-base-content overflow-hidden rounded-lg px-4 py-5 sm:px-6">
                        <div className="mb-2 text-sm text-gray-400">{update.date}</div>
                        <div className="text-md text-base-content">
                            {update.type === 'blogAddition' && t('addedNewPostAbout', { topic: t(update.topicKey) })}
                            {update.type === 'websiteUpdate' && t('updatedPageWith', { feature: t(update.featureKey) })}
                        </div>
                    </div>
                ))}
            </div> </div>
    );
};

export default UpdatesLog;

/*
显示所有更新：
<UpdatesLog />

限制显示最近的3条更新：
<UpdatesLog limit={3} />

仅显示“网页更新”类型的更新：
<UpdatesLog filterType="websiteUpdate" />

限制显示最近的2条“添加文章”的更新：
<UpdatesLog limit={2} filterType="blogAddition" />

*/