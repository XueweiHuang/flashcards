import { useState } from 'react';
import { DIMENSIONS, GRADIENTS } from '../constants/theme';

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
    onCorrect?.();
  };

  const handleIncorrect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIncorrect?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  // Ensure we have valid data
  if (!spanish || !english) {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="w-[420px] max-w-[85vw] h-[260px] bg-red-100 border-2 border-red-300 flex items-center justify-center rounded-[5px]">
          <p className="text-red-600 text-xl font-semibold">
            Error: Missing flashcard data
          </p>
        </div>
      </div>
    );
  }

  const cardStyles = {
    container: {
      marginBottom: DIMENSIONS.spacing.cardMarginBottom,
    },
    card: {
      perspective: '1000px',
    },
    flipContainer: {
      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      transformStyle: 'preserve-3d' as const,
    },
    cardFace: {
      backfaceVisibility: 'hidden' as const,
      WebkitBackfaceVisibility: 'hidden' as const,
    },
    frontFace: {
      ...{
        transform: 'rotateY(0deg)',
        background: GRADIENTS.flashcard.front,
        border: '3px solid #000000',
      },
    },
    backFace: {
      ...{
        transform: 'rotateY(180deg)',
        background: GRADIENTS.flashcard.back,
        border: '3px solid #000000',
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Card Container */}
      <div style={cardStyles.container}>
        <div
          className="relative w-[420px] max-w-[85vw] h-[260px] cursor-pointer rounded-[5px]"
          style={cardStyles.card}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label={
            isFlipped
              ? 'Flashcard showing English translation'
              : 'Flashcard showing Spanish word'
          }
        >
          <div
            className="relative w-full h-full transition-transform duration-500"
            style={cardStyles.flipContainer}
          >
            {/* Front side - Spanish */}
            <div
              className="absolute inset-0 w-full h-full shadow-2xl flex items-center justify-center p-8 rounded-[5px]"
              style={{ ...cardStyles.cardFace, ...cardStyles.frontFace }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-white text-center break-words overflow-wrap-break-word">
                {spanish}
              </p>
            </div>

            {/* Back side - English */}
            <div
              className="absolute inset-0 w-full h-full shadow-2xl flex items-center justify-center p-8 rounded-[5px]"
              style={{ ...cardStyles.cardFace, ...cardStyles.backFace }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-white text-center break-words overflow-wrap-break-word">
                {english}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right/Wrong Buttons */}
      {isFlipped && showButtons && (
        <div
          className="flex flex-row justify-center items-center w-[420px] max-w-[85vw]"
          style={{ gap: DIMENSIONS.spacing.buttonGap }}
        >
          <button
            onClick={handleCorrect}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-2xl transition-all duration-200 transform hover:scale-110 text-2xl border-2 border-green-700 rounded-[5px] px-[50px] py-5 min-w-[160px]"
            aria-label="Mark as correct"
          >
            ✅ Right
          </button>
          <button
            onClick={handleIncorrect}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold shadow-2xl transition-all duration-200 transform hover:scale-110 text-2xl border-2 border-red-700 rounded-[5px] px-[50px] py-5 min-w-[160px]"
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
