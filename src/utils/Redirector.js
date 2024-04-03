// Redirector.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirector() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectPathname = localStorage.getItem('redirectPathname');
        console.log('Redirecting to:', redirectPathname); // 调试输出
        if (redirectPathname) {
            navigate(redirectPathname);
            localStorage.removeItem('redirectPathname');
        }
    }, [navigate]);


    return null; // 该组件不渲染任何东西
}

export default Redirector;