import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { VerticalRectSeries, XAxis, XYPlot, YAxis } from 'react-vis';

interface TeamTimelineChartProps {
  filteredPlayerIds: string[];
}

const TeamTimelineChart: React.FC<TeamTimelineChartProps> = ({ filteredPlayerIds }) => {
  const [team1Data, setTeam1Data] = useState<{ x0: number; x: number; y: number }[]>([]);
  const [team2Data, setTeam2Data] = useState<{ x0: number; x: number; y: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/team_timeline', {
      params: {
        filterIds: filteredPlayerIds.join(',')
      }
    })
      .then(response => {
        const data = response.data;
        const team1Timeline = data.team1_timeline.map((d: any) => ({ x0: d.start, x: d.end, y: 1 }));
        const team2Timeline = data.team2_timeline.map((d: any) => ({ x0: d.start, x: d.end, y: 1 }));

        setTeam1Data(team1Timeline);
        setTeam2Data(team2Timeline);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching team timeline", error);
        setLoading(false);
      });
  }, [filteredPlayerIds]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h3 style={{ textAlign: 'center', color: 'darkred' }}>Team Passing Timeline</h3>
      <XYPlot
        width={1000}
        height={300}
        stackBy="y"
        xType="linear"
      >
        <XAxis />
        <YAxis />
        <VerticalRectSeries
          data={team1Data}
          style={{ stroke: 'rgb(245, 66, 66)', fill: 'rgb(245, 66, 66)' }}
        />
        <VerticalRectSeries
          data={team2Data}
          style={{ stroke: 'rgb(66, 120, 245)', fill: 'rgb(66, 120, 245)' }}
        />
      </XYPlot>
    </div>
  );
};

export default TeamTimelineChart;
