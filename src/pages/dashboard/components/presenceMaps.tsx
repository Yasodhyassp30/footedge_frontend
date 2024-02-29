import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { players, totalTeam } from "./teamActivity";

interface PresenceMapsProps {
  data: players[];
}

const PresenceMaps:React.FC<PresenceMapsProps> = ({data}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [keyAreas,setKeyAreas] = useState([
    {
      maxX: 20,
      maxY: 77.5,
      minX:0,
      minY:22.5,
      value : 0
    },
    {
        maxX: 100,
        maxY: 77.5,
        minX:80,
        minY:22.5,
        value : 0
    },
    {
        maxX:20,
        maxY:22.5,
        minX:0,
        minY:0,
        value : 0
    },

    {
        maxX:20,
        maxY:100,
        minX:0,
        minY:77.5,
        value : 0
    },
    {
        maxX:100,
        maxY:22.5,
        minX:80,
        minY:0,
        value : 0
    },

    {
        maxX:100,
        maxY:100,
        minX:80,
        minY:77.5,
        value : 0
    },
    {
        maxX:50,
        maxY:22.5,
        minX:20,
        minY:0,
        value : 0
    },

    {
        maxX:50,
        maxY:100,
        minX:20,
        minY:77.5,
        value : 0
    },
    {
        maxX:80,
        maxY:22.5,
        minX:50,
        minY:0,
        value : 0
    },

    {
        maxX:80,
        maxY:100,
        minX:50,
        minY:77.5,
        value : 0
    },
    {
        maxX:50,
        maxY:40.5,
        minX:20,
        minY:22.5,
        value : 0
    },
    {
        maxX:50,
        maxY:59.5,
        minX:20,
        minY:40.5,
        value : 0
    },
    {
        maxX:80,
        maxY:77.5,
        minX:50,
        minY:59.5,
        value : 0
    },
    {
        maxX:80,
        maxY:40.5,
        minX:50,
        minY:22.5,
        value : 0
    },
    {
        maxX:80,
        maxY:59.5,
        minX:50,
        minY:40.5,
        value : 0
    },
    {
        maxX:50,
        maxY:77.5,
        minX:20,
        minY:59.5,
        value : 0
    }
  ]);

  const assingValue = (dataPoints:{x:number,y:number}[]) => {

    keyAreas.forEach((area,index) => {
      setKeyAreas((prev) => {
        return prev.map((prevArea,index2) => {
          if (index === index2) {
            return {
              ...prevArea,
              value: 0,
            };
          }
          return prevArea;
        });
      })
    })
    keyAreas.forEach((area,index) => {
    dataPoints.forEach((point) => {
        if (
          point.x >= area.minX &&
          point.x < area.maxX &&
          point.y >= area.minY &&
          point.y < area.maxY
        ) {
          setKeyAreas((prev) => {
            return prev.map((prevArea,index2) => {
              if (index === index2) {
                return {
                  ...prevArea,
                  value: prevArea.value + 1,
                };
              }
              return prevArea;
            });
          })
        }
      });
    });

  }

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
        .attr("fill", "none")
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
    
        svg
        .append("line")
        .attr("x1", "20%")
        .attr("y1", "0%")
        .attr("x2", "20%")
        .attr("y2", "100%")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

        svg
        .append("line")
        .attr("x1", "80%")
        .attr("y1", "0%")
        .attr("x2", "80%")
        .attr("y2", "100%")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

        svg
        .append("line")
        .attr("x1", "0%")
        .attr("y1", "22.5%")
        .attr("x2", "100%")
        .attr("y2", "22.50%")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

        svg
        .append("line")
        .attr("x1", "0%")
        .attr("y1", "77.5%")
        .attr("x2", "100%")
        .attr("y2", "77.5%")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

        
        svg
        .append("line")
        .attr("x1", "20%")
        .attr("y1", "37.5%")
        .attr("x2", "80%")
        .attr("y2", "37.5%")
        .attr("stroke", "white")
        .attr("stroke-width", 5);
        
        svg
        .append("line")
        .attr("x1", "20%")
        .attr("y1", "62.5%")
        .attr("x2", "80%")
        .attr("y2", "62.5%")
        .attr("stroke", "white")
        .attr("stroke-width", 5);
    
      keyAreas.forEach((area) => {
        svg
          .append("text")
          .attr("x", `${(area.minX + area.maxX) / 2}%`)
          .attr("y", `${(area.minY + area.maxY) / 2}%`)
          .text(`${area.value}%`)
          .attr("fill", "black ")
          .style("font-size", "20px")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "middle").raise();
      });
    }
  }, []);

  useEffect(() => {
    if (svgRef.current && data.length > 0) {
      const svg = d3.select(svgRef.current);

      svg.selectAll("text").remove();
      const convertedData = data.map((item) => {
        return {
          x: item.coordinates[0] ,
          y: item.coordinates[1]
        };
      })

      assingValue(convertedData);
      

        svg.selectAll("text").data(keyAreas)
          .enter()
          .append("text")
          .attr("x",(d) => `${(d.minX + d.maxX) / 2}%`)
          .attr("y",(d) => `${(d.minY + d.maxY) / 2}%`)
          .text((d) =>`${(d.value/data.length *100).toFixed(1)}%`)
          .attr("fill", "black ")
          .style("font-size", "20px")
          .style("text-anchor", "middle")
          .style("font-weight", "bold")
          .style("alignment-baseline", "middle").raise();
      }
    
    
  }, [data]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <svg
        ref={svgRef}
        width="480"
        height="320"
        viewBox="0 0 480 320"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", height: "100%", width: "100%" }}
      ></svg>
    </div>
  );
};

export default PresenceMaps;
