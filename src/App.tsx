import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard';
import Soccerfield from './pages/dashboard/components/soccerfield';
import DensityPlot from './pages/dashboard/components/kdePlot';
import Navbar from './pages/navbar';
import AnnotationComponent from './pages/annotation';
import ScoutingDashboard from "./pages/scouting/ScoutingDashBoard";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/annotate" element={<AnnotationComponent />} />
          </Routes>

      </Router>
    </div>
  );
}

export default App;
