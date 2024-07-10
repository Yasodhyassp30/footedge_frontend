import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import axios from 'axios';

interface TeamPassingLineChartProps {
  filteredPlayerIds: string[];
}

const TeamPassingLineChart: React.FC<TeamPassingLineChartProps> = ({ filteredPlayerIds }) => {
  const [team1Data, setTeam1Data] = useState<number[]>([]);
  const [team2Data, setTeam2Data] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/team_passings', {
      params: {
        filterIds: filteredPlayerIds.join(',')
      }
    })
      .then(response => {
        const data = response.data;
        setTeam1Data(data.team1_passings || []);
        setTeam2Data(data.team2_passings || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching team passings", error);
        setLoading(false);
      });
  }, [filteredPlayerIds]);

  const formatData = (teamData: number[], teamName: string) => {
    return {
      id: teamName,
      color: teamName === 'Team 1' ? 'red' : 'blue',
      data: teamData.map((passings, index) => ({
        x: index,
        y: passings
      }))
    };
  };

  const lineChartData = [
    formatData(team1Data, 'Team 1'),
    formatData(team2Data, 'Team 2')
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h3 style={{ textAlign: 'center', color: 'darkred' }}>Cumulative Team Passings Over Time</h3>
      <ResponsiveLine
        data={lineChartData}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Passings',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        colors={lineChartData.map(d => d.color)}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: 'black'
              }
            },
            legend: {
              text: {
                fill: 'black'
              }
            }
          },
          legends: {
            text: {
              fill: 'black'
            }
          },
          tooltip: {
            container: {
              color: 'black'
            }
          }
        }}
      />
    </div>
  );
};

export default TeamPassingLineChart;
