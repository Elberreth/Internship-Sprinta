import React from 'react';
import LogoGrid from '../Components/LogoGrid';
import '../CSS/Home.css'; // Importera CSS för startsidan

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Jambiz Alumni Portal</h1>
        <p>A web platform that aims to connect current and former members of the organizations within the Jambiz Group.</p>
      </div>
      <LogoGrid />
    </div>
  );
};

export default Home;









