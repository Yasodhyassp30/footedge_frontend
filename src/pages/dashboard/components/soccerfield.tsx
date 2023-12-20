// src/components/SoccerFieldGraph.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


const Soccerfield: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const svgHeight = svgRef.current.clientHeight;
      const svgWidth = svgRef.current.clientWidth;

      svg
        .append('rect')
        .attr('width', "100%")
        .attr('height', "100%")
        .attr('fill', 'white')
        .attr('stroke', 'black');

      // Draw center circle
      svg
      .append('circle')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '10%')
      .attr('fill', 'none')
      .attr('stroke', 'black');
      svg
      .append('circle')
      .attr('cx', '12%')
      .attr('cy', '50%')
      .attr('r', '10%')
      .attr('fill', 'none')
      .attr('stroke', 'black');

    svg
      .append('circle')
      .attr('cx', '88%')
      .attr('cy', '50%')
      .attr('r', '10%')
      .attr('fill', 'none')
      .attr('stroke', 'black');
      // Draw penalty areas
      svg
      .append('rect')
      .attr('x', 0)
      .attr('y', svgHeight * 0.225)
      .attr('width', '16%')
      .attr('height', svgHeight * 0.55)
      .attr('fill', 'white')
      .attr('stroke', 'black');
      svg
      .append('rect')
      .attr('x', '84%')
      .attr('y', svgHeight * 0.225)
      .attr('width',svgWidth *0.8 )
      .attr('height', svgHeight * 0.55)
      .attr('fill', 'white')
      .attr('stroke', 'black');


      svg
      .append('rect')
      .attr('x', '0%')
      .attr('y', '37.5%')
      .attr('width', '6%')
      .attr('height', '25%')
      .attr('fill', 'none')
      .attr('stroke', 'black');

    svg
      .append('rect')
      .attr('x', '94%')
      .attr('y', '37.5%')
      .attr('width', '6%')
      .attr('height', '25%')
      .attr('fill', 'white')
      .attr('stroke', 'black');


      // Draw middle line
      svg
        .append('line')
        .attr('x1', "0")
        .attr('y1', 0)
        .attr('x2', "0")
        .attr('y2', "100%")
        .attr('stroke', 'black');
        svg
        .append('line')
        .attr('x1', "100%")
        .attr('y1', 0)
        .attr('x2', "100%")
        .attr('y2', "100%")
        .attr('stroke', 'black');     
         svg
        .append('line')
        .attr('x1', "50%")
        .attr('y1', 0)
        .attr('x2', "50%")
        .attr('y2', "100%")
        .attr('stroke', 'black');
      // Draw touch lines
      svg
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', "100%")
        .attr('y2', 0)
        .attr('stroke', 'black');

      svg
        .append('line')
        .attr('x1', "0%")
        .attr('y1', "100%")
        .attr('x2', "100%")
        .attr('y2', "100%")
        .attr('stroke', 'black');
        svg
        .append('line')
        .attr('x1', "0%")
        .attr('y1', "100%")
        .attr('x2', "100%")
        .attr('y2', "100%")
        .attr('stroke', 'black');
        svg
        .append('line')
        .attr('x1', "0%")
        .attr('y1', "100%")
        .attr('x2', "100%")
        .attr('y2', "100%")
        .attr('stroke', 'black');
    }
  }, []);

  return (
    <div style={{margin:"10px",height:"100vh"}}>
    <svg ref={svgRef} width="100%" height={"66%"} style={{ display: 'block' }}>
    {/* SVG content will be rendered here */}
  </svg>
    </div>
  );
};

export default Soccerfield;
