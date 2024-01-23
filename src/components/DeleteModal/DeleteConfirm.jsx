// ConfirmationModal.js

import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element to handle accessibility

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmation Modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
    >
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this item?
        </h2>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete Permanently
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

export default ConfirmationModal;
