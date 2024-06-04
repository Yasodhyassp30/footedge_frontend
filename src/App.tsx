import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AnnotationComponent from './pages/annotation';
import Login from './pages/authentication/login';
import Register from './pages/authentication/registration';
import Dashboard from './pages/dashboard/index';
import Navbar from './pages/navbar';

import ScoutingDashboard from "./pages/scouting/ScoutingDashBoard";
import { authSlice } from './reducers/authReducer';
import { RootState } from './reducers/combinedReducers';
import ReportPage from './pages/allreport/ReportPage';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    dispatch(authSlice.actions.login());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/annotate" element={!user.token?<Navigate to="/login"/>:<AnnotationComponent />} />
            <Route path="/scouting" element={!user.token?<Navigate to="/login"/>:<ScoutingDashboard />} />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/login" element={user.token?<Navigate to="/"/>:<Login />} />
            <Route path="/register" element={user.token?<Navigate to="/"/>:<Register />} />
          </Routes>
    </div>
  );
}

export default App;
