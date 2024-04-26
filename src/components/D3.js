import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TreeChart = ({ data }) => {
    const ref = useRef();
    const [baseContentColor, setBaseContentColor] = useState('');
    const [neutralColor, setNeutralColor] = useState('');
    const [base300Color, setBase300Color] = useState('');

    useEffect(() => {
        // 创建三个隐藏元素，每个用于获取一个颜色
        const baseContentElement = document.createElement('div');
        const neutralElement = document.createElement('div');
        const base300Element = document.createElement('div');

        baseContentElement.className = 'bg-base-content hidden';
        neutralElement.className = 'bg-neutral hidden';
        base300Element.className = 'bg-base-300 hidden';

        document.body.appendChild(baseContentElement);
        document.body.appendChild(neutralElement);
        document.body.appendChild(base300Element);

        // 更新颜色的函数
        const updateColors = () => {
            setBaseContentColor(window.getComputedStyle(baseContentElement).backgroundColor);
            setNeutralColor(window.getComputedStyle(neutralElement).backgroundColor);
            setBase300Color(window.getComputedStyle(base300Element).backgroundColor);
        };

        updateColors();

        // 创建 MutationObserver 监听主题变化
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    updateColors(); // 当主题变化时更新所有颜色
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true // 只监听属性变更
        });

        return () => {
            observer.disconnect();
            document.body.removeChild(baseContentElement);
            document.body.removeChild(neutralElement);
            document.body.removeChild(base300Element);
        };
    }, []);

    useEffect(() => {
        if (!data) return;

        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        const width = 1600; // 容器宽度
        const height = 3500; // 容器高度
        svg.attr("width", width).attr("height", height);

        const root = d3.hierarchy(data);
        const dx = 18; // 垂直间距固定为
        const dy = width / (root.height + 1); // 水平间距根据层级数动态计算

        const treeLayout = d3.tree().nodeSize([dx, dy]);
        treeLayout(root);

        const g = svg.append("g").attr("transform", `translate(${dy / 2 - 100}, ${dx + 1600})`);
        g.selectAll('path').data(root.links()).enter().append('path')
            .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x))
            .attr('fill', 'none')
            .attr('stroke', base300Color);

        const node = g.selectAll('.node')
            .data(root.descendants())
            .enter().append('a')
            .attr('xlink:href', d => d.data.link || null)
            .attr('target', '_blank')
            .attr('transform', d => `translate(${d.y},${d.x})`);

        node.append('circle')
            .attr('r', 5)
            .attr('fill', d => d.children ? neutralColor : base300Color);

        node.append('title')
            .text(d => d.data.description);

        node.append('text')
            .attr('dy', '0.32em')
            .attr('x', d => d.children ? -8 : 8)
            .attr('text-anchor', d => d.children ? 'end' : 'start')
            .text(d => d.data.name)
            .style('font-size', '14px')
            .style('fill', baseContentColor);

    }, [data, baseContentColor, neutralColor, base300Color]); // 当数据或颜色变化时重新渲染

    return <svg ref={ref}></svg>;
};

export default TreeChart;
