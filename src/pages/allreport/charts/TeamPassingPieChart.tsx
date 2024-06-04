import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import axios from 'axios';

interface TeamPassingPieChartProps {
  filteredPlayerIds: string[];
}

const TeamPassingPieChart: React.FC<TeamPassingPieChartProps> = ({ filteredPlayerIds }) => {
  const [team1Data, setTeam1Data] = useState<{ id: string, label: string, value: number, color: string }[]>([]);
  const [team2Data, setTeam2Data] = useState<{ id: string, label: string, value: number, color: string }[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/team_pie_passings', {
      params: {
        filterIds: filteredPlayerIds.join(',')
      }
    })
      .then(response => {
        const data = response.data;
        setTeam1Data([
          { id: 'Correct', label: 'Correct', value: data.team1_passes.correct, color: 'rgb(245, 81, 66)' },
          { id: 'Wrong', label: 'Wrong', value: data.team1_passes.wrong, color: 'black' }
        ]);
        setTeam2Data([
          { id: 'Correct', label: 'Correct', value: data.team2_passes.correct, color: 'rgb(66, 135, 245)' },
          { id: 'Wrong', label: 'Wrong', value: data.team2_passes.wrong, color: 'black' }
        ]);
      })
      .catch(error => {
        console.error("Error fetching team passing pie data", error);
      });
  }, [filteredPlayerIds]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ height: 400, width: '45%' }}>
        <h3 style={{ textAlign: 'center', color: 'darkred' }}>Team 1 Passing Accuracy</h3>
        <ResponsivePie
          data={team1Data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ datum: 'data.color' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          
          
          
          
          
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000'
                  }
                }
              ]
            }
          ]}
        />
      </div>
      <div style={{ height: 400, width: '45%' }}>
        <h3 style={{ textAlign: 'center', color: 'darkblue' }}>Team 2 Passing Accuracy</h3>
        <ResponsivePie
          data={team2Data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ datum: 'data.color' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          
          
          
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000'
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </div>
  );
};

export default TeamPassingPieChart;
