import React, { useEffect, useState } from 'react';
import Header from './Header';
import "./Summary.css";
import buttonIcon from"../assets/buttin-icon-shrunk.png";
import Button from "../assets/button.png";
import { useLocation, useNavigate } from 'react-router-dom';
export default function Summary() {
        const navigate=useNavigate();
        const location = useLocation();

    const [analysisData, setAnalysisData] = useState(() => {
        try {
            const stored = localStorage.getItem('skinstricAnalysis');
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Failed to parse stored analysis:', error);
            return null;
        }
    });
    const [selectedCategory, setSelectedCategory] = useState('race');
    const [selectedLabel, setSelectedLabel] = useState('');
    const [selectedScore, setSelectedScore] = useState(0);
    const [isLoading, setIsLoading] = useState(!analysisData);

    const getHighestValue = (obj) => {
        const entries = Object.entries(obj);
        if (entries.length === 0) {
            return ['', 0];
        }
        return entries.reduce((highest, current) =>
            current[1] > highest[1] ? current : highest
        );
    };

    const formatCategoryTitle = (category) => {
        if (category === 'age') return 'AGE';
        if (category === 'gender') return 'SEX';
        return 'RACE';
    };

    const formatCenterLabel = (category, label) => {
        if (!label) return '';
        if (category === 'age') {
            return `${label} y.o.`;
        }
        return label;
    };

    const selectCategory = (category, values) => {
        const [name, score] = getHighestValue(values || {});
        setSelectedCategory(category);
        setSelectedLabel(name);
        setSelectedScore(score);
    };

    useEffect(() => {
        const routeAnalysis = location?.state?.analysis;
        if (routeAnalysis) {
            setAnalysisData(routeAnalysis);
            localStorage.setItem('skinstricAnalysis', JSON.stringify(routeAnalysis));
            setIsLoading(false);
            return;
        }

        try {
            const stored = localStorage.getItem('skinstricAnalysis');
            if (stored) {
                setAnalysisData(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to parse stored analysis:', error);
        }
        setIsLoading(false);
    }, [location?.state?.analysis]);

    useEffect(() => {
        if (analysisData?.data) {
            const race = analysisData?.data?.race || {};
            const [name, score] = getHighestValue(race);
            setSelectedCategory('race');
            setSelectedLabel(name);
            setSelectedScore(score);
        }
    }, [analysisData]);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (!analysisData?.data) {
        return (
            <div>
                <Header />
                <div className="summaryHeader">
                    <p className="summarySmallTitle">A.I.ANALYSIS</p>
                    <h1 className="summaryTitle">DEMOGRAPHICS</h1>
                </div>
                <div className="summaryContent">
                    <p>No analysis data is available yet. Please go back and complete the analysis first.</p>
                </div>
                <div className="summaryFooter">
                    <div className="summaryFooterInner">
                        <button type="button" className="footerButton footerIconButton" onClick={() => navigate('/Select')}>
                            <img src={buttonIcon} alt="Icon button" /><span>Back</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const race = analysisData?.data?.race || {};
    const age = analysisData?.data?.age || {};
    const gender = analysisData?.data?.gender || {};
    const [raceName] = getHighestValue(race);
    const [ageGroup] = getHighestValue(age);
    const [genderName] = getHighestValue(gender);
    const selectedValues = selectedCategory === 'age'
        ? age
        : selectedCategory === 'gender'
        ? gender
        : race;

    const renderBreakdown = (values, selectedName, onSelect) => (
    
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
                    <button
                        type="button"
                        className={`infoCard ${selectedCategory === 'race' ? 'activeCard' : 'inactiveCard'}`}
                        onClick={() => selectCategory('race', race)}
                    >
                        <p className="race">Race</p>
                        <h4 className="raceName">{raceName}</h4>
                    </button>
                    <button
                        type="button"
                        className={`infoCard ${selectedCategory === 'age' ? 'activeCard' : 'inactiveCard'}`}
                        onClick={() => selectCategory('age', age)}
                    >
                        <p>Age</p>
                        <h4 className="ageGroup">{ageGroup}</h4>
                    </button>
                    <button
                        type="button"
                        className={`infoCard ${selectedCategory === 'gender' ? 'activeCard' : 'inactiveCard'}`}
                        onClick={() => selectCategory('gender', gender)}
                    >
                        <p>Gender</p>
                        <h4>{genderName}</h4>
                    </button>
                </div>

                <div className="summaryCenter">
                    <div className="centerContent">
                        <div className="centerDiamondWrapper">
                            
                            <div className="center">{formatCenterLabel(selectedCategory, selectedLabel)}</div>
                        </div>
                        <div
                            className="confidenceCircle"
                            style={{
                                '--percent': `${Math.round(selectedScore * 100)}%`,
                                '--progress': `${Math.round(selectedScore * 360)}deg`
                            }}
                        >
                            <h2>{Math.round(selectedScore * 100)}%</h2>
                        </div>
                    </div>
                </div>

                <div className="summaryRight">
                    <div className="rightPanel">
                        <div className="predictionHeading">
                            <h4>{formatCategoryTitle(selectedCategory)}</h4>
                            <h4>A.I.CONFIDENCE</h4>
                        </div>
                        {renderBreakdown(selectedValues, selectedLabel, (name, score) => {
                            setSelectedLabel(name);
                            setSelectedScore(score);
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
