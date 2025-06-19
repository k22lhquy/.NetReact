import React from 'react';

interface Props {
  question: string;
  options: string[];
  answer: string;
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

const QuestionDisplay = ({ question, options, answer, selectedOption, onSelect }: Props) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="mb-12 rounded-md border border-white p-6 text-center">
        <h2 className="text-2xl font-semibold">{question}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map((option) => {
          const isSelected = selectedOption === option;
          const isAnswer = option === answer;
          const base = 'py-4 px-5 rounded text-center font-medium transition border';

          let bgClass = 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-white';
          if (selectedOption) {
            if (isAnswer) bgClass = 'bg-green-600 border-green-400';
            else if (isSelected) bgClass = 'bg-red-600 border-red-400';
            else bgClass = 'bg-gray-700 text-gray-400';
          }

          return (
            <button
              key={option}
              className={`${base} ${bgClass}`}
              onClick={() => !selectedOption && onSelect(option)}
              disabled={!!selectedOption}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionDisplay;