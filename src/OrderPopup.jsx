import React from "react";
import "./Popup.css";

const OrderPopup = ({ onClose, onOrder }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Your Kindred lore has been summoned.</h2>
        <p>Would you like to receive a custom video of Lamb and Wolf narrating it?</p>
        <div className="popup-buttons">
          <button className="popup-order-button" onClick={onOrder}>
            Order my video
          </button>
          <button className="popup-close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;

