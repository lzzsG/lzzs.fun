import { ReactComponent as HomeIcon } from '../assets/svg/home.svg';
import { ReactComponent as AboutMeIcon } from '../assets/svg/about-me.svg';
import { ReactComponent as BlogIcon } from '../assets/svg/blog.svg';
import { ReactComponent as TestIcon } from '../assets/svg/test.svg';

// 导航项配置
const navItems = [
    {
        name: 'home',
        path: '/',
        icon: HomeIcon,
    },
    {
        name: 'about',
        path: '/about',
        icon: AboutMeIcon,
    },
    {
        name: 'blog',
        path: '/blog',
        icon: BlogIcon,
    },
    {
        name: 'test',
        path: '/test',
        icon: TestIcon,
    },
    {
        name: '展开',
        path: '/services',
        icon: TestIcon,
        children: [
            {
                name: 'Consulting',
                path: '/services/consulting',
                icon: TestIcon,
            },
            {
                name: 'Support',
                path: '/services/support',
                icon: TestIcon,
            },
        ],
    },
];

export default navItems;
