import Homepage from './components/Homepage.js';
import Analysis from './components/Analysis.js';
import './App.css';
import React from 'react';
import Result from "./components/Result.js";
import Select from "./components/Select.js";
import {Routes,Route} from 'react-router-dom';
import Summary from "./components/Summary.js";
function App() {
  return (
    <Routes>
<Route path="/" element={<Homepage/>}/>
<Route path="/testing" element={<Analysis/>}/>
<Route path="/Result" element={<Result/>}/>
<Route path ="/Select" element={<Select/>}/>
<Route path="/Summary" element={<Summary />}/>
    </Routes>
  );
}

export default App;
