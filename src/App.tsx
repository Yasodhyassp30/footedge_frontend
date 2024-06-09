
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
import { authSlice } from './reducers/authReducer';

function App() {
  const dispatch = useDispatch();
  let user = {token: null}
  if (localStorage.getItem("user")){
    user = JSON.parse(localStorage.getItem("user") || "{}")
  }

  useEffect(() => {
    dispatch(authSlice.actions.login())
  },[])
  
  const invalidSession = user.token === null

  console.log(localStorage.getItem("user"), invalidSession)

  return (
    <div className="App">
        <Navbar/>
          <Routes>
            <Route path="/" element={invalidSession ?<Navigate to="/login"/>:<Dashboard/>} />
            <Route path="/annotate" element={invalidSession ?<Navigate to="/login"/>:<AnnotationComponent />} />
            <Route path="/scouting" element={invalidSession ?<Navigate to="/login"/>:<ScoutingDashboard />} />
            <Route path="/reports" element={invalidSession ?<Navigate to="/login"/>:<Report />} />
            <Route path="/login" element={invalidSession ?<Navigate to="/"/>:<Login />} />
            <Route path="/register" element={invalidSession ?<Navigate to="/"/>:<Register />} />
          </Routes>
    </div>
  );
}

export default App;