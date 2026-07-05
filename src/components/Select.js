import {useNavigate} from "react-router-dom";
import Header from "./Header";
import "./Select.css";
export default function Select() {
const navigate = useNavigate();

  const handleDemographicsClick = () => {
    try {
      const stored = localStorage.getItem('skinstricAnalysis');
      if (stored) {
        navigate('/Summary', { state: { analysis: JSON.parse(stored) } });
        return;
      }
    } catch (error) {
      console.error('Failed to read stored analysis:', error);
    }

    navigate('/Summary');
  };

  return (
    <div>
        <Header/>
        <div className="pageHighlight">
          <div className="para">
            <h2 className="title">A.I.ANALYSIS</h2>
            <h4 className="smallTitle">A.I. has estimated the following.</h4>
            <h5 className="sub-title">Fix estimated information if needed.</h5>
            </div>
        
        <div className="selectDiamondContainer">
          <div className="selectDiamond top" onClick={handleDemographicsClick}>
             DEMOGRAPHICS
          </div>
          <div className="selectDiamond left">
COSMETIC CONCERNS
          </div>
          <div className="selectDiamond right">
 SKIN TYPE DETAILS
          </div>
          <div className="selectDiamond bottom">
            WEATHER
          </div>
        </div>
    </div>
    </div>
  )
}
