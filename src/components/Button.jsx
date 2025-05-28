import React from "react";
import "./Button.css"; // à créer pour les styles si tu veux

export const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      className="custom-button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
