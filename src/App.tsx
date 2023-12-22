import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard';
import Soccerfield from './pages/dashboard/components/soccerfield';
import DensityPlot from './pages/dashboard/components/kdePlot';

function App() {
  return (
    <div className="App">
      <Dashboard/>
    </div>
  );
}

export default App;
