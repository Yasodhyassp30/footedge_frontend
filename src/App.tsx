
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AnnotationComponent from './pages/annotation';
import Login from './pages/authentication/login';
import Register from './pages/authentication/registration';
import Dashboard from './pages/dashboard';
import Navbar from './pages/navbar';
import Report from './pages/report/ReportDashboard';
import ScoutingDashboard from './pages/scouting/ScoutingDashBoard';
import { authSlice } from './reducers/authReducer';
import { RootState } from './reducers/combinedReducers';
import store from './store/store';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    dispatch(authSlice.actions.login())
  },[])
  
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;