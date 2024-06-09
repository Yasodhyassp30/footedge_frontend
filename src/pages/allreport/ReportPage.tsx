

import React, { useRef, useState } from 'react';
import CombinedKdePlot from './charts/CombinedKdePlot';
import PlayerDistanceBarChart from './charts/PlayerDistanceBarChart';
import PlayerPassingBarChart from './charts/PlayerPassingBarChart'; 
import TeamDistanceLineChart from './charts/TeamDistanceLineChart';
import TeamPassingLineChart from './charts/TeamPassingLineChart'; 
import TeamTimelineChart from './charts/TeamTimelineChart'; 
import TeamPassingPieChart from './charts/TeamPassingPieChart'; 
import PlayerPassingAccuracyBarChart from './charts/PlayerPassingAccuracyBarChart'; 
import PlayerFilter from './filter/PlayerFilter';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './report.css';

const ReportPage: React.FC = () => {
  const teamMatrixRef = useRef<HTMLDivElement>(null);
  const playerMatrixRef = useRef<HTMLDivElement>(null);
  const [filteredPlayerIds, setFilteredPlayerIds] = useState<string[]>([]);

  const downloadPDF = (matrixRef: React.RefObject<HTMLDivElement>, filename: string) => {
    const pdf = new jsPDF();

    html2canvas(matrixRef.current!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save(`${filename}.pdf`);
    });
  };

  const handleApplyFilter = (ids: string[]) => {
    setFilteredPlayerIds(ids);
  };

  return (
    <div className="newreports-container">
      <div className="dots-container">
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
      </div>
      <PlayerFilter onApplyFilter={handleApplyFilter} />
      <div className="section" ref={teamMatrixRef}>
        <div className="section-header">
          <h2>Team Matrices</h2>
          <div className="download-button" onClick={() => downloadPDF(teamMatrixRef, 'Team_Matrices')}>
            Download Team Matrices
          </div>
        </div>
        <h3 className="subtitle">Combined KDE Plots for Each Team</h3>
        <div className="section-content">
          <CombinedKdePlot filteredPlayerIds={filteredPlayerIds} />
        </div>
        <h3 className="subtitle">Team Distances Covered Over Time</h3>
        <div className="section-content">
          <TeamDistanceLineChart filteredPlayerIds={filteredPlayerIds} />
        </div>
        <h3 className="subtitle">Team Passings Over Time</h3>
        <div className="section-content">
          <TeamPassingLineChart filteredPlayerIds={filteredPlayerIds} />
        </div>
        <h3 className="subtitle">Team Passing Timeline</h3>
        <div className="section-content">
          <TeamTimelineChart filteredPlayerIds={filteredPlayerIds} />
        </div>
        <h3 className="subtitle">Passing Accuracy by Team</h3>
        <div className="section-content">
          <TeamPassingPieChart filteredPlayerIds={filteredPlayerIds} />
        </div>
      </div>

      <div className="section" ref={playerMatrixRef}>
        <div className="section-header">
          <h2>Player Matrices</h2>
          <div className="download-button" onClick={() => downloadPDF(playerMatrixRef, 'Player_Matrices')}>
            Download Player Matrices
          </div>
        </div>
        <h3 className="subtitle">Player Distance Covered</h3>
        <div className="section-content">
          <PlayerDistanceBarChart filteredPlayerIds={filteredPlayerIds} />
        </div>
        <h3 className="subtitle">Player Passings</h3>
        <div className="section-content">
          <PlayerPassingBarChart filteredPlayerIds={filteredPlayerIds} />
        </div>
        <h3 className="subtitle">Passing Accuracy by Player</h3>
        <div className="section-content">
          <PlayerPassingAccuracyBarChart filteredPlayerIds={filteredPlayerIds} />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;