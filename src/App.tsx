import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import StatsPage from './pages/StatsPage';
import StudySessionPage from './pages/StudySessionPage';
import './i18n/config';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study" element={<CategorySelectionPage />} />
        <Route path="/study/:category" element={<StudySessionPage />} />
        <Route path="/quiz" element={<CategorySelectionPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
