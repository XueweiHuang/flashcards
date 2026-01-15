/**
 * Design tokens and theme constants for the application
 * Centralized styling values to ensure consistency
 */

export const COLORS = {
  // Primary colors
  primary: {
    blue: '#3b82f6',
    blueDark: '#2563eb',
    green: '#22c55e',
    greenDark: '#16a34a',
    purple: '#a855f7',
    purpleDark: '#9333ea',
  },
  // Category colors
  category: {
    orange: '#f97316',
    orangeDark: '#ea580c',
    red: '#ef4444',
    redDark: '#dc2626',
    indigo: '#6366f1',
    indigoDark: '#4f46e5',
  },
  // Status colors
  status: {
    success: '#10b981',
    successDark: '#059669',
    error: '#ef4444',
    errorDark: '#dc2626',
  },
  // Neutral colors
  gray: {
    light: '#64748b',
    dark: '#475569',
  },
} as const;

export const DIMENSIONS = {
  card: {
    width: '420px',
    maxWidth: '85vw',
    height: '260px',
  },
  button: {
    width: '200px',
    categoryWidth: '180px',
    minWidth: '160px',
  },
  spacing: {
    cardGap: '2rem',
    buttonGap: '60px',
    cardMarginBottom: '50px',
    exitButtonMarginTop: '60px',
  },
  borderRadius: '5px',
  iconSize: '4rem',
  categoryIconSize: '5rem',
} as const;

export const GRADIENTS = {
  flashcard: {
    front: 'linear-gradient(to bottom right, #3b82f6, #1d4ed8)',
    back: 'linear-gradient(to bottom right, #10b981, #059669)',
  },
} as const;

export const CATEGORY_CONFIG = {
  animals: {
    emoji: '🐾',
    color: COLORS.category.orange,
    hoverColor: COLORS.category.orangeDark,
  },
  food: {
    emoji: '🍎',
    color: COLORS.category.red,
    hoverColor: COLORS.category.redDark,
  },
  verbs: {
    emoji: '⚡',
    color: COLORS.category.indigo,
    hoverColor: COLORS.category.indigoDark,
  },
} as const;

export const MODE_CONFIG = {
  study: {
    emoji: '📚',
    color: COLORS.primary.blue,
    hoverColor: COLORS.primary.blueDark,
  },
  quiz: {
    emoji: '🎯',
    color: COLORS.primary.green,
    hoverColor: COLORS.primary.greenDark,
  },
  stats: {
    emoji: '📊',
    color: COLORS.primary.purple,
    hoverColor: COLORS.primary.purpleDark,
  },
} as const;
