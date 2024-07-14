import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Timer from "./Timer";
import SetLength from "./SetLength";
import Controls from "./Controls";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [intervalID, setIntervalID] = useState(null);
  const [running, setRunning] = useState(false);
  const audioElement = useRef(null);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  const handleStartStop = () => {
    if (running) {
      clearInterval(intervalID);
      setRunning(false);
    } else {
      const newIntervalID = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            audioElement.current.play();
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              return breakLength * 60;
            } else {
              setTimerLabel("Session");
              return sessionLength * 60;
            }
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
      setIntervalID(newIntervalID);
      setRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(intervalID);
    setIntervalID(null);
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setRunning(false);
    audioElement.current.pause();
    audioElement.current.currentTime = 0;
  };

  const handleDecrement = (type) => {
    if (!running) {
      if (type === "break" && breakLength > 1) {
        setBreakLength((prevLength) => prevLength - 1);
      }
      if (type === "session" && sessionLength > 1) {
        setSessionLength((prevLength) => prevLength - 1);
      }
    }
  };

  const handleIncrement = (type) => {
    if (!running) {
      if (type === "break" && breakLength < 60) {
        setBreakLength((prevLength) => prevLength + 1);
      }
      if (type === "session" && sessionLength < 60) {
        setSessionLength((prevLength) => prevLength + 1);
      }
    }
  };

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="SetLengthContainer">
        <SetLength
          type="break"
          label="Break Length"
          length={breakLength}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
        <SetLength
          type="session"
          label="Session Length"
          length={sessionLength}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
      </div>
      <Timer timerLabel={timerLabel} timeLeft={timeLeft} />
      <Controls running={running} handleStartStop={handleStartStop} handleReset={handleReset} />
      <audio id="beep" ref={audioElement}>
        <source
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          type="audio/wav"
        />
      </audio>
    </div>
  );
}

export default App;
