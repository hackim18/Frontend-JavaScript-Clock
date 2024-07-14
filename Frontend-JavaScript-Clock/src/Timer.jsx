import React from "react";

const Timer = ({ timerLabel, timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div className="Timer">
      <span id="timer-label">{timerLabel}</span>
      <h2 id="time-left">{formattedTime}</h2>
    </div>
  );
};

export default Timer;
