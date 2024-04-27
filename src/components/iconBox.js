import React from 'react';

const colors = ['bg-base-content', 'bg-base-100', 'bg-base-300'];

const RecursiveSquare = ({ level = 0, size }) => {
    if (level === 8) {
        return <div className={`w-full h-full ${colors[0]}`} />;
    }

    const halfSize = `${size / 2}px`; // 计算新的尺寸为原来的一半

    return (
        <div style={{ width: size, height: size }} className="flex flex-wrap">
            <div style={{ width: halfSize, height: halfSize }} className="flex">
                <div className={`w-1/2 h-full ${colors[1]}`} />
                <div className={`w-1/2 h-full ${colors[2]}`} />
            </div>

            <div style={{ width: halfSize, height: halfSize }}>
                <RecursiveSquare level={level + 1} size={size / 2} />
            </div>

            <div style={{ width: halfSize, height: halfSize }} className={`${colors[0]}`} />

            <div style={{ width: halfSize, height: halfSize }} className="flex flex-col">
                <div className={`w-full h-1/2 ${colors[2]}`} />
                <div className={`w-full h-1/2 ${colors[1]}`} />
            </div>
        </div>
    );
};

const RecursiveBoxes = ({ size = 256 }) => { // 默认大小为256px
    return (
        // <div className="border" style={{ width: size + 1.5, height: size + 1.5 }}>
        <div style={{ width: size, height: size }}>
            <RecursiveSquare size={size} />
        </div>
        //  </div>
    );
};

export default RecursiveBoxes;
