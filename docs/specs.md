
# 📘 Flashcards Web App Specification

## 1. Project Overview
A responsive web application for learning Spanish vocabulary through flashcards. Users can study preloaded sets from a backend, add their own cards, and track progress. Includes quiz modes and multilingual UI.

---

## 2. Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS (or CSS Modules)
- **State Management**: React Context or Zustand
- **Persistence**: Local Storage (for user-added cards and session stats)
- **Internationalization**: `react-i18next` for English, French, Chinese
- **Authentication**: Basic login (future-ready for SSO)
- **Build Tool**: Vite
- **Testing**: Jest + React Testing Library

---

## 3. Features
- **Flashcards**:
  - Preloaded sets from backend
  - User-added cards stored locally
  - Flip card to reveal English translation
- **Answer Tracking**:
  - Buttons: “Correct” / “Incorrect”
  - Track incorrect cards for review
- **Redo Mode**:
  - Review incorrect cards after completing a set
- **Quiz/Test Mode**:
  - Multiple choice (auto-generated distractors)
  - Fill-in-the-blank (exact spelling)
- **Statistics**:
  - Track studied cards, correct vs incorrect (per session)
- **Internationalization**:
  - UI in English, French, Chinese
- **Responsive Design**:
  - Mobile ≥325px, Tablet ≥768px, Desktop ≥1024px, Ultra-large screens

---

## 4. Functional Requirements
- **FR1**: User can log in (basic auth)
- **FR2**: Load preloaded flashcard sets from backend
- **FR3**: Add custom cards (stored in local storage)
- **FR4**: Flip card to reveal translation
- **FR5**: Mark card as correct/incorrect
- **FR6**: Track incorrect cards for redo mode
- **FR7**: Quiz mode with:
  - Multiple choice (auto distractors)
  - Fill-in-the-blank (exact match)
- **FR8**: Display session statistics
- **FR9**: Responsive layout
- **FR10**: Support English, French, Chinese UI

---

## 5. Non-functional Requirements
- **Performance**: Load within 2 seconds on modern devices
- **Accessibility**: WCAG 2.1 AA compliance
- **Scalability**: Future backend integration for SSO and cloud persistence
- **Security**: Basic auth with hashed passwords (future OAuth/SSO)

---

## 6. UI/UX Notes
- **Card Layout**:
  - Front: Spanish word
  - Back: English translation + buttons (Correct / Incorrect)
- **Quiz Screen**:
  - Multiple choice: 1 correct + 3 distractors
  - Fill-in-the-blank: Text input with validation
- **Statistics Page**:
  - Cards studied
  - Correct vs incorrect count
- **Responsive Grid** for cards

---

## 7. Data Model
### Flashcard
```ts
interface Flashcard {
  id: string;
  spanish: string;
  english: string;
  category?: string;
}
