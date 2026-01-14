import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders App component with routing', () => {
    render(<App />);
    
    // Check if home page content is rendered
    expect(screen.getByText('Spanish Flashcards')).toBeInTheDocument();
  });

  it('renders navigation buttons on home page', () => {
    render(<App />);
    
    // Check for the three main navigation options
    expect(screen.getByText('Study Mode')).toBeInTheDocument();
    expect(screen.getByText('Quiz Mode')).toBeInTheDocument();
    expect(screen.getByText('Statistics')).toBeInTheDocument();
  });
});
