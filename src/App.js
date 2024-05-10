import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';

import Login from './Pages/Login';
import Register from './Pages/Register';
import LogoGrid from './Components/LogoGrid';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <LogoGrid />
      </div>
    </Router>
  );
};

export default App;

















