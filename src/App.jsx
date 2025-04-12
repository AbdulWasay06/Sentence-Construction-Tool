import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Question from './components/Question';
import Result from './components/Result';
import questionsData from './data/questions.json';

const App = () => {
  const [showHome, setShowHome] = useState(true); // Tracks whether to display the Home component
  const [current, setCurrent] = useState(0); // Tracks the current question index
  const [answers, setAnswers] = useState([]); // Stores user-selected answers for each question
  const [timeLeft, setTimeLeft] = useState(30); // Timer for each question
  const [showResult, setShowResult] = useState(false); // Tracks whether to display the Result component

  const questions = questionsData.data.questions; // Fetch questions from JSON data

  useEffect(() => {
    // Effect for countdown timer
    if (!showHome && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            handleNext();
            return 30; // Reset the timer for the next question
          }
          return prev - 1; // Decrease timer by 1 second
        });
      }, 1000);
      return () => clearInterval(timer); // Clean up the timer on component unmount
    }
  }, [current, showHome, showResult]);

  // Handles transitioning to the next question
  const handleNext = () => {
    if (current === questions.length - 1) {
      setShowResult(true); // Show Result component if all questions are answered
    } else {
      setCurrent(current + 1); // Move to the next question
      setTimeLeft(30); // Reset the timer for the next question
    }
  };

  // Handles starting the quiz from the Home component
  const handleStart = () => {
    setShowHome(false); // Hide Home component
  };

  // Handles navigating back to Home from Result component
  const handleGoToDashboard = () => {
    setShowHome(true); // Show Home component
    setShowResult(false); // Hide Result component
    setCurrent(0); // Reset the quiz progress
    setAnswers([]); // Clear user answers
    setTimeLeft(30); // Reset the timer
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-6 text-center">
        {showHome ? (
          <Home onStart={handleStart} /> // Render Home component
        ) : showResult ? (
          <Result questions={questions} userAnswers={answers} onGoToDashboard={handleGoToDashboard} /> // Render Result component
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">
                Question {current + 1} / {questions.length}
              </h1>
              <span className="text-lg text-red-500 font-bold">{timeLeft}s</span>
            </div>
            <Question
              data={questions[current]}
              selected={answers[current] || []}
              onSelect={(index, word) => {
                const updated = [...(answers[current] || [])];
                if (updated.length < 4) updated.push(word);
                setAnswers((prev) => {
                  const newAnswers = [...prev];
                  newAnswers[current] = updated;
                  return newAnswers;
                });
              }}
              onUnselect={(word) => {
                const updated = (answers[current] || []).filter((w) => w !== word);
                setAnswers((prev) => {
                  const newAnswers = [...prev];
                  newAnswers[current] = updated;
                  return newAnswers;
                });
              }}
            />
            <button
              className={`mt-4 px-4 py-2 rounded ${
                (answers[current]?.length ?? 0) === 4
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleNext}
              disabled={(answers[current]?.length ?? 0) < 4}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;