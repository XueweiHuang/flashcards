import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Flashcard from '../components/Flashcard';
import { getCardsByCategory } from '../data/flashcards';

const StudySessionPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const cards = category ? getCardsByCategory(category) : [];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [incorrectCards, setIncorrectCards] = useState<string[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);

  if (!category || cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Cards Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any flashcards for this category.
          </p>
          <button
            onClick={() => navigate('/study')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];

  const handleCorrect = () => {
    moveToNextCard();
  };

  const handleIncorrect = () => {
    // Add to incorrect cards if not already there
    if (!incorrectCards.includes(currentCard.id)) {
      setIncorrectCards([...incorrectCards, currentCard.id]);
    }
    moveToNextCard();
  };

  const moveToNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setSessionComplete(true);
    }
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setIncorrectCards([]);
    setSessionComplete(false);
  };

  if (sessionComplete) {
    const correctCount = cards.length - incorrectCards.length;
    const accuracy = Math.round((correctCount / cards.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🎉 Session Complete!
            </h2>

            <div className="my-8 grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Total Cards</p>
                <p className="text-3xl font-bold text-blue-600">
                  {cards.length}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Correct</p>
                <p className="text-3xl font-bold text-green-600">
                  {correctCount}
                </p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Incorrect</p>
                <p className="text-3xl font-bold text-red-600">
                  {incorrectCards.length}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-2">Accuracy</p>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${accuracy}%` }}
                ></div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{accuracy}%</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {incorrectCards.length > 0 && (
                <button
                  onClick={() =>
                    navigate(`/redo/${category}`, { state: { incorrectCards } })
                  }
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200"
                >
                  📝 Redo Incorrect Cards ({incorrectCards.length})
                </button>
              )}
              <button
                onClick={resetSession}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200"
              >
                🔄 Study Again
              </button>
              <button
                onClick={() => navigate('/study')}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200"
              >
                ← Back to Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
            {category} - Study Mode
          </h1>
          <p className="text-lg text-gray-600">
            Card {currentCardIndex + 1} of {cards.length}
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-md mx-auto mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentCardIndex + 1) / cards.length) * 100}%`,
              }}
            ></div>
          </div>

          {incorrectCards.length > 0 && (
            <p className="mt-4 text-sm text-gray-600">
              Cards to review: {incorrectCards.length}
            </p>
          )}
        </div>

        {/* Flashcard */}
        <Flashcard
          {...currentCard}
          onCorrect={handleCorrect}
          onIncorrect={handleIncorrect}
          showButtons={true}
        />

        {/* Navigation */}
        <div className="text-center" style={{ marginTop: '60px' }}>
          <button
            onClick={() => navigate('/study')}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow transition-all duration-200"
          >
            ← Exit Study Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudySessionPage;
