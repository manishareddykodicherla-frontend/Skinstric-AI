import React from 'react'
import {useState} from 'react';
import Styles from"../index.css"
import buttinIcon from "../assets/buttin-icon-shrunk.png";
import right from "../assets/right.png"
import left from "../assets/Rectangle 2778 (2).png"

export default function Homepage() {
  const [isDiscoverHover, setIsDiscoverHover]= useState(false);
  const[isTakeTestHover, setIsTakeTestHover]= useState(false);
  return (
    <div>
        <header>
        <div className="nav__left"> 
    <h1>SKINSTRIC</h1> <span>[intro]</span>
    </div>
    <button className="enter__code">Entercode</button>
</header>
<div className="rectangle">
  <div className="diamond"> </div>
  <div className="diamond__inner"></div>
  <img src={right} alt="dotted" className="dottedline"/>
  <button className="button__shrunk"> 
    <img src={buttinIcon} alt=""></img>
    <span>DiscoverAI</span>
    </button>
<h1 className="mainTitle"> Sophisticated <br/>skincare</h1>
<img src={left} alt="dotted" className='dottedline2'/>
<button className="takeTest">
  <img src={buttinIcon} alt=""/>
  <span>Taketest</span>
</button>


<h2 className="description">Skinstric developed an A.I. that creates a
highly-personalized routine tailored to
what your skin needs.

</h2>
<button  className="enterExperience">ENTER EXPERIENCE</button>
</div>
    
    </div>
  )
}
