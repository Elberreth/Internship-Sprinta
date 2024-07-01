import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminPages from "./Pages/AdminPage";
import UserProfile from "./Pages/UserProfile"; 
import "./CSS/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [resetFormTrigger, setResetFormTrigger] = useState(false);

  const handleResetRegisterForm = useCallback(() => {
    setResetFormTrigger((prev) => !prev);
  }, []);

  return (
    <Router>
      <div>
        <Header onResetRegisterForm={handleResetRegisterForm} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={<Register resetFormTrigger={resetFormTrigger} />}
          />
          <Route path="/admin" element={<AdminPages />} />
          <Route path="/user/:username" element={<UserProfile />} /> {/* Uppdaterad rutt för UserProfile */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


