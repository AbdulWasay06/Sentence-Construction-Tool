import React from 'react';

const Home = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      {/* Navbar-like full-width h1 */}
      <div className="flex items-center justify-center h-16 w-full bg-gray-100">
        <h1 className="text-sm text-gray-500">Sentence Construction</h1>
      </div>

      {/* Main Content Section */}
      <div className="mt-8 mb-6 rounded-lg p-4">
        <svg
          className="mx-auto mb-4"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 6H20M4 12H14M4 18H10"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <h2 className="text-2xl font-bold mb-2">Sentence Construction</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>
      </div>

      {/* Info Section */}
      <div className="flex items-center justify-center gap-8 mb-6 text-gray-600 rounded-lg p-4">
        <div className="text-center">
          <p className="text-sm">Time Per Question</p>
          <p className="font-semibold">30 sec</p>
        </div>
        <div className="h-10 w-px bg-gray-300" />
        <div className="text-center">
          <p className="text-sm">Total Questions</p>
          <p className="font-semibold">10</p>
        </div>
        <div className="h-10 w-px bg-gray-300" />
        <div className="text-center">
          <p className="text-sm">Coins</p>
          <p className="font-semibold text-yellow-500">● 0</p>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex gap-4">
        <button
          onClick={() => onStart()} // Use the onStart function passed via props
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;