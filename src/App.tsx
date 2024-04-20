
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AnnotationComponent from './pages/annotation';
import Login from './pages/authentication/login';
import Register from './pages/authentication/registration';
import Dashboard from './pages/dashboard';
import Navbar from './pages/navbar';
import Report from './pages/report/ReportDashboard';
import ScoutingDashboard from "./pages/scouting/ScoutingDashBoard";
import { authSlice } from './store/reducers/authReducer';

function App() {
  const dispatch = useDispatch();
  const user = {token: 123};
  useEffect(() => {
    dispatch(authSlice.actions.login())
  },[])
  
  return (
    <div className="App">
        <Navbar/>
          <Routes>
            <Route path="/" element={!user.token?<Navigate to="/login"/>:<Dashboard/>} />
            <Route path="/annotate" element={!user.token?<Navigate to="/login"/>:<AnnotationComponent />} />
            <Route path="/scouting" element={!user.token?<Navigate to="/login"/>:<ScoutingDashboard />} />
            <Route path="/reports" element={!user.token?<Navigate to="/login"/>:<Report />} />
            <Route path="/login" element={user.token?<Navigate to="/"/>:<Login />} />
            <Route path="/register" element={user.token?<Navigate to="/"/>:<Register />} />
          </Routes>
    </div>
  );
}

export default App;