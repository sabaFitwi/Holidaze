import { useState } from "react";
const Modal = ({ onClose, onSave }) => {
  const [newImage, setNewImage] = useState("");

  const handleInputChange = (e) => {
    setNewImage(e.target.value);
  };

  const handleSaveClick = () => {
    console.log("Saving with new image:", newImage);
    onSave(newImage);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <label htmlFor="newImage">New Image URL:</label>
        <input
          type="text"
          id="newImage"
          value={newImage}
          onChange={handleInputChange}
        />
        <button onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  );
};

export default Modal;
