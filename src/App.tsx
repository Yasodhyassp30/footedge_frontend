import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AnnotationComponent from './pages/annotation';
import Login from './pages/authentication/login';
import Register from './pages/authentication/registration';
import Dashboard from './pages/dashboard/index';
import Navbar from './pages/navbar';

import ReportPage from './pages/allreport/ReportPage';
import ScoutingDashboard from "./pages/scouting/ScoutingDashBoard";
import { authSlice } from './reducers/authReducer';
import { RootState } from './reducers/combinedReducers';
import Players from './pages/dashboard/components/playersComponent';
import AddPlayer from './pages/dashboard/components/addPlayerForm';
import PlayerProfile from './pages/dashboard/components/playerProfileView';

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
            <Route path="/" element={!user.token?<Navigate to="/login"/>:<Dashboard/> } />
            <Route path="/annotate" element={!user.token?<Navigate to="/login"/>:<AnnotationComponent />} />
             <Route path="/players" element={!user.token?<Navigate to="/login"/>:<Players />} />
             <Route path="/add-player" element={!user.token?<Navigate to="/login"/>:<AddPlayer />} />
             <Route path="/add-player/:id" element={!user.token?<Navigate to="/login"/>:<AddPlayer />} />
             <Route path="/player/:id" element={!user.token?<Navigate to="/login"/>:<PlayerProfile />} />
            <Route path="/scouting" element={!user.token?<Navigate to="/login"/>:<ScoutingDashboard />} />
            <Route path="/reports" element={!user.token?<Navigate to="/login"/>:<ReportPage/> } />
            <Route path="/login" element={user.token?<Navigate to="/"/>:<Login />} />
            <Route path="/register" element={user.token?<Navigate to="/"/>:<Register />} />
          </Routes>
    </div>
  );
}

export default App;
