import { useState } from 'react';

export interface FlashcardProps {
  id: string;
  spanish: string;
  english: string;
  category?: string;
  onCorrect?: () => void;
  onIncorrect?: () => void;
  showButtons?: boolean;
}

const Flashcard = ({
  spanish,
  english,
  onCorrect,
  onIncorrect,
  showButtons = true,
}: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCorrect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCorrect) onCorrect();
  };

  const handleIncorrect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onIncorrect) onIncorrect();
  };

  // Ensure we have valid data
  if (!spanish || !english) {
    return (
      <div className="flex items-center justify-center w-full">
        <div
          className="w-[420px] max-w-[85vw] h-[260px] bg-red-100 border-2 border-red-300 flex items-center justify-center"
          style={{ borderRadius: '5px' }}
        >
          <p className="text-red-600 text-xl font-semibold">
            Error: Missing flashcard data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Card Container */}
      <div style={{ marginBottom: '50px' }}>
        <div
          className="relative w-[420px] max-w-[85vw] h-[260px] cursor-pointer"
          style={{ perspective: '1000px', borderRadius: '5px' }}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleFlip();
            }
          }}
          aria-label={
            isFlipped
              ? 'Flashcard showing English translation'
              : 'Flashcard showing Spanish word'
          }
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
              className="absolute inset-0 w-full h-full shadow-2xl flex items-center justify-center p-8"
              style={{
                transform: 'rotateY(0deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                borderRadius: '5px',
                background:
                  'linear-gradient(to bottom right, #3b82f6, #1d4ed8)',
                border: '3px solid #000000',
              }}
            >
              <p
                className="text-3xl sm:text-4xl font-bold text-white text-center break-words"
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
              >
                {spanish}
              </p>
            </div>

            {/* Back side - English */}
            <div
              className="absolute inset-0 w-full h-full shadow-2xl flex items-center justify-center p-8"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                borderRadius: '5px',
                background:
                  'linear-gradient(to bottom right, #10b981, #059669)',
                border: '3px solid #000000',
              }}
            >
              <p
                className="text-3xl sm:text-4xl font-bold text-white text-center break-words"
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
              >
                {english}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right/Wrong Buttons - Show only when flipped and showButtons is true */}
      {isFlipped && showButtons && (
        <div
          className="flex flex-row justify-center items-center"
          style={{ gap: '60px', width: '420px', maxWidth: '85vw' }}
        >
          <button
            onClick={handleCorrect}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-2xl transition-all duration-200 transform hover:scale-110 text-2xl border-2 border-green-700"
            style={{
              borderRadius: '5px',
              padding: '20px 50px',
              minWidth: '160px',
            }}
            aria-label="Mark as correct"
          >
            ✅ Right
          </button>
          <button
            onClick={handleIncorrect}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold shadow-2xl transition-all duration-200 transform hover:scale-110 text-2xl border-2 border-red-700"
            style={{
              borderRadius: '5px',
              padding: '20px 50px',
              minWidth: '160px',
            }}
            aria-label="Mark as incorrect"
          >
            ❌ Wrong
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
