// src/components/SoccerFieldGraph.tsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Soccerfield: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const svgHeight = svgRef.current.clientHeight;
      const svgWidth = svgRef.current.clientWidth;

      svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "None")
      .attr("stroke", "black")
      .attr("stroke-width", 5);
      svg
        .append("circle")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "10%")
        .attr("fill", "none")
        .attr("stroke", "black").attr("stroke-width", 5);
      svg
        .append("circle")
        .attr("cx", "12%")
        .attr("cy", "50%")
        .attr("r", "10%")
        .attr("fill", "none")
        .attr("stroke", "black").attr("stroke-width", 5);

      svg
        .append("circle")
        .attr("cx", "88%")
        .attr("cy", "50%")
        .attr("r", "10%")
        .attr("fill", "none")
        .attr("stroke", "black").attr("stroke-width", 5);
      svg
        .append("rect")
        .attr("x", "0%")
        .attr("y", "22.5%")
        .attr("width", "16%")
        .attr("height", "55%")
        .attr("fill", "white")
        .attr("stroke", "black").attr("stroke-width", 5);
      svg
        .append("rect")
        .attr("x", "84%")
        .attr("y", "22.5%")
        .attr("width", "16%")
        .attr("height", "55%")
        .attr("fill", "white")
        .attr("stroke", "black").attr("stroke-width", 5);
      svg
        .append("rect")
        .attr("x", "0%")
        .attr("y", "37.5%")
        .attr("width", "6%")
        .attr("height", "25%")
        .attr("fill", "none")
        .attr("stroke", "black").attr("stroke-width", 5);

      svg
        .append("rect")
        .attr("x", "94%")
        .attr("y", "37.5%")
        .attr("width", "6%")
        .attr("height", "25%")
        .attr("fill", "white")
        .attr("stroke", "black").attr("stroke-width", 5);


      svg
        .append("line")
        .attr("x1", "50%")
        .attr("y1", "0%")
        .attr("x2", "50%")
        .attr("y2", "100%")
        .attr("stroke", "black").attr("stroke-width", 5);
  
        svg
        .selectAll("circle.points")
        .data([])
        .enter()
        .append("circle")
        .attr("class", "points")
        .attr("cx", (d) => (d[0] / 100) * svgWidth) 
        .attr("cy", (d) => (d[1] / 100) * svgHeight) 
        .attr("r", 5)
        .attr("fill", "red")
        .attr("stroke", "black")
        .attr("stroke-width", 3);
  
    }
  }, []);

  return (
<div style={{height: "100%", minHeight: "320px", minWidth: "480px", }}>
  <svg
    ref={svgRef}
    width="480"
    height="320"
    style={{ display: "block", width: "100%", height: "100%", }}
  >
    {/* SVG content will be rendered here */}
  </svg>
</div>
  );
};

export default Soccerfield;
