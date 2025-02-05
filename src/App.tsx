import { useState } from 'react'
import ellipse from './assets/ellipse-button.png'
import reset from './assets/reset.png'
import setting from './assets/setting.png'
import chart from './assets/bar-chart.png'

import './App.css'

function App() {

  const pomoSeconds: number = 1500;
  const shortBreakSeconds: number = 300; 
  const longBreakSeconds: number = 900; 

  const timerDisplay = document.getElementById('timer-text');

  //state
  const [currRotation, setCurrRotation] = useState(pomoSeconds);
  const [isRunning, setIsRunning] = useState(false);

  function displayTime(seconds: number) {
      const timeLeft = seconds;
      setCurrRotation(seconds);
      if (timerDisplay) {
        timerDisplay.textContent = ((timeLeft/60) >= 10) ? ((timeLeft/60).toString() + ":00") : ("0" + (timeLeft/60).toString() + ":00");
      }
      setCurrRotation(seconds)
  }

  function startTimer(current: number) {
      setIsRunning(prev => !prev);
      let timeLeft = current;

      function update() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        if(timerDisplay) {
          timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2,'0')}`;
        }

        if(timeLeft <= 0) {
          clearInterval(countdown);
        } else {
          timeLeft--;
        }
      }
      update();
      const countdown = setInterval(update, 1000);
  }

  return (
    <>
      <main>
        <div className="timer" onClick={() => startTimer(currRotation)}>
          <h1 id="timer-text">25:00</h1>
          <p id="timer-start-text">{isRunning ? 'click to pause' : 'click to start'}</p>
        </div>
        <div className ="timer-buttons">
            <button id="pomodoro" onClick={() => displayTime(pomoSeconds)}>pomodoro</button>
            <button id="short-break" onClick={() => displayTime(shortBreakSeconds)}>short break</button>
            <button id="long-break" onClick={() => displayTime(longBreakSeconds)}>long break</button>
        </div>
        <div className="misc-buttons">
            <img id="setting" src={setting}/>
            <img id="reset" src={reset}/>
            <img id="chart" src={chart} />
        </div>
      </main>
    </>
  )
}

export default App
