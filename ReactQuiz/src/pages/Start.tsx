import axios from 'axios';
import { useEffect, useState } from 'react';
import QuestionDisplay from '../components/quiz/QuestionDisplay';
import ResultSummary from '../components/quiz/ResultSummary';
import ReviewAnswers from '../components/quiz/ReviewAnswers';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface AnswerReview {
  question: string;
  selected: string | null;
  correct: string;
  options: string[];
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const Start = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [reviewData, setReviewData] = useState<AnswerReview[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5086/api/quiz/questions')
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    if (currentIndex >= questions.length) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [currentIndex, questions.length]);

  const handleOptionClick = (option: string) => {
    const current = questions[currentIndex];
    const correct = option === current.answer;
    setSelectedOption(option);
    setIsCorrect(correct);
    if (correct) setCorrectCount((prev) => prev + 1);

    setReviewData((prev) => [
      ...prev,
      {
        question: current.question,
        selected: option,
        correct: current.answer,
        options: current.options
      }
    ]);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setTimeElapsed(0);
    setCorrectCount(0);
    setReviewData([]);
    setShowReview(false);
  };

  if (questions.length === 0)
    return <p className="text-center text-white">Loading...</p>;

  if (currentIndex >= questions.length && !showReview) {
    return (
      <ResultSummary
        totalTime={formatTime(timeElapsed)}
        correctCount={correctCount}
        totalQuestions={questions.length}
        onReview={() => setShowReview(true)}
        onRetry={handleRestart}
      />
    );
  }

  if (showReview) {
    return <ReviewAnswers reviewData={reviewData} onRetry={handleRestart} />;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-black px-6 py-10 text-white">
      <div className="absolute right-6 top-6 text-sm text-gray-300">
        Time: {formatTime(timeElapsed)}
      </div>

      <QuestionDisplay
        question={`Question ${currentIndex + 1}: ${currentQuestion.question}`}
        options={currentQuestion.options}
        answer={currentQuestion.answer}
        selectedOption={selectedOption}
        onSelect={handleOptionClick}
      />

      {selectedOption && (
        <div className="mt-10 text-center">
          <p className="text-lg font-semibold">
            {isCorrect ? 'Correct!' : 'Incorrect!'}
          </p>
          <button
            className="mt-4 rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Start;