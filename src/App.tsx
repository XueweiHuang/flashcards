import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n/config';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <LanguageSwitcher />
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {t('welcome')}
        </h1>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-center">{t('readyMessage')}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
