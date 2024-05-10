import React from 'react';
import logo1 from '../Images/xbus.png';
import logo2 from '../Images/exceed.jpeg';
import logo3 from '../Images/Sprinta.png';
import logo4 from '../Images/progresslead.png';
import logo5 from '../Images/addends.png';
import logo6 from '../Images/Podium-System.png';
import logo7 from '../Images/analytic.jpg';
import logo8 from '../Images/learninglead.jpg';
import logo9 from '../Images/SwCG.png';


const LogoGrid = () => {
  return (
    <div className="logo-grid">
       <img src={logo1} alt="Logo 1" style={{ maxWidth: '120px', height: 'auto', marginRight: '50px' }} />
       <img src={logo2} alt="Logo 2" style={{ maxWidth: '110px', height: 'auto', marginRight: '50px' }} />
      <img src={logo3} alt="Logo 3" style={{ maxWidth: '140px', height: 'auto', marginRight: '50px' }} />
      <img src={logo4} alt="Logo 4" style={{ maxWidth: '120px', height: 'auto', marginRight: '50px' }} />
      <img src={logo5} alt="Logo 5" style={{ maxWidth: '120px', height: 'auto', marginRight: '50px' }} />
      <img src={logo6} alt="Logo 6" style={{ maxWidth: '120px', height: 'auto', marginRight: '50px' }} />
      <img src={logo7} alt="Logo 7" style={{ maxWidth: '160px', height: 'auto', marginRight: '50px' }} />
      <img src={logo8} alt="Logo 8" style={{ maxWidth: '150px', height: 'auto', marginRight: '50px' }} />
      <img src={logo9} alt="Logo 9" style={{ maxWidth: '120px', height: 'auto', marginRight: '50px' }} />
     
    </div>
  );
};

export default LogoGrid;
