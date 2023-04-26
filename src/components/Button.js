import React from "react";
import "../assets/style/button.css";
export default function Button({ label, className, handleClick, type }) {
  return (
    <button className={className + " btn"} onClick={handleClick} value={label}>
      {label}
    </button>
  );
}
