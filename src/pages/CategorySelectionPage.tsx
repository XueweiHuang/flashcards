import { useNavigate, useLocation } from 'react-router-dom';
import { categories } from '../data/flashcards';
import { CategoryButton } from '../components/ui/CategoryButton';
import { CATEGORY_CONFIG, COLORS } from '../constants/theme';
import { useState } from 'react';

const CategorySelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.pathname.includes('study') ? 'study' : 'quiz';
  const [backButtonColor, setBackButtonColor] = useState<string>(
    COLORS.gray.light
  );

  const handleCategorySelect = (category: string) => {
    if (mode === 'study') {
      navigate(`/study/${category}`);
    } else {
      navigate(`/quiz/${category}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose a Category
          </h1>
          <p className="text-xl text-gray-600">
            Select a category for {mode === 'study' ? 'studying' : 'quiz'}
          </p>
        </header>

        {/* Category Buttons */}
        <nav
          className="flex flex-col items-center mb-8 gap-8"
          aria-label="Category selection"
        >
          {categories.map((category) => {
            const config =
              CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
            return (
              <CategoryButton
                key={category}
                category={category}
                emoji={config.emoji}
                color={config.color}
                hoverColor={config.hoverColor}
                onClick={handleCategorySelect}
              />
            );
          })}
        </nav>

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

export default CategorySelectionPage;
