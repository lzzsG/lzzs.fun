import React, { useState, useRef, useEffect } from 'react';

const CircularNavigation = ({ buttons }) => {
    const [translateX, setTranslateX] = useState(0);
    const [IndexB, setIndexB] = useState('');
    const [jumpTo, setJumpTo] = useState(''); // 新状态来存储跳转的目标索引

    const carouselRef = useRef();


    const handleClick = (index) => {
        const moveDistance = index * (carouselRef.current.children[index].offsetWidth);
        setTranslateX(-moveDistance);
        setIndexB(index); // 强制更新IndexB
    };

    const handleJump = () => {
        // 将输入转换为数字并减1以适配数组索引（从0开始）
        const index = parseInt(jumpTo, 10) - 1;
        // 确保输入的数字在有效范围内
        if (index >= 0 && index < 10) {
            handleClick(index);
            setJumpTo('');
        }
    };

    return (
        <div className="overflow-x-hidden whitespace-nowrap h-12 m-0 p-0">
            <div className="h-12 flex w-full bg-base-200 absolute  ">

                <div className="dropdown dropdown-right z-10">
                    <input tabIndex={1} role="button" type="number"
                        className="input rounded-none text-center w-24 m-0 p-0 bg-base-200 flex z-10 hover:bg-base-200"
                        placeholder="JumpTo"
                        value={jumpTo}
                        onChange={(e) => setJumpTo(e.target.value)}
                        min="1"
                        max="10" />
                    <div tabIndex={1} className="dropdown-content">
                        <button
                            className="btn btn-primary w-24 m-0 p-0 flex z-10"
                            onClick={handleJump}
                        >
                            Jump
                        </button>
                    </div>
                </div>
                <div
                    ref={carouselRef}
                    className="flex static  transition-transform ease-out bg-base-200  "
                    style={{ transform: `translateX(${translateX + 96 * 2}px)` }}
                >

                    {Array.from({ length: 10 }, (_, i) => (
                        <button
                            key={i}
                            className={`btn w-24 btn-ghost h-12 m-0 p-0 hover:bg-base-100 ${i === IndexB ? 'bg-base-100' : ''}`}
                            onClick={() => handleClick(i)}
                        >{`${i + 1}`}</button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CircularNavigation;
