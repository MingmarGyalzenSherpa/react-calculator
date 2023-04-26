import React from "react";

import "../assets/style/screen.css";

export default function Screen({ value }) {
  return (
    <div className="screen">
      <span>{value}</span>
    </div>
  );
}
