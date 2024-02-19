import React from 'react';

function Navbar() {
  const navbarStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '50px', 
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

  return (
    <div style={navbarStyle}>
      <img src="logo.png" alt="Logo" style={logoStyle} />
      <span style={footedgeStyle}>FOOTEDGE</span> <span style={proStyle}> Pro</span>
    </div>
  );
}

export default Navbar;
