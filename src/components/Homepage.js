import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Header from "./Header";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <Header />

      <main className="hero">
        <div className="sideDiamond sideDiamond--left" />
        <div className="sideDiamond sideDiamond--right" />
<div className="rectangle">
  <div className="rectangle__inner">
    
        <button className="heroAction heroAction--left" type="button">
          <span className="heroAction__icon heroAction__icon--left" />
          <span>DISCOVER A.I.</span>
        </button>

        <h1 className="mainTitle">
          Sophisticated
          <br />
          skincare
        </h1>

        <button
          className="heroAction heroAction--right"
          type="button"
          onClick={() => navigate("/testing")}
        >
          <span>TAKE TEST</span>
          <span className="heroAction__icon heroAction__icon--right" />
        </button>

        <p className="description">
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES
          <br />
          A HIGHLY-PERSONALIZED ROUTINE TAILORED TO
          <br />
          WHAT YOUR SKIN NEEDS.
        </p>
        <button className="experience" onClick={()=>navigate("/testing")}>EXPERIENCE</button>
      </div>
      </div>
      </main>
    </div>
  );
}