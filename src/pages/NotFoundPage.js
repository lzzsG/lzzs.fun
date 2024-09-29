import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const currentLang = i18n.language;
    const currentPath = location.pathname;
    let navigate = useNavigate();

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'zh' : 'en';
        i18n.changeLanguage(newLang);

        let newPath = location.pathname;

        // 英文路径以 /en 开头，中文不带前缀
        if (currentLang === 'en') {
            newPath = newPath.replace('/en', ''); // 切换到中文时移除 /en
        } else if (newLang === 'en') {
            newPath = `/en${newPath}`; // 切换到英文时加上 /en
        }

        navigate(newPath, { replace: true });
    };
    useEffect(() => {
        // 设置页面标题
        document.title = "404 - 页面未找到 / Page Not Found";
    }, []);
    return (
        <div className="m-4 mt-16 sm:mt-4 md:m-12 2xl:m-24">
            <div className="hero bg-base-300" style={{ minHeight: '60vh' }}>
                <div className="hero-content text-center">
                    <div className="text-5xl font-extrabold">
                        404 - Page Not Found
                    </div>
                    <div className="text-base-content max-w-md mt-4">
                        <h1 className="mb-5 text-5xl font-bold">页面未找到 / Page Not Found</h1>
                        <p className="mb-5">
                            您访问的页面暂未实现，请回到首页或者切换语言。<br />
                            The page you are looking for is not yet implemented. Please go back to the homepage or switch language.
                        </p>
                        <div className="space-x-4">
                            <Link to="/" className="btn btn-primary">返回首页 / Go to Home</Link>
                            {/* <Link to="/" className="btn btn-outline">切换语言 / switch language</Link> */}
                            <button className="btn btn-outline" onClick={toggleLanguage}>
                                <div className="flex items-center">
                                    切换语言 / switch language
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex justify-between bg-base-100 rounded-none items-center mt-6 md:mt-12 p-6 md:p-12 border border-base-200">
                <div className="text">
                    <h1 className="text-5xl font-bold mb-5">
                        您可以选择回到首页 / You can choose to go back to the homepage
                    </h1>
                    <h1 className="text-3xl font-bold mb-5">
                        或者切换语言 / Or switch language
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
