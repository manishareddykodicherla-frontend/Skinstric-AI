import React, { useEffect, useState } from 'react';
import buttinIcon from "../assets/buttin-icon-shrunk.png";
import "./Analysis.css";
import Header from './Header';
import { useNavigate } from 'react-router-dom';

export default function Analysis() {
    const navigate = useNavigate();
    const [step, setStep] = useState("name");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const [dots, setDots] = useState(".");

    useEffect(() => {
        if (step !== "loading") return;

        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
        }, 400);

        return () => clearInterval(interval);
    }, [step]);

    const handleNameEnter = (e) => {
        if (e.key !== "Enter")return; 
            if (!name.trim()) {
                setError("Please enter your name");
                return;
            }
            setError("");
            setStep("location");
        
    };

    const handleLocationEnter =async (e) => {
        if (e.key === "Enter") {
            if (!location.trim()) {
                setError("Please enter your location");
                return;
            }
            setError("");
            setStep("loading");
            setTimeout(() => setStep("done"), 1800);
        }
    
const userData={name :name,
    location :location,};
    console.log(userData)
try{
    const response= await fetch("https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",{
    method:"POST",
    headers:{"Content-Type": "application/json",      
    },
    body:JSON.stringify({
        name:name.trim(),
        location:location.trim(),
    }),
})
const data = await response.json();
console.log(data);
localStorage.setItem("skinstricUser",JSON.stringify(userData))
navigate("/testing");
}
catch (error) {
    console.error("Error submitting analysis:", error);
}
    };
    return (
        <div>
            <Header />
            <div className="analysisleft">
                <p> Start Analysis</p>
            </div>
            <div className="analysisContainer">
                <div className="diamond diamond1"></div>
                <div className="diamond diamond2"></div>
                <div className="diamond diamond3"></div>

                <div className="content">
                    <p className="contentpara">
                        {step === "name"
                            ? "CLICK TO TYPE"
                            : step === "location"
                            ? "ENTER LOCATION"
                            : step === "loading"
                            ? "PROCESSING SUBMISSION"
                            : "THANK YOU"}
                    </p>

                    {step === "name" ? (
                        <>
                            <input
                                className="nameInput"
                                placeholder="Introduce yourself"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={handleNameEnter}
                            />
                            {error && <p className="errorText">{error}</p>}
                        </>
                    ) : step === "location" ? (
                        <>
                            <p className="nameDisplay">Hello, {name}</p>
                            <input
                                className="nameInput"
                                placeholder="Where are you from?"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyDown={handleLocationEnter}
                            />
                            {error && <p className="errorText">{error}</p>}
                        </>
                    ) : step === "loading" ? (
                        <>
                            <p className="loadingText">Processing submission</p>
                            <p className="loadingDots">{dots}</p>
                        </>
                    ) : (
                        <>

                            <p className="thankYouText">Thank you for submission</p>
                        </>
                    )}
                </div>
            </div>
            <div className="buttons">
            <button className="backButton" onClick={() => navigate("/")}>
                <img src={buttinIcon} alt="" />
                <span>Back</span>
            </button>
            <button className="proceedButton" onClick={() => setStep("done")}>
                <img src={buttinIcon} alt=""/>
                <span>Proceed</span>
            </button>
            </div>
        </div>
    );
}
