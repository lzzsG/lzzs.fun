// src/pages/AboutPage.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import backgroundImage from '../assets/images/bg-td-long.jpg';
import CircularNavigation from '../components/CircularNavigation';

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <div>

            <CircularNavigation />

            <br />
            <br />
            <br />
            <div class="min-h-24">
                <h2>{t('aboutPage')}</h2>
                <p>{t('aboutContent')}</p>
            </div>
            <p class="text-2xl">Button 按钮</p><br />
            # Button 按钮
            <div>
                <button className="btn btn-info">Info</button>
                <button className="btn btn-success">Success</button>
                <button className="btn btn-warning">Warning</button>
                <button className="btn btn-error">Error</button>
            </div>
            # 按钮类型和颜色
            <div>
                <button className="btn">Button</button>
                <button className="btn btn-neutral">Neutral</button>
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-accent">Accent</button>
                <button className="btn btn-ghost">Ghost</button>
                <button className="btn btn-link">Link</button>
            </div>
            # 活动按钮
            <div>
                <button className="btn btn-active">Default</button>
                <button className="btn btn-active btn-neutral">Neutral</button>
                <button className="btn btn-active btn-primary">Primary</button>
                <button className="btn btn-active btn-secondary">Secondary</button>
                <button className="btn btn-active btn-accent">Accent</button>
                <button className="btn btn-active btn-ghost">Ghost</button>
                <button className="btn btn-active btn-link">Link</button>
            </div>
            # 不同的状态对应的按钮颜色
            <div>
                <button className="btn btn-info">Info</button>
                <button className="btn btn-success">Success</button>
                <button className="btn btn-warning">Warning</button>
                <button className="btn btn-error">Error</button>
            </div>
            # 边框按钮
            <div>
                <button className="btn btn-outline">Default</button>
                <button className="btn btn-outline btn-primary">Primary</button>
                <button className="btn btn-outline btn-secondary">Secondary</button>
                <button className="btn btn-outline btn-accent">Accent</button>
            </div>
            # 按钮尺寸
            <div>
                <button className="btn btn-lg">Large</button>
                <button className="btn">Normal</button>
                <button className="btn btn-sm">Small</button>
                <button className="btn btn-xs">Tiny</button>
            </div>
            # 响应式按钮
            <div>
                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Responsive</button>
            </div>
            # 宽按钮
            <div>
                <button className="btn btn-wide">Wide</button>
            </div>
            # 玻璃效果
            <div class="bg-cover bg-center h-64 flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <button className="btn glass">Glass button</button>
            </div>
            # Button可以用不同的HTML标签实现
            <div>
                <a role="button" className="btn">Link</a>
                <button type="submit" className="btn">Button</button>
                <input type="button" value="Input" className="btn" />
                <input type="submit" value="Submit" className="btn" />
                <input type="radio" aria-label="Radio" className="btn" />
                <input type="checkbox" aria-label="Checkbox" className="btn" />
                <input type="reset" value="Reset" className="btn" />
            </div>
            # 禁用状态
            <div>
                <button className="btn" disabled="disabled">Disabled using attribute</button>
                <button className="btn btn-disabled" tabIndex="-1" role="button" aria-disabled="true">Disabled using class name</button>
            </div>
            # 矩形圆角按钮
            <div>
                <button className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <button className="btn btn-square btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            # 圆形按钮
            <div>
                <button className="btn btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <button className="btn btn-circle btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            # 图标按钮（图标在前）
            <div>
                <button className="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Button
                </button>
            </div>
            图标按钮（图标在后）
            <div>
                <button className="btn">
                    Button
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
            </div>
            加载状态按钮
            <div>
                <button className="btn btn-square">
                    <span className="loading loading-spinner"></span>
                </button>
            </div>
            # 加载状态并带有文案按钮
            <div>
                <button className="btn">
                    <span className="loading loading-spinner"></span>
                    loading
                </button>
            </div>
            # 没有点击动画的按钮
            <div>
                <button className="btn no-animation">I don't have click animation</button>
            </div>
            <br /><br /><br /><br /><br /><br />
            <p class="text-2xl">   Dropdown 下拉菜单</p><br />

            # Dropdown menu
            <div className="flex justify-center items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            # Dropdown / aligns to end
            <div className="flex justify-center items-center">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            # Dropdown top
            <div className="flex justify-center items-center">
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            # Dropdown top / aligns to end
            <div className="flex justify-center items-center">
                <div className="dropdown dropdown-top dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            # Dropdown bottom / aligns to end
            <div className="flex justify-center items-center">
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            # 左侧下拉菜单
            <div className="flex justify-center items-center">
                <div className="dropdown dropdown-left">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            # 下拉菜单向左/对齐到末尾
            <div className="flex justify-center items-center">
                <div className="dropdown dropdown-left dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            # 右侧下拉菜单
            <div className="flex justify-center items-center">
                <div className="dropdown dropdown-right">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            # 下拉菜单向右/对齐到末尾
            <div className="flex justify-center items-center">
                <div className="dropdown dropdown-right dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Click</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            # 悬停时下拉菜单
            <div className="flex justify-center items-center">
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">Hover</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            # 强制保持打开
            <div className="flex justify-center items-center">
                <div className="dropdown dropdown-open">
                    <div tabIndex={0} role="button" className="btn m-1">Button</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            <br></br>  <br></br>  <br></br>  <br></br>
            #更多例子
            # 卡作为下拉菜单
            <div className="flex justify-center items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">可将任何元素用作下拉菜单</div>
                    <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-200 text-primary-content">
                        <div className="card-body">
                            <h3 className="card-title">Card title!</h3>
                            <p>you can use any element as a dropdown.</p>
                            # Button 按钮

                            <div>
                                <button className="btn btn-info">Info</button>
                                <button className="btn btn-success">Success</button>
                                <button className="btn btn-warning">Warning</button>
                                <button className="btn btn-error">Error</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            # 导航栏中的下拉菜单
            <div className="flex justify-center items-center">
                <div className="navbar bg-base-300 rounded-box">
                    <div className="flex-1 px-2 lg:flex-none">
                        <a className="text-lg font-bold">daisyUI</a>
                    </div>
                    <div className="flex justify-end flex-1 px-2">
                        <div className="flex items-stretch">
                            <a className="btn btn-ghost rounded-btn">Button</a>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Dropdown</div>
                                <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            # 辅助下拉菜单
            <div className="flex justify-center items-center">
                A normal text and a helper dropdown
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                        <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-200 rounded-box w-64">
                        <div tabIndex={0} className="card-body">
                            <h2 className="card-title">You needed more info?</h2>
                            <p>Here is a description!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">

            </div>
            <div className="flex justify-center items-center">

            </div>
            <div className="flex justify-center items-center">

            </div>
            <div className="flex justify-center items-center">

            </div>
            <div className="flex justify-center items-center">

            </div>


            <br></br>  <br></br>  <br></br>  <br></br>  <br></br>

        </div>
    )
};

export default AboutPage;