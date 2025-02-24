import React from 'react';
import './Home.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';
import logo from '../assets/innovations-lab-logo.png';

const Home = () => {
  return (
    <div className="home-container">
      <div className="company-header">
        <img src={logo} alt="Innovations Lab Logo" className="logo" />
      </div>
      <div className="icons-container">
        <div className="icon-item">
          <div className="icon-circle">
            <AccessTimeIcon sx={{ fontSize: 40, color: '#FF5C5C' }} />
          </div>
          <span className="icon-label">Timesheets</span>
        </div>
        
        <div className="icon-item">
          <div className="icon-circle">
            <InfoIcon sx={{ fontSize: 40, color: '#FF5C5C' }} />
          </div>
          <span className="icon-label">Information</span>
        </div>
      </div>
    </div>
  );
};

export default Home; 