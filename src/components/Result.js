import React from 'react'
import Header from "./Header";
import"./Result.css";
import cameraIcon from "../assets/camera.png";
import Ellipse from "../assets/Ellipse 93.png";
import Ellipse2 from "../assets/gallery.png";

export default function Result() {
  return (
    <div>
        <Header/>
        <div className="resultsContainer">
            <div className="reslutsCamera">
                <div className="cameraDiamond1">
                    <div className="cameraDiamond2">
                        <div className="cameraDiamond3">
                        </div>
                    </div>
                </div>
                <div className="camera">
    <img src={cameraIcon} alt="/" className="camera"></img>
</div>

            </div>
            <div className="resultsGallery">
<div className="galleryDiamond1">
    <div className="galleryDiamond2">
        <div className="galleryDiamond3">
            
        </div>
        <div className="gallery">
            <img src={Ellipse} alt="" className="ellipse1" />
            <img src={Ellipse2} alt="" className="ellipse2" />
        </div>
    </div>
</div>
</div>
        </div>
    </div>
  )
}

