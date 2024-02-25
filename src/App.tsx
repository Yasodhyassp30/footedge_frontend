
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard';
import Navbar from './pages/navbar';
import AnnotationComponent from './pages/annotation';
import ScoutingDashboard from "./pages/scouting/ScoutingDashBoard";
import Sidebar from './pages/sidebar/sidebar';
import Report from './pages/report/ReportDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Sidebar/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/annotate" element={<AnnotationComponent />} />
            <Route path="/scouting" element={<ScoutingDashboard />} />
            <Route path="/reports" element={<Report />} />
          </Routes>

      </Router>
    </div>
  );
}

export default App;