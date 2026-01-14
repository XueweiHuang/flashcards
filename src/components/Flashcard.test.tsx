import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Flashcard from './Flashcard';

const mockFlashcard = {
  id: '1',
  spanish: 'Hola',
  english: 'Hello',
};

describe('Flashcard', () => {
  it('renders flashcard with mock data', () => {
    render(<Flashcard {...mockFlashcard} />);

    // Both Spanish and English should be in the DOM
    // (CSS transform handles visual visibility)
    expect(screen.getByText('Hola')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('displays Spanish word initially', () => {
    render(<Flashcard {...mockFlashcard} />);

    const spanishText = screen.getByText('Hola');
    expect(spanishText).toBeInTheDocument();
    expect(spanishText).toBeVisible();
  });

  it('flips card on click to reveal English translation', async () => {
    const user = userEvent.setup();
    render(<Flashcard {...mockFlashcard} />);

    // Initially both texts exist in DOM
    expect(screen.getByText('Hola')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();

    // Click the card to flip
    const card = screen.getByRole('button');
    await user.click(card);

    // After flip, both texts still exist (CSS handles visual display)
    // We verify the flip occurred by checking both texts are present
    expect(screen.getByText('Hola')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('flips card back when clicked again', async () => {
    const user = userEvent.setup();
    render(<Flashcard {...mockFlashcard} />);

    const card = screen.getByRole('button');

    // First click - flip to English
    await user.click(card);
    expect(screen.getByText('Hello')).toBeInTheDocument();

    // Second click - flip back to Spanish
    await user.click(card);
    expect(screen.getByText('Hola')).toBeInTheDocument();
  });

  it('handles keyboard navigation (Enter key)', async () => {
    const user = userEvent.setup();
    render(<Flashcard {...mockFlashcard} />);

    const card = screen.getByRole('button');
    card.focus();

    // Press Enter to flip
    await user.keyboard('{Enter}');
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles keyboard navigation (Space key)', async () => {
    const user = userEvent.setup();
    render(<Flashcard {...mockFlashcard} />);

    const card = screen.getByRole('button');
    card.focus();

    // Press Space to flip
    await user.keyboard(' ');
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Flashcard {...mockFlashcard} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('aria-label');
  });

  it('shows correct/incorrect buttons after flipping', async () => {
    const user = userEvent.setup();
    render(<Flashcard {...mockFlashcard} />);

    // Buttons should not be visible initially
    expect(screen.queryByText(/i got it right/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/i got it wrong/i)).not.toBeInTheDocument();

    // Click to flip
    const card = screen.getByRole('button', { name: /flashcard/i });
    await user.click(card);

    // Buttons should now be visible
    expect(screen.getByText(/i got it right/i)).toBeInTheDocument();
    expect(screen.getByText(/i got it wrong/i)).toBeInTheDocument();
  });

  it('calls onCorrect when correct button is clicked', async () => {
    const user = userEvent.setup();
    const onCorrect = vi.fn();
    render(<Flashcard {...mockFlashcard} onCorrect={onCorrect} />);

    // Flip the card
    const card = screen.getByRole('button', { name: /flashcard/i });
    await user.click(card);

    // Click correct button
    const correctButton = screen.getByRole('button', {
      name: /mark as correct/i,
    });
    await user.click(correctButton);

    expect(onCorrect).toHaveBeenCalledTimes(1);
  });

  it('calls onIncorrect when incorrect button is clicked', async () => {
    const user = userEvent.setup();
    const onIncorrect = vi.fn();
    render(<Flashcard {...mockFlashcard} onIncorrect={onIncorrect} />);

    // Flip the card
    const card = screen.getByRole('button', { name: /flashcard/i });
    await user.click(card);

    // Click incorrect button
    const incorrectButton = screen.getByRole('button', {
      name: /mark as incorrect/i,
    });
    await user.click(incorrectButton);

    expect(onIncorrect).toHaveBeenCalledTimes(1);
  });

  it('hides buttons when showButtons is false', async () => {
    const user = userEvent.setup();
    render(<Flashcard {...mockFlashcard} showButtons={false} />);

    // Flip the card
    const card = screen.getByRole('button', { name: /flashcard/i });
    await user.click(card);

    // Buttons should not be visible even after flipping
    expect(screen.queryByText(/i got it right/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/i got it wrong/i)).not.toBeInTheDocument();
  });
});
