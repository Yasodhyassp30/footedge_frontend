import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';

interface PlayerPassingBarChartProps {
  filteredPlayerIds: string[];
}

const PlayerPassingBarChart: React.FC<PlayerPassingBarChartProps> = ({ filteredPlayerIds }) => {
  const [team1Passings, setTeam1Passings] = useState([]);
  const [team2Passings, setTeam2Passings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reports/passings?filterIds=${filteredPlayerIds.join(',')}`);
        const formatData = (data: any) => data.map((player: any) => ({
          player: player.name || `Player ${player.id}`,
          passings: player.passings
        }));

        setTeam1Passings(formatData(response.data.team1_passings));
        setTeam2Passings(formatData(response.data.team2_passings));
      } catch (error) {
        console.error("Error fetching player passings", error);
      }
    };

    fetchData();
  }, [filteredPlayerIds]);

  const team1Colors = ['#8B0000', '#A52A2A', '#B22222', '#DC143C', '#FF0000'];
  const team2Colors = ['#00008B', '#0000CD', '#1E90FF', '#4169E1', '#4682B4'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ height: 400, width: '45%' }}>
        <h3 style={{ textAlign: 'center', color: 'darkred' }}>Team 1 Passings</h3>
        <ResponsiveBar
          data={team1Passings}
          keys={['passings']}
          indexBy="player"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={({ index }) => team1Colors[index % team1Colors.length]}
          borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
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
            legend: 'Passings',
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
          role="application"
          ariaLabel="Player passing bar chart"
          barAriaLabel={e => `${e.id}: ${e.formattedValue} passings in player: ${e.indexValue}`}
        />
      </div>
      <div style={{ height: 400, width: '45%' }}>
        <h3 style={{ textAlign: 'center', color: 'darkblue' }}>Team 2 Passings</h3>
        <ResponsiveBar
          data={team2Passings}
          keys={['passings']}
          indexBy="player"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={({ index }) => team2Colors[index % team2Colors.length]}
          borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
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
            legend: 'Passings',
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
          role="application"
          ariaLabel="Player passing bar chart"
          barAriaLabel={e => `${e.id}: ${e.formattedValue} passings in player: ${e.indexValue}`}
        />
      </div>
    </div>
  );
};

export default PlayerPassingBarChart;
