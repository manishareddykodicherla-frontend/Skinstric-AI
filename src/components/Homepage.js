import React from 'react'
import {useNavigate} from 'react-router-dom';
import "./Homepage.css"
import buttinIcon from "../assets/buttin-icon-shrunk.png";
import right from "../assets/right.png"
import Header from './Header';
import left from "../assets/Rectangle 2778 (2).png"

export default function Homepage() {
 
  const naviagte= useNavigate();
  return (
    <div>
        <Header/>
<div className="rectangle">
  <div className="homeDiamond"> 
  <div className="homeDiamond__inner">
  <img src={right} alt="dotted" className="dottedline"/>
  <button className="button__shrunk"> 
    <img src={buttinIcon} alt=""></img>
    <span>DiscoverAI</span>
    </button>
<h1 className="mainTitle"> Sophisticated <br/>skincare</h1>
<img src={left} alt="dotted" className='dottedline2'/>
<button className="takeTest" onClick={()=>naviagte("/testing")}>
  <img src={buttinIcon} alt=""/>
  <span>Taketest</span>
</button>


<h2 className="description">Skinstric developed an A.I. that creates a
highly-personalized routine tailored to
what your skin needs.

</h2>
<button  className="enterExperience" onClick={()=>naviagte("/testing")}>ENTER EXPERIENCE</button>
</div>
    </div>
    </div>
    </div>
  )
}
