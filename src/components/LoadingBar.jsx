import React from "react";
import "../App.css";

const LoadingBar = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="loading-bar-container">
        <div className="loading-bar" />
      </div>
    )
  );
};

export default LoadingBar;
