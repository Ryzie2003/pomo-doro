import { useState } from 'react'
import { useEffect } from 'react'
import reset from './assets/reset.png'
import setting from './assets/setting.png'
import timerEndAudio from './assets/endAudio.mp3'
import clsx from 'clsx';
import Modal from './Components/MyModal'
import { motion } from "framer-motion"

import './App.css'

function App() {

  const pomoSeconds: number = 1500;
  const shortBreakSeconds: number = 300; 
  const longBreakSeconds: number = 900; 

  //state
  const [currRotation, setCurrRotation] = useState(pomoSeconds);
  const [timeLeft, setTimeLeft] = useState(pomoSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [showTomato, setShowTomato] = useState(false);
  const [lastRecordedTime, setLastRecordedTime] = useState(0);
  const [weeklyArray, setWeeklyArray] = useState<number[]>(() => {
    const storedArray = localStorage.getItem("weeklyArray");
    return storedArray ? JSON.parse(storedArray) : Array(7).fill(0); // Default week array
  });

  useEffect(() => {
    localStorage.setItem("weeklyArray", JSON.stringify(weeklyArray))
  }, [weeklyArray])

  const titleText = currRotation === 1500 ? "Pomodoro Timer" : currRotation === 900 ? "Long Break" : "Short Break";

  function displayTime(seconds: number) {
      const timerDisplay = document.getElementById('timer-text');
      const timeLeft = seconds;
      if (timerDisplay) {
        timerDisplay.textContent = ((timeLeft/60) >= 10) ? ((timeLeft/60).toString() + ":00") : ("0" + (timeLeft/60).toString() + ":00");
      }
      setIsRunning(false);
      setCurrRotation(seconds);
      setTimeLeft(seconds);
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const date = new Date();
  const today = date.getDay();

  const pauseTimer = () => {
    setIsRunning(false); // Pause timer
  
    if (currRotation === 1500) {
      setWeeklyArray((prevArray) =>
        prevArray.map((value, i) => (i === today ? value + (totalTime - lastRecordedTime) : value))
      );

      setLastRecordedTime(totalTime);
    }
  };

  useEffect(() => {
    if (!isRunning) {
      pauseTimer();
      return;
    }  // Pause if not running
    
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if(currRotation === 1500) {
            setShowTomato(true);
          }
          playAudio();
          clearInterval(interval);
          resetTimer(currRotation);
          return 0; // Stop at 0
        }
        return prevTime - 1;
      });

      if (currRotation === 1500) {
        setTotalTime((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval); // Cleanup on unmount or pause
  }, [isRunning]);

  useEffect(() => {
    document.title = formatTime(timeLeft) + " | " + titleText ;
  }, [timeLeft]);

  function resetTimer(rotation: number) {
      setTimeLeft(rotation);
      displayTime(currRotation);
  }

  function playAudio() {
    const audio = document.getElementById('myAudio') as HTMLAudioElement;
    if(audio) {
      audio.play();
    }
  }

  // set weekly array



 

  const pomoSelect = clsx('button', currRotation === 1500 ? 'selected': '');
  const longBreakSelect = clsx('button', currRotation === 900 ? 'selected': '');
  const shortBreakSelect = clsx('button', currRotation === 300 ? 'selected': '');

  return (
    <>
      <main>
        <div className="timer" onClick={() => setIsRunning(!isRunning)}>
        <audio id="myAudio" src={timerEndAudio}></audio>
          <h1 id="timer-text">{formatTime(timeLeft)}</h1>
          <p id="timer-start-text">{isRunning ? 'click to pause' : 'click to start'}</p>
        </div>
        <div className ="timer-buttons">
            <button id="pomodoro" className={pomoSelect} onClick={() => displayTime(pomoSeconds)}>pomodoro</button>
            <button id="short-break" className={shortBreakSelect} onClick={() => displayTime(shortBreakSeconds)}>short break</button>
            <button id="long-break" className={longBreakSelect} onClick={() => displayTime(longBreakSeconds)}>long break</button>
        </div>
        <div className="misc-buttons">
            <img id="setting" src={setting}/>
            <img id="reset" src={reset} onClick={() => resetTimer(currRotation)}/>
            <Modal timeSpentArray={weeklyArray}/>
        </div>
        {showTomato && (
        <motion.img
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg" 
          alt="Jumping Tomato"
          style={{
            width: "500px",
            height: "500px",
            position: "absolute",
            left: "50%",
            bottom: "0",
            transform: "translateX(-50%)",
          }}
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -500, opacity: 0, scale: 1.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}
      </main>
      <footer>
        {/* RZ 2025™ */}
      </footer>
    </>
  )
}

export default App
