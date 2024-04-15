
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard';
import Navbar from './pages/navbar';
import AnnotationComponent from './pages/annotation';
import ScoutingDashboard from "./pages/scouting/ScoutingDashBoard";
import Sidebar from './pages/sidebar/sidebar';
import Report from './pages/report/ReportDashboard';
import Login from './pages/authentication/login';
import Register from './pages/authentication/registration';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authSlice } from './reducers/authReducer';
import { RootState } from './reducers/combinedReducers';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth)
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