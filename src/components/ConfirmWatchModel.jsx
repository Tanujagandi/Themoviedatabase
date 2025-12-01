import React from "react";
import "./Modal.css"; // keep your same CSS file
 
function ConfirmWatchModel({ open, onClose, onConfirm, movie }) {
  if (!open) return null;
 
  return (
    <div className="modalOverlay">
      <div className="modalBox">
 
        {/* TITLE — FIXED */}
        <h3 className="modalTitle">
          Do You Want To Watch <b>{movie?.title || "this movie"}</b> ?
        </h3>
 
        <div className="modalButtons">
          <button className="yesBtn" onClick={onConfirm}>Yes</button>
          <button className="noBtn" onClick={onClose}>No</button>
        </div>
 
      </div>
    </div>
  );
}
 
export default ConfirmWatchModel;