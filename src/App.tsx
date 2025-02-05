import { useState } from 'react'
import ellipse from './assets/ellipse-button.png'
import reset from './assets/reset.png'
import setting from './assets/setting.png'
import chart from './assets/bar-chart.png'

import './App.css'

function App() {

  function testOnClick(): void {
    console.log('yes');
  }

  return (
    <>
      <main>
        <div className="timer" onClick={testOnClick}>
          
          <h1 className="timer-text">25:00</h1>
          <p className="timer-start-text">click to start</p>
          
        </div>
        <div className ="timer-buttons">
            <button id="pomodoro" onClick={testOnClick}>pomodoro</button>
            <button id="short-break" onClick={testOnClick}>short break</button>
            <button id="long-break" onClick={testOnClick}>long break</button>
        </div>
        <div className="misc-buttons">
            <img id="setting" src={setting}  onClick={testOnClick}/>
            <img id="reset" src={reset} onClick={testOnClick}/>
            <img id="chart" src={chart} onClick={testOnClick}/>
        </div>
      </main>
    </>
  )
}

export default App
