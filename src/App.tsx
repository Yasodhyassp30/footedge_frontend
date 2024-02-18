import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Soccerfield from "./pages/dashboard/components/soccerfield";
import DensityPlot from "./pages/dashboard/components/kdePlot";
import Navbar from "./pages/navbar";
import ScoutingDashboard from "./pages/scouting/ScoutingDashBoard";

function App() {
  return (
    <div className="App">
     <Navbar />
     <Dashboard/>
    </div>
  );
}

export default App;
