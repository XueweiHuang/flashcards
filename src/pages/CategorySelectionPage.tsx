import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { categories } from '../data/flashcards';

const CategorySelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.pathname.includes('study') ? 'study' : 'quiz';

  const handleCategorySelect = (category: string) => {
    if (mode === 'study') {
      navigate(`/study/${category}`);
    } else {
      navigate(`/quiz/${category}`);
    }
  };

  const categoryEmojis: Record<string, string> = {
    animals: '🐾',
    food: '🍎',
    verbs: '⚡',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose a Category
          </h1>
          <p className="text-xl text-gray-600">
            Select a category for {mode === 'study' ? 'studying' : 'quiz'}
          </p>
        </div>

        <div
          className="flex flex-col items-center mb-8"
          style={{ gap: '2rem' }}
        >
          {categories.map((category, index) => {
            const colorConfigs = [
              { bg: '#f97316', hover: '#ea580c' }, // orange
              { bg: '#ef4444', hover: '#dc2626' }, // red
              { bg: '#6366f1', hover: '#4f46e5' }, // indigo
            ];
            const config = colorConfigs[index];
            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 text-center group"
                style={{
                  borderRadius: '5px',
                  backgroundColor: config.bg,
                  width: '180px',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
                  (e.currentTarget.style.backgroundColor = config.hover)
                }
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                  (e.currentTarget.style.backgroundColor = config.bg)
                }
              >
                <div
                  className="mb-4 group-hover:scale-110 transition-transform"
                  style={{ fontSize: '5rem' }}
                >
                  {categoryEmojis[category]}
                </div>
                <h2
                  className="text-2xl font-bold capitalize"
                  style={{ color: '#ffffff' }}
                >
                  {category}
                </h2>
              </button>
            );
          })}
        </div>

        <div className="text-center" style={{ marginTop: '3rem' }}>
          <button
            onClick={() => navigate('/')}
            className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-bold"
            style={{
              borderRadius: '5px',
              backgroundColor: '#64748b',
              color: '#ffffff',
              padding: '12px 24px',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
              (e.currentTarget.style.backgroundColor = '#475569')
            }
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
              (e.currentTarget.style.backgroundColor = '#64748b')
            }
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelectionPage;
