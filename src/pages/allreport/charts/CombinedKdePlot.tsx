import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import '../report.css';

interface CombinedKdePlotProps {
  filteredPlayerIds: string[];
}

const CombinedKdePlot: React.FC<CombinedKdePlotProps> = ({ filteredPlayerIds }) => {
  const svgRefTeam1 = useRef<SVGSVGElement | null>(null);
  const svgRefTeam2 = useRef<SVGSVGElement | null>(null);
  const [team1Data, setTeam1Data] = useState<[number, number][]>([]);
  const [team2Data, setTeam2Data] = useState<[number, number][]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/combined_kde', {
      params: {
        filterIds: filteredPlayerIds.join(',')
      }
    })
      .then(response => {
        console.log("Raw Data:", response.data);
        setTeam1Data(response.data.team1_positions.map((d: any) => [
          d[0] / 100 * 480,
          d[1] / 100 * 320,
        ]));
        setTeam2Data(response.data.team2_positions.map((d: any) => [
          d[0] / 100 * 480,
          d[1] / 100 * 320,
        ]));
      })
      .catch(error => {
        console.error("Error fetching combined KDE data", error);
      });
  }, [filteredPlayerIds]);

  const createKdePlot = (svgRef: React.RefObject<SVGSVGElement>, data: [number, number][], color: string) => {
    if (svgRef.current && data.length > 0) {
      console.log("Plotting data for color:", color, data);
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();

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

      const kde = d3.contourDensity()
        .size([480, 320])
        .x(d => d[0])
        .y(d => d[1])
        .bandwidth(20);

      const densityData = kde(data);

      svg
        .selectAll('path')
        .data(densityData)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('fill', color)
        .attr('opacity', 0.2);
    }
  };

  useEffect(() => {
    createKdePlot(svgRefTeam1, team1Data, 'red');
    createKdePlot(svgRefTeam2, team2Data, 'blue');
  }, [team1Data, team2Data]);

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ flex: 1, padding: '10px', maxWidth: '480px' }}>
        <h2>Team 1</h2>
        <svg
          ref={svgRefTeam1}
          width="480"
          height="320"
          viewBox="0 0 480 320"
          preserveAspectRatio="xMidYMid meet"
          className="mirror"
          style={{ display: "block", height: "100%", width: "100%" }}
        ></svg>
      </div>
      <div style={{ flex: 1, padding: '10px', maxWidth: '480px' }}>
        <h2>Team 2</h2>
        <svg
          ref={svgRefTeam2}
          width="480"
          height="320"
          viewBox="0 0 480 320"
          preserveAspectRatio="xMidYMid meet"
          className="mirror"
          style={{ display: "block", height: "100%", width: "100%" }}
        ></svg>
      </div>
    </div>
  );
};

export default CombinedKdePlot;
