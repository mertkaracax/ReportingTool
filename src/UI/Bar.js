import React from "react";

import "./Bar.css";

const Bar = () => {
  let width = "70%";
  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div style={{ width: width }} className="chart-bar__fill"></div>
      </div>
    </div>
  );
};

export default Bar;
