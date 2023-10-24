import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(null);

  const resetState = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setIsActive(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    resetState();
  };

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      audioRef.current.play();
      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel("Session");
        setTimeLeft(sessionLength * 60);
      }
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, timeLeft, sessionLength, breakLength, timerLabel]);

  return (
    <div id="pomodoro-clock">
      <div id="length-controls">
        <div id="break-label">Break Length</div>
        <div id="break-controls">
          <button
            id="break-decrement"
            onClick={() => setBreakLength(Math.max(breakLength - 1, 1))}
          >
            -
          </button>
          <div id="break-length">{breakLength}</div>
          <button
            id="break-increment"
            onClick={() => setBreakLength(Math.min(breakLength + 1, 60))}
          >
            +
          </button>
        </div>
        <div id="session-label">Session Length</div>
        <div id="session-controls">
          <button
            id="session-decrement"
            onClick={() => setSessionLength(Math.max(sessionLength - 1, 1))}
          >
            -
          </button>
          <div id="session-length">{sessionLength}</div>
          <button
            id="session-increment"
            onClick={() => setSessionLength(Math.min(sessionLength + 1, 60))}
          >
            +
          </button>
        </div>
      </div>
      <div id="timer">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{`${Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, "0")}:${(timeLeft % 60)
          .toString()
          .padStart(2, "0")}`}</div>
        <audio
          id="beep"
          ref={audioRef}
          src="https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3"
        />
        <button id="start_stop" onClick={handleStartStop}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
