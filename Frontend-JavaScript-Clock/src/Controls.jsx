import React from "react";

const Controls = ({ running, handleStartStop, handleReset }) => {
  return (
    <div className="Controls">
      <button id="start_stop" onClick={handleStartStop}>
        {running ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
      </button>
      <button id="reset" onClick={handleReset}>
        <i className="fas fa-sync"></i>
      </button>
    </div>
  );
};

export default Controls;
