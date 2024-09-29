import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Redirector() {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const redirectPathname = localStorage.getItem('redirectPathname');
        console.log('Current pathname:', location.pathname, 'Redirecting to:', redirectPathname); // 调试输出

        // 检查当前路径和重定向逻辑
        const isEnglishPath = location.pathname.startsWith('/en') || redirectPathname?.startsWith('/en');

        if (redirectPathname) {
            const redirectTo = isEnglishPath
                ? redirectPathname // 英文路径
                : redirectPathname; // 中文路径

            console.log('Navigating to:', redirectTo); // 输出最终重定向路径
            navigate(redirectTo, { replace: true });
            localStorage.removeItem('redirectPathname');
        }
    }, [navigate, location]);


    return null;
}

export default Redirector;
