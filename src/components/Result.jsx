import React from 'react';

const Result = ({ questions, userAnswers, onGoToDashboard }) => {
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (JSON.stringify(q.correctAnswer) === JSON.stringify(userAnswers[index])) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const scorePercent = Math.round((score / questions.length) * 100);

  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-3xl mx-auto">
      {/* Score Circle */}
      <div className="relative w-32 h-32 mb-6">
        <svg className="transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-green-500"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${scorePercent}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{scorePercent}</span>
          <span className="text-xs text-gray-500">Overall Score</span>
        </div>
      </div>

      {/* Feedback Text */}
      <p className="text-center text-gray-700 max-w-xl mb-6">
        While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness. Review your responses below for more details.
      </p>

      {/* Dashboard Button */}
      <button
        className="px-4 py-2 mb-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
        onClick={onGoToDashboard}
      >
        Go to Dashboard
      </button>

      {/* Answers Section */}
      <div className="w-full space-y-6 mt-4">
        {questions.map((q, index) => {
          const isCorrect = JSON.stringify(q.correctAnswer) === JSON.stringify(userAnswers[index]);

          return (
            <div
              key={index}
              className={`rounded-xl p-4 shadow-md border ${
                isCorrect ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'
              }`}
            >
              <p className="text-sm text-gray-400 font-semibold mb-1">Prompt</p>
              <p className="mb-3 text-gray-800">{q.question}</p>

              <p
                className={`text-sm font-medium ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}
              >
                Your response: {isCorrect ? 'Correct' : 'Incorrect'}
              </p>
              <p className="text-gray-800">{userAnswers[index].join(' ')}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Result;