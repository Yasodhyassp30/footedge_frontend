// DensityPlot.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { players } from "./teamActivity";

interface DensityPlotProps {

  data:players[]
  color:string
}

const DensityPlot: React.FC<DensityPlotProps> = ({data,color }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg
        .append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "white")
        .attr("stroke", "gray")
        .attr("stroke-width", 5);

      svg
        .append("circle")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "10%")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 5);

      svg
        .append("circle")
        .attr("cx", "16%")
        .attr("cy", "50%")
        .attr("r", "10%")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 5);

      svg
        .append("circle")
        .attr("cx", "84%")
        .attr("cy", "50%")
        .attr("r", "10%")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 5);

      svg
        .append("rect")
        .attr("x", "0%")
        .attr("y", "22.5%")
        .attr("width", "20%")
        .attr("height", "55%")
        .attr("fill", "white")
        .attr("stroke", "gray")
        .attr("stroke-width", 5);

      svg
        .append("rect")
        .attr("x", "80%")
        .attr("y", "22.5%")
        .attr("width", "20%")
        .attr("height", "55%")
        .attr("fill", "white")
        .attr("stroke", "gray")
        .attr("stroke-width", 5);

      svg
        .append("rect")
        .attr("x", "0%")
        .attr("y", "37.5%")
        .attr("width", "8%")
        .attr("height", "25%")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", 5);

      svg
        .append("rect")
        .attr("x", "92%")
        .attr("y", "37.5%")
        .attr("width", "8%")
        .attr("height", "25%")
        .attr("fill", "white")
        .attr("stroke", "gray")
        .attr("stroke-width", 5);

      svg
        .append("line")
        .attr("x1", "50%")
        .attr("y1", "0%")
        .attr("x2", "50%")
        .attr("y2", "100%")
        .attr("stroke", "gray")
        .attr("stroke-width", 5);
    }
  }, []);
  useEffect(() => {
    if (svgRef.current) {
      d3.select(svgRef.current).selectAll('path').remove();
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;
  
      const svg = d3
        .select(svgRef.current)
        .attr('width', width)
        .attr('height', height);
  
      const kde = d3
        .contourDensity()
        .size([width, height])
        .x((d) => d[0])
        .y((d) => d[1]);
  
      const transformedData: [number, number][] = data.map((d) => [
        (d.coordinates[0]/1680)*480,
        (d.coordinates[1]/1080)*320,
      ]);
  
      console.log('Transformed Data:', transformedData);
  
      const densityData = kde(transformedData);
  
      console.log('Density Data:', densityData);
  
      svg
        .selectAll('path')
        .data(densityData)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('fill', color)
        .attr('opacity', 0.2);
    }
  }, [data]);
      


  return (<div style={{ height: "100%", minHeight: "320px", minWidth: "480px" }}>
  <svg
    ref={svgRef}
    width="480"
    height="320"
    viewBox="0 0 480 320"
    preserveAspectRatio="xMidYMid meet"
    style={{ display: "block",height: "100%",width:"100%" }}></svg>


</div>);
};

export default DensityPlot;