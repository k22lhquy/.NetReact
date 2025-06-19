import { useNavigate } from 'react-router-dom';
import RLogo from '../assets/R.png';
import React from 'react';

const Index = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/start');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
      <img src={RLogo} alt="Quiz Logo" className="h-auto w-32" />
      <button
        className="rounded bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
        onClick={handleOnClick}
      >
        Start Quiz!
      </button>
    </div>
  );
};

export default Index;
