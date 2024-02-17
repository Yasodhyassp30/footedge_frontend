import './App.css';
import Dashboard from './pages/dashboard';
import Navbar from './pages/navbar/navbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import the Sidebar component

function App() {
  return (
    <BrowserRouter> 
      <div className="app-container" style={{ display: 'flex' }}>  
        <div className="content-area"> 
          <Navbar /> 
          <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            <Route path="/dashboard" element={<Dashboard />} /> 
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
