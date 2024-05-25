import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminPages from './Pages/AdminPage'; 
import './CSS/App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPages />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;






















