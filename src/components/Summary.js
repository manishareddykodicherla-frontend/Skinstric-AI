import React, { useEffect, useState } from 'react';
import Header from './Header';
import "./Summary.css";

export default function Summary() {
    const [analysisData, setAnalysisData] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('skinstricAnalysis');
        if (stored) {
            setAnalysisData(JSON.parse(stored));
        }
    }, []);

    if (!analysisData) {
        return <h2>Loading...</h2>;
    }

    const race = analysisData?.data?.race || {};
    const age = analysisData?.data?.age || {};
    const gender = analysisData?.data?.gender || {};

    const getHighestValue = (obj) => {
        return Object.entries(obj).reduce((highest, current) =>
            current[1] > highest[1] ? current : highest
        );
    };

    const [raceName, raceScore] = getHighestValue(race);
    const [ageGroup] = getHighestValue(age);
    const [genderName] = getHighestValue(gender);

    const renderBreakdown = (title, values) => (
        <div className="dataGroup">
            <h4>{title}</h4>
            {Object.entries(values)
                .sort((a, b) => b[1] - a[1])
                .map(([name, score]) => (
                    <div key={name} className="metricRow">
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
                        <p>Race</p>
                        <h4>{raceName}</h4>
                    </div>
                    <div className="infoCard">
                        <p>Age</p>
                        <h4>{ageGroup}</h4>
                    </div>
                    <div className="infoCard">
                        <p>Gender</p>
                        <h4>{genderName}</h4>
                    </div>
                </div>

                <div className="summaryCenter">
                    <div className="centerContent">
                        <div className="center">{raceName}</div>
                        <div
                            className="confidenceCircle"
                            style={{
                                '--percent': `${Math.round(raceScore * 100)}%`,
                                '--progress': `${Math.round(raceScore * 360)}deg`
                            }}
                        >
                            <h2>{Math.round(raceScore * 100)}%</h2>
                        </div>
                    </div>
                </div>

                <div className="summaryRight">
                    <div className="rightPanel">
                        <h3>Prediction breakdown</h3>
                        {renderBreakdown('Race', race)}
                
            
                    </div>
                </div>
            </div>
        </div>
    );
}
