import React from "react";
import Modal from "react-modal";
import Input from "../Input";

Modal.setAppElement("#root");

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText,
  cancelText,
  showInput,
  inputPlaceholder,
  inputValue,
  onInputChange,
  className,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmation Modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    >
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">{message}</h2>
        {showInput && (
          <Input
            type="text"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={onInputChange}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
        )}
        <div className="flex justify-between">
          <button className={className} onClick={onConfirm}>
            {confirmText}
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
