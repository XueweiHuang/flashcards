export interface Flashcard {
  id: string;
  category: 'animals' | 'food' | 'verbs';
  spanish: string;
  english: string;
  quiz: {
    type: 'multiple-choice' | 'fill-in-blank';
    options?: string[]; // For multiple choice (includes correct answer)
  };
}

export const flashcardsData: Flashcard[] = [
  // Animals
  {
    id: 'animal-1',
    category: 'animals',
    spanish: 'el gato',
    english: 'the cat',
    quiz: {
      type: 'multiple-choice',
      options: ['the cat', 'the dog', 'the bird', 'the fish'],
    },
  },
  {
    id: 'animal-2',
    category: 'animals',
    spanish: 'el perro',
    english: 'the dog',
    quiz: {
      type: 'multiple-choice',
      options: ['the dog', 'the cat', 'the horse', 'the rabbit'],
    },
  },
  {
    id: 'animal-3',
    category: 'animals',
    spanish: 'el pájaro',
    english: 'the bird',
    quiz: {
      type: 'multiple-choice',
      options: ['the bird', 'the fish', 'the cat', 'the mouse'],
    },
  },
  {
    id: 'animal-4',
    category: 'animals',
    spanish: 'el pez',
    english: 'the fish',
    quiz: {
      type: 'fill-in-blank',
    },
  },

  // Food
  {
    id: 'food-1',
    category: 'food',
    spanish: 'el pan',
    english: 'the bread',
    quiz: {
      type: 'multiple-choice',
      options: ['the bread', 'the water', 'the milk', 'the cheese'],
    },
  },
  {
    id: 'food-2',
    category: 'food',
    spanish: 'la manzana',
    english: 'the apple',
    quiz: {
      type: 'multiple-choice',
      options: ['the apple', 'the orange', 'the banana', 'the pear'],
    },
  },
  {
    id: 'food-3',
    category: 'food',
    spanish: 'el agua',
    english: 'the water',
    quiz: {
      type: 'multiple-choice',
      options: ['the water', 'the juice', 'the coffee', 'the tea'],
    },
  },
  {
    id: 'food-4',
    category: 'food',
    spanish: 'el queso',
    english: 'the cheese',
    quiz: {
      type: 'fill-in-blank',
    },
  },

  // Verbs
  {
    id: 'verb-1',
    category: 'verbs',
    spanish: 'hablar',
    english: 'to speak',
    quiz: {
      type: 'multiple-choice',
      options: ['to speak', 'to eat', 'to drink', 'to run'],
    },
  },
  {
    id: 'verb-2',
    category: 'verbs',
    spanish: 'comer',
    english: 'to eat',
    quiz: {
      type: 'multiple-choice',
      options: ['to eat', 'to speak', 'to write', 'to read'],
    },
  },
  {
    id: 'verb-3',
    category: 'verbs',
    spanish: 'beber',
    english: 'to drink',
    quiz: {
      type: 'multiple-choice',
      options: ['to drink', 'to eat', 'to sleep', 'to walk'],
    },
  },
  {
    id: 'verb-4',
    category: 'verbs',
    spanish: 'correr',
    english: 'to run',
    quiz: {
      type: 'fill-in-blank',
    },
  },
];

export const getCardsByCategory = (category: string): Flashcard[] => {
  return flashcardsData.filter((card) => card.category === category);
};

export const categories = ['animals', 'food', 'verbs'] as const;
