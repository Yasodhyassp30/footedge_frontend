import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';

interface PlayerPassingAccuracyBarChartProps {
  filteredPlayerIds: string[];
}

const PlayerPassingAccuracyBarChart: React.FC<PlayerPassingAccuracyBarChartProps> = ({ filteredPlayerIds }) => {
  const [team1Passings, setTeam1Passings] = useState<{ id: string, correct: number, wrong: number, color: string }[]>([]);
  const [team2Passings, setTeam2Passings] = useState<{ id: string, correct: number, wrong: number, color: string }[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/player_pie_passings', {
      params: {
        filterIds: filteredPlayerIds.join(',')
      }
    })
      .then(response => {
        const data = response.data;
        setTeam1Passings(data.team1_passings.map((player: any) => ({
          player: player.id,
          correct: player.correct,
          wrong: player.wrong,
          color: `rgb(${player.color[0]},${player.color[1]},${player.color[2]})`
        })));
        setTeam2Passings(data.team2_passings.map((player: any) => ({
          player: player.id,
          correct: player.correct,
          wrong: player.wrong,
          color: `rgb(${player.color[0]},${player.color[1]},${player.color[2]})`
        })));
      })
      .catch(error => {
        console.error("Error fetching player passing pie data", error);
      });
  }, [filteredPlayerIds]);

  const team1Colors = ['rgb(245, 81, 66)', 'black'];
  const team2Colors = ['rgb(66, 135, 245)', 'black'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ height: 400, width: '45%' }}>
        <h3 style={{ textAlign: 'center', color: 'darkred' }}>Team 1 Passing Accuracy</h3>
        <ResponsiveBar
          data={team1Passings}
          keys={['correct', 'wrong']}
          indexBy="player"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={({ id, data }) => id === 'correct' ? team1Colors[0] : team1Colors[1]}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Player',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Passes',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
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
      <div style={{ height: 400, width: '45%' }}>
        <h3 style={{ textAlign: 'center', color: 'darkblue' }}>Team 2 Passing Accuracy</h3>
        <ResponsiveBar
          data={team2Passings}
          keys={['correct', 'wrong']}
          indexBy="player"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={({ id, data }) => id === 'correct' ? team2Colors[0] : team2Colors[1]}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Player',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Passes',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
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
    </div>
  );
};

export default PlayerPassingAccuracyBarChart;
