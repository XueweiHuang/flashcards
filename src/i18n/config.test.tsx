import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './config';

describe('i18n Configuration', () => {
  it('loads language context correctly with default English', async () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.i18n.language).toBe('en');
    });

    expect(result.current.t('welcome')).toBe('Welcome to Flashcards App');
  });

  it('can switch to French', async () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      ),
    });

    await waitFor(() => {
      result.current.i18n.changeLanguage('fr');
    });

    await waitFor(() => {
      expect(result.current.i18n.language).toBe('fr');
    });

    expect(result.current.t('welcome')).toBe(
      "Bienvenue dans l'application Flashcards"
    );
  });

  it('can switch to Chinese', async () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: ({ children }) => (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      ),
    });

    await waitFor(() => {
      result.current.i18n.changeLanguage('zh');
    });

    await waitFor(() => {
      expect(result.current.i18n.language).toBe('zh');
    });

    expect(result.current.t('welcome')).toBe('欢迎使用抽认卡应用');
  });
});
