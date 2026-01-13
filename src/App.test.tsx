import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import App from './App';

// Mock i18n for testing
const testI18n = i18n.cloneInstance({
  lng: 'en',
  resources: {
    en: {
      translation: {
        welcome: 'Welcome to Flashcards App',
        language: 'Language',
        english: 'English',
        french: 'French',
        chinese: 'Chinese',
      },
    },
  },
});

describe('App', () => {
  it('renders App component', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <App />
      </I18nextProvider>
    );

    expect(screen.getByText('Welcome to Flashcards App')).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    render(
      <I18nextProvider i18n={testI18n}>
        <App />
      </I18nextProvider>
    );

    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
  });
});
