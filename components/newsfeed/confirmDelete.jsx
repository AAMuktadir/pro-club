import React, { useState } from "react";

export default function ConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  playerId,
  playerName,
}) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(playerId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="pb-4 text-lg">
          Are you sure to delete{" "}
          <span className="font-medium text-red-500"> {playerName}</span>?
        </p>
        <div className="flex justify-around">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
