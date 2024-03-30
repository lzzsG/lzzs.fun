import React, { useState, useEffect } from 'react';

const ScrollToTopOrBackButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showBack, setShowBack] = useState(false); // 单独控制Back按钮的显示
    const [scrollBeforeTop, setScrollBeforeTop] = useState(0); // 记录点击向上按钮前的滚动位置

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 96);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollToTop = () => {
        // 仅当当前位置非顶部时记录位置并滚动到顶部
        if (window.scrollY !== 0) {
            setScrollBeforeTop(window.scrollY);
            window.scrollTo({
                top: 0,

            });
            setShowBack(true); // 显示Back按钮
        }
    };

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
                    className="btn fixed bottom-0 right-12  h-12 w-12 text-base-content hover:bg-base-100 text-base bg-base-100 z-50"
                    aria-label="Go to top"
                >
                    Top
                </button>
            )}
            {showBack && (
                <button
                    onClick={handleBack}
                    className="btn fixed bottom-0 right-0 h-12 w-12 text-base-content hover:bg-base-100 text-base bg-base-100 z-50"
                    aria-label="Go back"
                >
                    Back
                </button>
            )}
        </div>
    );
};

export default ScrollToTopOrBackButton;
