// DensityPlot.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DensityPlotProps {
  width: number;
  height: number;
}

const DensityPlot: React.FC<DensityPlotProps> = ({ width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    d3.select(svgRef.current!).selectAll('*').remove();


    const svg = d3
      .select(svgRef.current!)
      .attr('width', width)
      .attr('height', height);

    const data = generateRandomData(1);


    const kde = d3.contourDensity().size([width, height]).x((d) => d[0]).y((d) => d[1]);


    const densityData = kde(data.map(d => [d[0], d[1]]));

    svg
      .selectAll('path')
      .data(densityData)
      .enter()
      .append('path')
      .attr('d', d3.geoPath())
      .attr('fill', (d) => d3.interpolateViridis(d.value))
      .attr('opacity', 0.5);
  }, [width, height]);


  const generateRandomData = (count: number) => {
    return d3.range(count).map(() => [Math.random() * width, Math.random() * height]);
  };

  return <svg ref={svgRef} />;
};

export default DensityPlot;
