import { useState } from 'react'
import { useEffect } from 'react'
import ellipse from './assets/ellipse-button.png'
import reset from './assets/reset.png'
import setting from './assets/setting.png'
import chart from './assets/bar-chart.png'

import './App.css'

function App() {

  const pomoSeconds: number = 1500;
  const shortBreakSeconds: number = 300; 
  const longBreakSeconds: number = 900; 


  //state
  const [currRotation, setCurrRotation] = useState(pomoSeconds);
  const [timeLeft, setTimeLeft] = useState(pomoSeconds);
  const [isRunning, setIsRunning] = useState(false);

  function displayTime(seconds: number) {
      const timerDisplay = document.getElementById('timer-text');
      const timeLeft = seconds;
      if (timerDisplay) {
        timerDisplay.textContent = ((timeLeft/60) >= 10) ? ((timeLeft/60).toString() + ":00") : ("0" + (timeLeft/60).toString() + ":00");
      }
      setCurrRotation(seconds);
      setTimeLeft(seconds);
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isRunning) return; // Pause if not running
    console.log(timeLeft);
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0; // Stop at 0
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval); // Cleanup on unmount or pause
  }, [isRunning]);
 

  return (
    <>
      <main>
        <div className="timer" onClick={() => setIsRunning(!isRunning)}>
          <h1 id="timer-text">{formatTime(timeLeft)}</h1>
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
