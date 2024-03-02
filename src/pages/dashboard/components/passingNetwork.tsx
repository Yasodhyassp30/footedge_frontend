import * as d3 from "d3";
import React, { useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/combinedReducers";

export default function PassingNetwork() {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const data = useSelector((state:RootState) => state.tacticalAnalysis.ball);

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
              .attr("cx", "16%")
              .attr("cy", "50%")
              .attr("r", "10%")
              .attr("fill", "none")
              .attr("stroke", "white")
              .attr("stroke-width", 5);
      
            svg
              .append("circle")
              .attr("cx", "84%")
              .attr("cy", "50%")
              .attr("r", "10%")
              .attr("fill", "none")
              .attr("stroke", "white")
              .attr("stroke-width", 5);
      
            svg
              .append("rect")
              .attr("x", "0%")
              .attr("y", "22.5%")
              .attr("width", "20%")
              .attr("height", "55%")
              .attr("fill", "green")
              .attr("stroke", "white")
              .attr("stroke-width", 5);
      
            svg
              .append("rect")
              .attr("x", "80%")
              .attr("y", "22.5%")
              .attr("width", "20%")
              .attr("height", "55%")
              .attr("fill", "green")
              .attr("stroke", "white")
              .attr("stroke-width", 5);
      
            svg
              .append("rect")
              .attr("x", "0%")
              .attr("y", "37.5%")
              .attr("width", "8%")
              .attr("height", "25%")
              .attr("fill", "none")
              .attr("stroke", "white")
              .attr("stroke-width", 5);
      
            svg
              .append("rect")
              .attr("x", "92%")
              .attr("y", "37.5%")
              .attr("width", "8%")
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
            svg.selectAll("line.connection").remove();
            svg.selectAll("line.connection")
            .data(data.slice(0, data.length - 1))
            .enter()
            .append("line")
            .attr("class", "connection")
            .attr("x1", (d) => `${d.Tcoordinates[0]/1680*100}%`)
            .attr("y1", (d) => `${d.Tcoordinates[1]/1080*100}%`)
            .attr("x2", (d, i) => `${data[i + 1].Tcoordinates[0]/1680*100}%`) 
            .attr("y2", (d, i) => `${data[i + 1].Tcoordinates[1]/1080*100}%`) 
            .attr("stroke", "black")
            .attr("stroke-width", 5);
            svg.selectAll("circle.point")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "point")
                .attr("cx", (d) => `${d.Tcoordinates[0]/1680*100}%`)
                .attr("cy", (d) => `${d.Tcoordinates[1]/1080*100}%`)
                .attr("r", 10)
                .attr("fill", (d) => (`rgb(${d.color[2]}, ${d.color[1]}, ${d.color[0]})`)).raise();
            

        }
    }, [data]);
    

        
  
  
    return (
        <div style={{ height: "100%",width:"100%" }}>
          <svg
            ref={svgRef}
            width="480"
            height="320"
            viewBox="0 0 480 320"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: "block",height: "100%",width:"100%" }}></svg>
    
    
        </div>
      );
}