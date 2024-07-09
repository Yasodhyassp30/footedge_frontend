import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { IconButton } from '@mui/material';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const [open,setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawer = () => {
    setOpen(!open);
  }
  const location = useNavigate()
  const drawerStyle:React.CSSProperties = {
    width: '250px',
    height: 'calc(100% - 70px)',
    backgroundColor: '#27374D',
    color: 'white',
    position: 'fixed',
    left: open ? '0' : '-100%',
    top: '70px',
    transition: 'all 0.3s ease-in-out',
    zIndex: 100,
    padding: '20px',
  }
  const navbarStyle:React.CSSProperties = {
    width: '100%',
    backgroundColor: '#27374D',
    color: 'white',
    padding: '15px',
    fontWeight: 'bold',
    display: 'flex',
    position: 'fixed',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 100,
  };

  const logoStyle = {
    marginRight: '10px',
    height: '20px',
    fit: 'stretch',
  };

  const footedgeStyle = {
    fontFamily: 'Brush Script MT, cursive', 
  };

  const proStyle = {
    fontFamily: 'Impact, fantasy', 
    marginLeft: '5px',  
  };

  const buttons = [
    {
      name: 'Dashboard',
      link: '/',
      icon: <DashboardIcon />
    },
    {
      name: 'Annotation',
      link: '/annotate',
      icon: <AssignmentIcon />
    },
    {
      name: 'Players',
      link: '/players',
      icon: <SupervisorAccountIcon />
    },
    {
      name: 'Scouting',
      link: '/scouting',
      icon: <SportsSoccerIcon />
    },
    {
      name: 'Reports',
      link: '/reports',
      icon: <DescriptionIcon />
    }
  ];
  

  const navigateTo = (link:string) => {
    navigate(link);
    setOpen(false); 
  };
  return (
    <div style={navbarStyle}>
      <div style={drawerStyle}>
      {buttons.map((button, index) => (
  <Button
    key={index}
    type="primary"
    style={{ width: '100%', marginBottom: '10px', border: 'none', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
    onClick={() => navigateTo(button.link)}
  >
    {button.icon} 
    <span style={{marginLeft: '10px'}}>
    {button.name} 
    </span>
  </Button>
))}

      </div>
      <IconButton sx={{
        color: 'white',
      
      }}
      onClick={handleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <img src="logo.png" alt="Logo" style={logoStyle} />
      <span style={footedgeStyle}>FOOTEDGE</span> <span style={proStyle}> Pro</span>
    </div>
  );
}

export default Navbar;
