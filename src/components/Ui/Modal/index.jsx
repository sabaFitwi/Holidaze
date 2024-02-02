// import { useState } from "react";
// const Modal = ({ onClose, onSave }) => {
//   const [newImage, setNewImage] = useState("");

//   const handleInputChange = (e) => {
//     setNewImage(e.target.value);
//   };

//   const handleSaveClick = () => {
//     console.log("Saving with new image:", newImage);
//     onSave(newImage);
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <label htmlFor="newImage">New Image URL:</label>
//         <input
//           type="text"
//           id="newImage"
//           value={newImage}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleSaveClick}>Save</button>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element to handle accessibility

const Modals = ({ isOpen, onClose, onConfirm, title, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmation Modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
    >
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Modals;
