// import React from "react";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

// const Modals = ({ isOpen, onClose, onConfirm, title, children }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Confirmation Modal"
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
//     >
//       <div className="bg-white p-6 rounded-md max-w-md w-full">
//         <h2 className="text-lg font-semibold mb-4">{title}</h2>
//         <div className="mb-4">{children}</div>
//         <div className="flex justify-end">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
//             onClick={onConfirm}
//           >
//             Confirm
//           </button>
//           <button
//             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default Modals;
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText,
  cancelText,
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
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onConfirm}
          >
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
