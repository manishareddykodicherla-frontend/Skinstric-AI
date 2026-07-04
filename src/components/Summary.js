import React, { useEffect, useState } from 'react';
import Header from './Header';
import "./Summary.css";
import buttonIcon from"../assets/buttin-icon-shrunk.png";
import Button from "../assets/button.png";
import { useNavigate } from 'react-router-dom';
export default function Summary() {
        const navigate=useNavigate();


    const [analysisData, setAnalysisData] = useState(null);
    const [selectedRace, setSelectedRace] = useState('');
    const [selectedRaceScore, setSelectedRaceScore] = useState(0);

    const getHighestValue = (obj) => {
        const entries = Object.entries(obj);
        if (entries.length === 0) {
            return ['', 0];
        }
        return entries.reduce((highest, current) =>
            current[1] > highest[1] ? current : highest
        );
    };

    useEffect(() => {
        const stored = localStorage.getItem('skinstricAnalysis');
        if (stored) {
            setAnalysisData(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        if (analysisData) {
            const race = analysisData?.data?.race || {};
            const [name, score] = getHighestValue(race);
            setSelectedRace(name);
            setSelectedRaceScore(score);
        }
    }, [analysisData]);

    if (!analysisData) {
        return <h2>Loading...</h2>;
    }

    const race = analysisData?.data?.race || {};
    const age = analysisData?.data?.age || {};
    const gender = analysisData?.data?.gender || {};
    const [raceName, raceScore] = getHighestValue(race);
    const [ageGroup] = getHighestValue(age);
    const [genderName] = getHighestValue(gender);






    const renderBreakdown = (title, values, selectedName, onSelect) => (
    
        <div className="dataGroup">
            
            {Object.entries(values)
                .sort((a, b) => b[1] - a[1])
                .map(([name, score]) => (
                    <div
                        key={name}
                        className={`metricRow ${selectedName === name ? 'selected' : ''}`}
                        onClick={() => onSelect?.(name, score)}
                    >
                        <span className={`metricDiamond ${selectedName === name ? 'selected' : ''}`} />
                        <span className="metricName">{name}</span>
                        <span className="metricValue">{Math.round(score * 100)}%</span>
                    </div>
                ))}
        </div>
    );

    return (
        <div>
            <Header/>
            <div className="summaryHeader">
                <p className="summarySmallTitle">A.I.ANALYSIS</p>
                <h1 className="summaryTitle">DEMOGRAPHICS</h1>
                <span className="summarySubtitle">PREDICTED RACE & AGE</span>
            </div>
            <div className="summaryContent">
                <div className="summaryLeft">
                    <div className="infoCard activeCard">
                        <p className="race">Race</p>
                        <h4 classNAme="raceName">{raceName}</h4>
                    </div>
                    <div className="infoCard activeCard1">
                        <p>Age</p>
                        <h4>{ageGroup}</h4>
                    </div>
                    <div className="infoCard activeCard1">
                        <p>Gender</p>
                        <h4>{genderName}</h4>
                    </div>
                </div>

                <div className="summaryCenter">
                    <div className="centerContent">
                        <div className="centerDiamondWrapper">
                            
                            <div className="center">{selectedRace}</div>
                        </div>
                        <div
                            className="confidenceCircle"
                            style={{
                                '--percent': `${Math.round(selectedRaceScore * 100)}%`,
                                '--progress': `${Math.round(selectedRaceScore * 360)}deg`
                            }}
                        >
                            <h2>{Math.round(selectedRaceScore * 100)}%</h2>
                        </div>
                    </div>
                </div>

                <div className="summaryRight">
                    <div className="rightPanel">
                        <div className="predictionHeading">
                            <h4>RACE</h4>
                            <h4>A.I.CONFIDENCE</h4>
                        </div>
                        {renderBreakdown('Race', race, selectedRace, (name, score) => {
                            setSelectedRace(name);
                            setSelectedRaceScore(score);
                        })}
                
            
                    </div>
                </div>
            </div>
            <div className="summaryFooter">
                <div className="summaryFooterInner">
                    <button type="button" className="footerButton footerIconButton" onClick={()=>navigate("/Select")}>
                        <img src={buttonIcon} alt="Icon button" /><span>Back</span>
                    </button>
                    <button type="button" className="footerButton footerTextButton" onClick={()=>navigate("/")}>
                        <img src={Button} className="homeButton" alt=""/>
                    <span>home</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
