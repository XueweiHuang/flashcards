import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import StudySessionPage from './StudySessionPage';

// Mock the flashcards data module
vi.mock('../data/flashcards', () => ({
  getCardsByCategory: (category: string) => {
    if (category === 'animals') {
      return [
        {
          id: 'animal-1',
          category: 'animals',
          spanish: 'el gato',
          english: 'the cat',
          quiz: { type: 'multiple-choice', options: [] },
        },
        {
          id: 'animal-2',
          category: 'animals',
          spanish: 'el perro',
          english: 'the dog',
          quiz: { type: 'multiple-choice', options: [] },
        },
      ];
    }
    return [];
  },
  categories: ['animals', 'food', 'verbs'],
}));

describe('StudySessionPage', () => {
  it('renders study session with category name', () => {
    render(
      <MemoryRouter initialEntries={['/study/animals']}>
        <Routes>
          <Route path="/study/:category" element={<StudySessionPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/animals - study mode/i)).toBeInTheDocument();
  });

  it('displays first flashcard', () => {
    render(
      <MemoryRouter initialEntries={['/study/animals']}>
        <Routes>
          <Route path="/study/:category" element={<StudySessionPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('el gato')).toBeInTheDocument();
  });

  it('shows progress indicator', () => {
    render(
      <MemoryRouter initialEntries={['/study/animals']}>
        <Routes>
          <Route path="/study/:category" element={<StudySessionPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Card 1 of 2')).toBeInTheDocument();
  });

  it('moves to next card after marking as correct', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/study/animals']}>
        <Routes>
          <Route path="/study/:category" element={<StudySessionPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Flip the card first
    const card = screen.getByRole('button', { name: /flashcard/i });
    await user.click(card);

    // Click "I got it right" button
    const correctButton = screen.getByRole('button', {
      name: /mark as correct/i,
    });
    await user.click(correctButton);

    // Should show next card
    expect(screen.getByText('Card 2 of 2')).toBeInTheDocument();
  });

  it('tracks incorrect cards', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/study/animals']}>
        <Routes>
          <Route path="/study/:category" element={<StudySessionPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Flip the card first
    const card = screen.getByRole('button', { name: /flashcard/i });
    await user.click(card);

    // Click "I got it wrong" button
    const incorrectButton = screen.getByRole('button', {
      name: /mark as incorrect/i,
    });
    await user.click(incorrectButton);

    // Should show "Cards to review: 1"
    expect(screen.getByText(/cards to review: 1/i)).toBeInTheDocument();
  });

  it.skip('shows completion screen after all cards', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/study/animals']}>
        <Routes>
          <Route path="/study/:category" element={<StudySessionPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Process both cards
    for (let i = 0; i < 2; i++) {
      // Find and click the flashcard
      const card = screen.getByRole('button', { name: /flashcard/i });
      await user.click(card);

      // Click the correct button
      const correctButton = screen.getByRole('button', {
        name: /mark as correct/i,
      });
      await user.click(correctButton);
    }

    // Should show completion screen
    expect(screen.getByText(/session complete/i)).toBeInTheDocument();
  });

  it('displays no cards message for empty category', () => {
    render(
      <MemoryRouter initialEntries={['/study/empty']}>
        <Routes>
          <Route path="/study/:category" element={<StudySessionPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/no cards found/i)).toBeInTheDocument();
  });
});
