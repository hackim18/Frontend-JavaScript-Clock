import React from "react";

const SetLength = ({ type, label, length, handleDecrement, handleIncrement }) => {
  return (
    <div className="SetLength">
      <label id={`${type}-label`}>{label}</label>
      <button id={`${type}-decrement`} onClick={() => handleDecrement(type)}>
        <i className="fas fa-minus"></i>
      </button>
      <span id={`${type}-length`}>{length}</span>
      <button id={`${type}-increment`} onClick={() => handleIncrement(type)}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default SetLength;
