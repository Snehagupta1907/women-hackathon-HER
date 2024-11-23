import React, { useState } from "react";
import toast from "react-hot-toast";

interface JoinPoolModalProps {
  handleJoinPool: () => Promise<void>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinPoolModal: React.FC<JoinPoolModalProps> = ({
  handleJoinPool,
  setIsModalOpen,
}) => {
  const [depositAmount, setDepositAmount] = useState<string>("");

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(e.target.value);
  };

  const handleJoinClick = async () => {
    if (Number(depositAmount) > 0) {
      try {
        await handleJoinPool();
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error joining pool:", error);
      }
    } else {
      toast.error("Please enter a valid deposit amount.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      aria-labelledby="join-pool-modal"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md p-6 rounded-lg shadow-lg"
        style={{ backgroundColor: "#1f1f1f" }}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
          onClick={() => setIsModalOpen(false)}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <h2
          id="join-pool-modal"
          className="text-xl font-bold text-center text-white"
        >
          Join Pool #1
        </h2>
        <p className="mt-4 text-gray-400 text-center">
          Deposit 5 USDC to get 3 lives and compete to beat the top score of 30.
        </p>

        {/* Deposit Input */}
        <div className="mt-6">
          <label
            htmlFor="deposit-amount"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Deposit Amount
          </label>
          <div className="relative">
            <input
              type="number"
              id="deposit-amount"
              value={depositAmount}
              onChange={handleDepositChange}
              className="block w-full p-2.5 text-sm text-white rounded-lg border border-gray-600 focus:ring-purple-500 focus:border-purple-500"
              style={{ backgroundColor: "#121212" }}
              placeholder="Enter deposit amount"
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center mt-6 space-x-4">
          <button
            className="px-4 py-2 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-4 bg-purple-600"
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={handleJoinClick}
          >
            Join Pool
          </button>
          <button
            className="px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-4"
            style={{ backgroundColor: "#121212" }}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinPoolModal;
