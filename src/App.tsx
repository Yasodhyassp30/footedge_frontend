import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard';
import Soccerfield from './pages/dashboard/components/soccerfield';
import DensityPlot from './pages/dashboard/components/kdePlot';
import Navbar from './pages/navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Dashboard/>
    </div>
  );
}

export default App;
