import { useState } from 'react';

export interface FlashcardProps {
  id: string;
  spanish: string;
  english: string;
  category?: string;
}

const Flashcard = ({ spanish, english }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Ensure we have valid data
  if (!spanish || !english) {
    return (
      <div className="w-80 max-w-[calc(100%-2rem)] mx-auto h-96 sm:h-[28rem] bg-red-100 border-2 border-red-300 rounded-lg flex items-center justify-center">
        <p className="text-red-600">Error: Missing flashcard data</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-80 max-w-[calc(100%-2rem)] mx-auto h-96 sm:h-[28rem] cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleFlip();
        }
      }}
      aria-label={isFlipped ? 'Flashcard showing English translation' : 'Flashcard showing Spanish word'}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front side - Spanish */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center p-6 sm:p-8 border-2 border-blue-200"
          style={{
            transform: 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <p 
            className="text-xl sm:text-2xl font-bold text-gray-800 text-center break-words max-w-full px-2"
            style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
          >
            {spanish}
          </p>
        </div>

        {/* Back side - English */}
        <div
          className="absolute inset-0 w-full h-full bg-blue-50 rounded-lg shadow-lg flex items-center justify-center p-6 sm:p-8 border-2 border-blue-300"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <p 
            className="text-xl sm:text-2xl font-bold text-gray-800 text-center break-words max-w-full px-2"
            style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
          >
            {english}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
