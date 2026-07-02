import React, { useEffect}  from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import "./Select.css";
import {useLocation} from "react-router-dom";
export default function Select() {
const navigate = useNavigate();
const location = useLocation();
const analysis =location.state?.analysis;
  return (
    <div>
        <Header/>
        <div className="pageHighlight">
          <div>
            <h2>A.I.ANALYSIS</h2>
            <h4>A.I. has estimated the following.</h4>
            <h5>Fix estimated information if needed.</h5>
            </div>
        
        <div className="selectDiamondContainer">
          <div className="selectDiamond top" onClick={()=>navigate("/Summary")}>
             DEMOGRAPICS
          </div>
          <div className="selectDiamond left">
            COSMETIC CONCERNS
          </div>
          <div className="selectDiamond right">
            SKIN TYPE DETAIL
          </div>
          <div className="selectDiamond bottom">
            WEATHER
          </div>
        </div>
    </div>
    </div>
  )
}
