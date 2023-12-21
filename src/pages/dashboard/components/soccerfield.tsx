import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { players } from "./teamActivity";
import d3Dsv from "d3-dsv";
interface SoccerfieldProps {
  data: players[];
}

const Soccerfield: React.FC<SoccerfieldProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg
        .append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "green")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

      svg
        .append("circle")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "10%")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

      svg
        .append("circle")
        .attr("cx", "12%")
        .attr("cy", "50%")
        .attr("r", "10%")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

      svg
        .append("circle")
        .attr("cx", "88%")
        .attr("cy", "50%")
        .attr("r", "10%")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

      svg
        .append("rect")
        .attr("x", "0%")
        .attr("y", "22.5%")
        .attr("width", "16%")
        .attr("height", "55%")
        .attr("fill", "green")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

      svg
        .append("rect")
        .attr("x", "84%")
        .attr("y", "22.5%")
        .attr("width", "16%")
        .attr("height", "55%")
        .attr("fill", "green")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

      svg
        .append("rect")
        .attr("x", "0%")
        .attr("y", "37.5%")
        .attr("width", "6%")
        .attr("height", "25%")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

      svg
        .append("rect")
        .attr("x", "94%")
        .attr("y", "37.5%")
        .attr("width", "6%")
        .attr("height", "25%")
        .attr("fill", "green")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

      svg
        .append("line")
        .attr("x1", "50%")
        .attr("y1", "0%")
        .attr("x2", "50%")
        .attr("y2", "100%")
        .attr("stroke", "white")
        .attr("stroke-width", 5);
    }
  }, []);
  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      svg.selectAll("circle.point").remove();
      svg
        .selectAll("circle.point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "point") 
        .attr("cx", (d) => `${(d.coordinates[0]/1680)*100}%`)
        .attr("cy", (d) => `${(d.coordinates[1]/1080)*100}%`)
        .attr("r", 5)
        .attr("fill", (d) => `rgb(${d.color[2]}, ${d.color[1]}, ${d.color[0]})`)
        .attr("stroke", "white")
        .attr("stroke-width", 5);
    }

    
  }, [data]);
  

  return (
    <div style={{ height: "100%", minHeight: "320px", minWidth: "480px" }}>
      <svg
        ref={svgRef}
        width="480"
        height="320"
        viewBox="0 0 480 320"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block",height: "100%",width:"100%" }}></svg>


    </div>
  );
};

export default Soccerfield;
