import React from 'react';

const Question = ({ data, selected, onSelect, onUnselect }) => {
  return (
    <div className="mb-6">
      <p className="text-lg mb-4">{data.question}</p>
      <div className="grid grid-cols-2 gap-4">
        {data.options.map((word, index) => (
          <button
            key={index}
            className={`p-2 rounded ${selected.includes(word) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => {
              if (selected.includes(word)) {
                onUnselect(word);
              } else {
                onSelect(index, word);
              }
            }}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;