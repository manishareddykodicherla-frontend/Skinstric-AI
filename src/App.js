import Homepage from './components/Homepage.js';
import Analysis from './components/Analysis.js';
import './App.css';
import React from 'react';

import {Routes,Route} from 'react-router-dom';
function App() {
  return (
    <Routes>
<Route path="/" element={<Homepage/>}/>
<Route path="/testing" element={<Analysis/>}/>
    </Routes>
  );
}

export default App;
