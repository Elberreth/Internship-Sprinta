import React from "react";
import LogoGrid from "../Components/LogoGrid";
import "../CSS/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2>
          <b>Welcome to Jambiz Alumni Portal</b>
        </h2>
        <p>
          <h4>
            A web platform that aims to connect current and former members of
            the organisations within the Jambiz Group.
          </h4>
        </p>
      </div>
      <LogoGrid />
    </div>
  );
};

export default Home;
