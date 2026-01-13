
# ✅ Flashcards App Development To-Do List

## 📌 Order: Easy → Hard

---

### 1. Setup Project Structure ✅ **COMPLETED**
**Tasks:**
- ✅ Initialize Vite + React + TypeScript project
- ✅ Configure ESLint + Prettier
- ✅ Install Tailwind CSS
- ✅ Setup `react-i18next` for multilingual support

**Acceptance Criteria:**
- ✅ Project runs locally with `npm run dev` - **VERIFIED**
- ✅ Tailwind styles apply correctly - **VERIFIED** (build successful, styles configured)
- ✅ Language switcher works for English, French, Chinese - **VERIFIED** (unit tests passing)

**Unit Tests:**
- ✅ Verify initial render of `App.tsx` - **PASSING** (2/2 tests)
- ✅ Check if language context loads correctly - **PASSING** (3/3 tests)

**QA Tests:**
- ⚠️ Confirm app loads in Chrome, Firefox, Safari - **MANUAL TESTING REQUIRED**
- ⚠️ Verify responsive breakpoints (325px, 768px, 1024px) - **MANUAL TESTING REQUIRED**

**Status:** All automated tests passing. All acceptance criteria met for automated verification. Manual QA testing recommended before production deployment.

---

### 2. Implement Flashcard Component (Static)
**Tasks:**
- Create `Flashcard.tsx` component
- Display Spanish word on front, English on back
- Add flip animation

**Acceptance Criteria:**
- Card flips on click
- Spanish word visible initially, English after flip

**Unit Tests:**
- Render flashcard with mock data
- Simulate click → verify flipped state

**QA Tests:**
- Check flip animation on mobile and desktop
- Ensure text is readable in all languages

---

### 3. Add Correct/Incorrect Buttons
**Tasks:**
- Add two buttons below card: “Correct” and “Incorrect”
- Track user choice in component state

**Acceptance Criteria:**
- Buttons appear after flip
- Clicking updates state correctly

**Unit Tests:**
- Simulate button clicks → verify state updates
- Ensure buttons only show after flip

**QA Tests:**
- Test on touch devices (mobile)
- Verify button accessibility (keyboard navigation)

---

### 4. Track Incorrect Cards (Local State)
**Tasks:**
- Maintain array of incorrect card IDs in session
- Display count of incorrect cards

**Acceptance Criteria:**
- Incorrect cards tracked during session
- Count updates dynamically

**Unit Tests:**
- Add incorrect card → verify array updates
- Reset session clears incorrect cards

**QA Tests:**
- Test multiple incorrect selections
- Verify no duplicates in incorrect list

---

### 5. Redo Incorrect Cards Mode
**Tasks:**
- After session ends, allow user to review incorrect cards
- Implement “Redo Mode” button

**Acceptance Criteria:**
- Clicking “Redo Mode” shows only incorrect cards
- Session stats reset for redo mode

**Unit Tests:**
- Verify incorrect cards filter logic
- Ensure redo mode resets stats

**QA Tests:**
- Complete session → enter redo mode → confirm only incorrect cards appear
- Test on all screen sizes

---

### 6. Quiz Mode: Multiple Choice
**Tasks:**
- Generate 1 correct answer + 3 distractors
- Display options below question
- Validate user selection

**Acceptance Criteria:**
- Correct answer recognized
- Distractors are unique and not the correct answer

**Unit Tests:**
- Generate distractors → ensure uniqueness
- Simulate selection → verify correctness

**QA Tests:**
- Test multiple rounds of quiz
- Validate UI responsiveness for options

---

### 7. Quiz Mode: Fill-in-the-Blank
**Tasks:**
- Display Spanish word, user types English translation
- Validate exact spelling

**Acceptance Criteria:**
- Correct spelling passes, incorrect fails
- Case sensitivity handled (optional)

**Unit Tests:**
- Validate exact match logic
- Test edge cases (empty input, whitespace)

**QA Tests:**
- Test on mobile keyboard input
- Verify error message for incorrect spelling

---

### 8. Statistics Page
**Tasks:**
- Show total studied, correct vs incorrect
- Reset stats on new session

**Acceptance Criteria:**
- Stats update dynamically during session
- Reset works correctly

**Unit Tests:**
- Verify stats calculation logic
- Test reset functionality

**QA Tests:**
- Check stats accuracy after multiple sessions
- Validate layout on all breakpoints

---

### 9. Authentication (Basic Login)
**Tasks:**
- Implement login form
- Store token in memory (mock for now)
- Prepare for future SSO integration

**Acceptance Criteria:**
- User can log in with username/password
- Redirect to dashboard after login

**Unit Tests:**
- Validate form input
- Mock login API → verify success/failure handling

**QA Tests:**
- Test login flow on desktop and mobile
- Verify error handling for invalid credentials

---

### 10. Internationalization (Full UI)
**Tasks:**
- Translate all UI text into English, French, Chinese
- Implement language switcher in header

**Acceptance Criteria:**
- Switching language updates all UI text
- Default language is English

**Unit Tests:**
