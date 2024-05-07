import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopOrBackButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showBack, setShowBack] = useState(false); // 控制Back按钮显示
    const [scrollBeforeTop, setScrollBeforeTop] = useState(0); // 记录点击向上按钮前的滚动位置
    const location = useLocation();

    useEffect(() => {
        // 控制按钮的可见性
        const handleScroll = () => {
            setIsVisible(window.scrollY > 1600);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 滚动到目标锚点
    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            // 使用 setTimeout 确保页面完全加载
            setTimeout(() => {
                const targetElement = document.getElementById(hash.substring(1));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100); // 延迟 100ms
        } else {
            // 没有 hash 时滚动到页面顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    // 处理向上按钮点击
    const handleScrollToTop = () => {
        if (window.scrollY !== 0) {
            setScrollBeforeTop(window.scrollY);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            setShowBack(true); // 显示Back按钮
        }
    };

    // 处理返回按钮点击
    const handleBack = () => {
        window.scrollTo({
            top: scrollBeforeTop,
            behavior: 'smooth',
        });
        setShowBack(false); // 点击Back后隐藏Back按钮
    };

    return (
        <div className="fixed z-50">
            {isVisible && (
                <button
                    onClick={handleScrollToTop}
                    className="hidden sm:flex  btn fixed -top-0.5 right-0.5  h-12 w-12 text-base-content hover:bg-base-100 text-base bg-base-100 z-50"
                    aria-label="Go to top"
                >
                    Top
                </button>
            )}
            {showBack && (
                <button
                    onClick={handleBack}
                    className="hidden sm:flex btn fixed -bottom-0.5 right-0 h-12 w-12 text-base-content hover:bg-base-100 text-base bg-base-100 z-50"
                    aria-label="Go back"
                >
                    Back
                </button>
            )}
        </div>
    );
};

export default ScrollToTopOrBackButton;
