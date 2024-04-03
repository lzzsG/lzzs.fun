// Redirector.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirector() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectPathname = localStorage.getItem('redirectPathname');
        if (redirectPathname) {
            navigate(redirectPathname);
            localStorage.removeItem('redirectPathname'); // 清除记录，避免重复重定向
        }
    }, [navigate]); // 使用 navigate 作为依赖项

    return null; // 该组件不渲染任何东西
}

export default Redirector;