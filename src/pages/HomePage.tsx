import { NavigationCard } from '../components/ui/NavigationCard';
import { MODE_CONFIG } from '../constants/theme';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Spanish Flashcards
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Learn Spanish vocabulary through interactive flashcards and quizzes
          </p>

          {/* Welcome Message */}
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              👋 <span className="font-semibold">Welcome!</span> Start your
              Spanish learning journey today. Choose a study mode to practice
              vocabulary, take interactive quizzes, or track your progress.
              Every word you learn brings you closer to fluency!
            </p>
          </div>
        </header>

        {/* Navigation Cards */}
        <nav
          className="flex flex-col items-center gap-8"
          aria-label="Main navigation"
        >
          <NavigationCard
            to="/study"
            emoji={MODE_CONFIG.study.emoji}
            title="Study Mode"
            description="Learn with flashcards at your own pace"
            color={MODE_CONFIG.study.color}
            hoverColor={MODE_CONFIG.study.hoverColor}
          />
          <NavigationCard
            to="/quiz"
            emoji={MODE_CONFIG.quiz.emoji}
            title="Quiz Mode"
            description="Test your knowledge with interactive quizzes"
            color={MODE_CONFIG.quiz.color}
            hoverColor={MODE_CONFIG.quiz.hoverColor}
          />
          <NavigationCard
            to="/stats"
            emoji={MODE_CONFIG.stats.emoji}
            title="Statistics"
            description="Track your progress and performance"
            color={MODE_CONFIG.stats.color}
            hoverColor={MODE_CONFIG.stats.hoverColor}
          />
        </nav>

        {/* Footer Help Text */}
        <footer className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            Choose a mode above to get started!
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
