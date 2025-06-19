import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ReviewItem {
  question: string;
  selected: string | null;
  correct: string;
  options: string[];
}

interface Props {
  reviewData: ReviewItem[];
  onRetry: () => void;
}

const ReviewAnswers = ({ reviewData, onRetry }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <h2 className="mb-8 text-center text-2xl font-bold">Review Answers</h2>
      <div className="space-y-6">
        {reviewData.map((item, idx) => (
          <div key={idx} className="rounded border border-white p-4">
            <p className="mb-2 font-semibold">
              Q{idx + 1}: {item.question}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {item.options.map((opt) => {
                let bg = 'bg-gray-800';
                if (opt === item.correct) bg = 'bg-green-600';
                if (opt === item.selected && opt !== item.correct) bg = 'bg-red-600';

                return (
                  <div key={opt} className={`rounded px-4 py-2 ${bg}`}>
                    {opt}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <div className="inline-flex space-x-4">
          <button
            onClick={onRetry}
            className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Retry
          </button>
          <button
            onClick={() => navigate('/')}
            className="rounded bg-gray-700 px-6 py-3 text-white hover:bg-gray-600"
          >
            Back to start
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnswers;
