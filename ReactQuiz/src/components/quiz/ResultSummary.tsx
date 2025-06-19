import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  totalTime: string;
  correctCount: number;
  totalQuestions: number;
  onReview: () => void;
  onRetry: () => void;
}

const ResultSummary = ({
  totalTime,
  correctCount,
  totalQuestions,
  onReview,
  onRetry,
}: Props) => {
  const navigate = useNavigate();
  const status = correctCount >= 3 ? 'Passed' : 'Failed';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center text-white">
      <h2 className="mb-4 text-2xl font-bold">Quiz Completed</h2>
      <p className="mb-1 text-lg">Time: {totalTime}</p>
      <p className="mb-1 text-lg">
        Score: {correctCount} / {totalQuestions}
      </p>
      <p className="mb-6 text-lg">Status: {status}</p>
      <div className="flex gap-4">
        <button
          onClick={onReview}
          className="rounded bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600"
        >
          Review Answers
        </button>
        <button
          onClick={onRetry}
          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
        <button
          onClick={() => navigate('/')}
          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Back to start
        </button>
      </div>
    </div>
  );
};

export default ResultSummary;
