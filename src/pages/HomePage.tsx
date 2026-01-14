import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Spanish Flashcards
          </h1>
          <p className="text-xl text-gray-600">
            Learn Spanish vocabulary through interactive flashcards and quizzes
          </p>
        </div>

        <div className="flex flex-col items-center" style={{ gap: '2rem' }}>
          {/* Study Mode */}
          <Link
            to="/study"
            className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 text-center group"
            style={{ 
              borderRadius: '5px',
              backgroundColor: '#3b82f6',
              width: '200px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            <div className="mb-4 group-hover:scale-110 transition-transform" style={{ fontSize: '4rem' }}>
              📚
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>
              Study Mode
            </h2>
            <p style={{ color: '#dbeafe' }}>
              Learn with flashcards at your own pace
            </p>
          </Link>

          {/* Quiz Mode */}
          <Link
            to="/quiz"
            className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 text-center group"
            style={{ 
              borderRadius: '5px',
              backgroundColor: '#22c55e',
              width: '200px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
          >
            <div className="mb-4 group-hover:scale-110 transition-transform" style={{ fontSize: '4rem' }}>
              🎯
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>
              Quiz Mode
            </h2>
            <p style={{ color: '#dcfce7' }}>
              Test your knowledge with interactive quizzes
            </p>
          </Link>

          {/* Stats Page */}
          <Link
            to="/stats"
            className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 text-center group"
            style={{ 
              borderRadius: '5px',
              backgroundColor: '#a855f7',
              width: '200px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#9333ea'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#a855f7'}
          >
            <div className="mb-4 group-hover:scale-110 transition-transform" style={{ fontSize: '4rem' }}>
              📊
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>
              Statistics
            </h2>
            <p style={{ color: '#f3e8ff' }}>
              Track your progress and performance
            </p>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            Choose a mode above to get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
