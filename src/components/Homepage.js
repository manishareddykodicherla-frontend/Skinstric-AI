import React from 'react'
import Styles from"../index.css"
import buttinIcon from "../assets/buttin-icon-shrunk.png";
import right from "../assets/right.png"
import left from "../assets/left.png"
export default function Homepage() {
  return (
    <div>
        <header>
        <div className="nav__left"> 
    <h1>SKINSTRIC</h1> <span>[intro]</span>
    </div>
    <button className="enter__code">Entercode</button>
</header>
<div className="rectangle">
  <img src={right} alt="dotted" className="dottedline"/>
  <button className="button__shrunk"> 
    <img src={buttinIcon} alt=""></img>
    <span>DiscoverAI</span>
    </button>
<h1> Sophisticated skincare</h1>
<img src={left} alt="dotted" className='dottedline2'/>
<button className="takeTest">
  <img src={buttinIcon} alt=""/>
  <span>Taketest</span>
</button>
    </div> 
    </div>
  )
}
