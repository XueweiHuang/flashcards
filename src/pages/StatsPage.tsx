import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { COLORS } from '../constants/theme';

const StatsPage = () => {
  const navigate = useNavigate();
  const [backButtonColor, setBackButtonColor] = useState<string>(
    COLORS.gray.light
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📊 Your Statistics
          </h1>
          <p className="text-xl text-gray-600">Track your learning progress</p>
        </header>

        {/* Placeholder Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-gray-600 text-center">
            Statistics will be available once you complete Phase 5 of the
            project.
          </p>
          <p className="text-gray-500 text-center mt-4 text-sm">
            Start studying or taking quizzes to see your stats here!
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-bold px-6 py-3 rounded-[5px] text-white"
            style={{ backgroundColor: backButtonColor }}
            onMouseEnter={() => setBackButtonColor(COLORS.gray.dark)}
            onMouseLeave={() => setBackButtonColor(COLORS.gray.light)}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
