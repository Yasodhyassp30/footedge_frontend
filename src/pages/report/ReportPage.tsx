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
  const [showTeamMatrices, setShowTeamMatrices] = useState(true);

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

  const switchCategory = (category: string) => {
    setShowTeamMatrices(category === 'team');
  };

  return (
    <div className="newreports-container">
      <div className="report-header">
        <div className="switch-button">
          <button
            className={showTeamMatrices ? 'active' : ''}
            onClick={() => switchCategory('team')}
          >
            Team
          </button>
          <button
            className={!showTeamMatrices ? 'active' : ''}
            onClick={() => switchCategory('player')}
          >
            Player
          </button>
        </div>
      </div>
      <div className="report-content">
        <div className="charts-section">
          {showTeamMatrices ? (
            <div className="section" ref={teamMatrixRef}>
              <div className="section-header">
                <h2>Team Matrices</h2>
                <div className="download-button" onClick={() => downloadPDF(teamMatrixRef, 'Team_Matrices')}>
                  Download Team Matrices
                </div>
              </div>
              <div className="grid-container">
                <div className="grid-item">
                  <CombinedKdePlot filteredPlayerIds={filteredPlayerIds} />
                </div>
                <div className="grid-item">
                  <TeamDistanceLineChart filteredPlayerIds={filteredPlayerIds} />
                </div>
                <div className="grid-item">
                  <TeamPassingLineChart filteredPlayerIds={filteredPlayerIds} />
                </div>
                <div className="grid-item">
                  <TeamTimelineChart filteredPlayerIds={filteredPlayerIds} />
                </div>
                <div className="grid-item">
                  <TeamPassingPieChart filteredPlayerIds={filteredPlayerIds} />
                </div>
              </div>
            </div>
          ) : (
            <div className="section" ref={playerMatrixRef}>
              <div className="section-header">
                <h2>Player Matrices</h2>
                <div className="download-button" onClick={() => downloadPDF(playerMatrixRef, 'Player_Matrices')}>
                  Download Player Matrices
                </div>
              </div>
              <div className="grid-container">
                <div className="grid-item">
                  <PlayerDistanceBarChart filteredPlayerIds={filteredPlayerIds} />
                </div>
                <div className="grid-item">
                  <PlayerPassingBarChart filteredPlayerIds={filteredPlayerIds} />
                </div>
                <div className="grid-item">
                  <PlayerPassingAccuracyBarChart filteredPlayerIds={filteredPlayerIds} />
                </div>
              </div>
            </div>
          )}
        </div>
        <PlayerFilter onApplyFilter={handleApplyFilter} />
      </div>
    </div>
  );
};

export default ReportPage;
