import Homepage from './components/Homepage.js';
import Analysis from './components/Analysis.js';
import './App.css';
import React from 'react';
import Result from "./components/Result.js";


import {Routes,Route} from 'react-router-dom';
function App() {
  return (
    <Routes>
<Route path="/" element={<Homepage/>}/>
<Route path="/testing" element={<Analysis/>}/>
<Route path="/Result" element={<Result/>}/>
    </Routes>
  );
}

export default App;
