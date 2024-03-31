import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For react-router-dom v6

const SwipeableRoutes = ({ nextRoute, prevRoute }) => {
    const navigate = useNavigate(); // For react-router-dom v6
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const minSwipeDistance = 10;

    const onTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const onTouchEnd = () => {
        if (touchStart - touchEnd > minSwipeDistance) {
            navigate(nextRoute); // 使用navigate进行路由切换
        } else if (touchEnd - touchStart > minSwipeDistance) {
            navigate(prevRoute); // 使用navigate进行路由切换
        }
    }

    return (
        <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="swipeable-routes"
        >
        </div>

    );
};

export default SwipeableRoutes;