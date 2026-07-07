import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Header from "./Header";
import right from "../assets/right.png";
import left from "../assets/Rectangle 2778 (2).png"
import buttin from "../assets/buttin-icon-shrunk.png";
import Button from "../assets/button.png";
export default function Homepage() {
  const navigate = useNavigate();
  const [hoveredAction, setHoveredAction] = useState(null);

  return (
    <div className="homepage">
      <Header />

      <main className={`hero ${hoveredAction ? `hero--hover-${hoveredAction}` : ""}`}>
        
<div className="homediamond">
  <div className="homediamond1">
    <img src={right} alt="" className="homediamond__left"/>
        <button
          className="heroAction heroAction--left"
          type="button"
          onMouseEnter={() => setHoveredAction("left")}
          onMouseLeave={() => setHoveredAction(null)}
        >
          <img src={buttin} alt="" className=" heroAction__icon--left" />
          <span>DISCOVER A.I.</span>
        </button>

        <h1 className="mainTitle">
          Sophisticated
          <br />
          skincare
        </h1>
<img src={left} alt=" " className="homediamond--right"/>
        <button
          className="heroAction heroAction--right"
          type="button"
          onMouseEnter={() => setHoveredAction("right")}
          onMouseLeave={() => setHoveredAction(null)}
          onClick={() => navigate("/testing")}
        >
                    <img src={Button} alt="" className=" heroAction__icon--right" />

          <span>TAKE TEST</span>
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