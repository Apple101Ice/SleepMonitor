import './App.css';
import './Custom/styles.css'
import React, { useState } from 'react'
import SleepChart from './Components/SleepChart';
import DataTable from './Components/DataTable';
import { sample1, sample2, sample3 } from './Helper/Helper'

function App() {

  const datasets = { sample1, sample2, sample3 };

  const [sleepData, setSleepData] = useState(sample1);

  return (
    <div className='App'>
      <h1>Sleep Chart</h1>
      <div className='main-container'>
        <SleepChart className='chart-container' sleepData={sleepData} />
        <DataTable datasets={datasets} setSleepData={setSleepData} />
      </div>
    </div>
  )
}

export default App