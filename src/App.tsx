import { useState } from 'react'
import ellipse from './assets/ellipse-button.png'
import reset from './assets/reset.png'
import setting from './assets/setting.png'
import chart from './assets/bar-chart.png'

import './App.css'

function App() {

  return (
    <>
      <main>
        <div className="timer">
          
          <h1 className="timer-text">25:00</h1>
          <p className="timer-start-text">click to start</p>
          
        </div>
        <div className ="timer-buttons">
            <button id="pomodoro">pomodoro</button>
            <button id="short-break">short break</button>
            <button id="long-break">long break</button>
        </div>
        <div className="misc-buttons">
            <img id="setting" src={setting}/>
            <img id="reset" src={reset}/>
            <img id="chart" src={chart}/>
        </div>
      </main>
    </>
  )
}

export default App
