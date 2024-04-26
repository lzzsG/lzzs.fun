import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';

const SankeyChart = ({ data }) => {
    const ref = useRef();


    useEffect(() => {
        if (!data) return;

        const svg = d3.select(ref.current);
        const width = 1300, height = 10000;
        svg.attr("width", width).attr("height", height);

        const sankey = d3Sankey()
            .nodeWidth(15)
            .nodePadding(10)
            .extent([[1, 1], [width - 1, height - 6]]);

        const { nodes, links } = sankey(data);

        const node = svg.append("g")
            .selectAll("rect")
            .data(nodes)
            .enter().append("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("height", d => (d.y1 - d.y0) * 0.8)
            .attr("width", d => d.x1 - d.x0)
            .attr("fill", "gray");

        node.append("title")
            .text(d => `${d.name}\n${d.value}`);

        const color = d3.scaleOrdinal(d3.schemeCategory10); // 创建颜色比例尺

        // 创建一个字典，用于存储每个节点的索引及其颜色
        const nodeColorMap = {};
        nodes.forEach((node, index) => {
            nodeColorMap[node.index] = color(index);
        });

        const link = svg.append("g")
            .selectAll("path")
            .data(links)
            .enter().append("path")
            .attr("d", d3.linkHorizontal()
                .source(d => [d.source.x1, (d.source.y0 + d.source.y1) / 2])
                .target(d => [d.target.x0, (d.target.y0 + d.target.y1) / 2])
            )
            .attr("fill", "none")
            .attr("stroke", d => nodeColorMap[d.source.index]) // 使用节点索引对应的颜色
            .attr("stroke-opacity", 0.3) // 设置透明度
            .attr("stroke-width", d => Math.max(1, d.width / 2)); // 减少线条宽度

        link.append("title")
            .text(d => `${d.source.name} → ${d.target.name}\n${d.value}`);

        // 添加节点文字
        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
            .attr("y", d => (d.y1 + d.y0) / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
            .text(d => d.name)
            .style("fill", "white")


    }, [data]); // 确保在数据变化时更新图表

    return <svg ref={ref}></svg>;
};

export default SankeyChart;
