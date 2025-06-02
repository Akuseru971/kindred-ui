import React from "react";
import "./OrderPopup.css";

const OrderPopup = ({ onClose, onOrder }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Order your personal Lamb & Wolf audio</h2>
        <p>Get your unique audio delivered in 72h via WeTransfer.</p>
        <video controls width="100%" className="example-video">
          <source src="/example.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button onClick={onOrder} className="order-button">
          Commander pour 4,99€
        </button>
        <button onClick={onClose} className="close-button">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default OrderPopup;
