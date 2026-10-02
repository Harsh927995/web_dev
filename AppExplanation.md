# App.jsx Explanation for Interview

## Overview
`src/App.jsx` is the root React component for the Khoje Khatam web app. It sets up app state, filtering logic, user login, and renders the main page structure.

## Imports
- `useMemo`, `useState`, `useEffect` from React for state, memoized values, and lifecycle effects.
- `useLocation` from `react-router-dom` to read query string parameters.
- `contentItems` from `./data/pyqs.js` is the dataset used for search and filtering.
- Components imported:
  - `SearchBar` for search and filters.
  - `ContentList` for list of filtered study items.
  - `ContentView` for displaying the selected item.
  - `ProfileMenu` for login / user account UI.
  - `TermsAndConditions` and `PrivacyPolicy` for modal dialogs.
  - `BranchFilter` for branch selection.

## State Variables
- `search`: text search input.
- `selectedId`: id of the currently selected content item.
- `filterTopic`: current topic filter.
- `filterSubject`: current subject filter.
- `filterSemester`: current semester filter.
- `filterYear`: current year filter.
- `filterBranch`: current branch filter.
- `isLoggedIn`: whether the user is logged in.
- `user`: logged-in user profile data.
- `showProfile`: whether the profile modal is visible.
- `showTerms`: whether terms dialog is visible.
- `showPrivacy`: whether privacy dialog is visible.
- `isHeaderMinimized`: whether header shrinks on scroll.

## Memoized Lists
- `branches`: unique branch names from `contentItems`, with `All` first.
- `topics`: unique topic names from `contentItems`, with `All` first.
- `years`: unique year values from `contentItems`, with `All` first.

These values are memoized so they don’t recompute on every render unless the dependencies change.

## Filtering Logic
- `filteredItems` is computed from `contentItems`.
- For each item, the code checks:
  - `matchesSearch`: whether search text appears in title, subject, content, or notes.
  - `matchesSubject`: whether the selected subject filter matches.
  - `matchesSemester`: whether the selected semester filter matches.
  - `matchesTopic`: whether the selected topic filter matches.
  - `matchesYear`: whether the selected year filter matches.
  - `matchesBranch`: whether the selected branch filter matches.
- The item is included only if all checks pass.

## Selected Item
- `selectedItem` is the item whose `id` matches `selectedId`.
- If no selected item exists, it falls back to the first item from `filteredItems`.
- If there is still no item, it becomes `null`.

## Login Handlers
- `handleLogin(userData)`: stores the user data and marks `isLoggedIn` true.
- `handleLogout()`: clears the user data and closes the profile menu.

## Header Scroll Effect
- `useEffect` adds a scroll listener.
- If the window scroll position is above 100px, `isHeaderMinimized` is false.
- If it is below 100px, `isHeaderMinimized` becomes true.
- This enables a smaller header while scrolling.

## Query Parameter Handling
- The app reads URL query parameters using `useLocation()`.
- It supports:
  - `branch` to preselect a branch.
  - `subject` to preselect a subject.
  - `semester` to preselect a semester.
- When query params exist, the app applies them to filters and selects the matching item.

## Rendered Layout
The component returns the app structure:

### Header
- Displays the app logo and title.
- Contains `ProfileMenu` with login/account controls.

### About Section
- Contains marketing text describing the app.
- Shows feature highlights and an "Explore Resources" button.

### Branch Filter
- Renders `BranchFilter` to choose the branch.
- `branches` is passed from the memoized list.
- Selected branch changes update `filterBranch`.

### Main Content
- `SearchBar` shows search input and filter controls.
- `ContentList` shows the list of filtered study content.
- `ContentView` shows the details of the selected item.
- If no item is selected, it shows an empty state message.

### Footer
- Includes brand text and quick links.
- Links open the Terms and Privacy dialogs.
- Social icons are included.
- Copyright text is shown.

### Modals
- `TermsAndConditions` is rendered when `showTerms` is true.
- `PrivacyPolicy` is rendered when `showPrivacy` is true.

## Key Interview Points
- This file is responsible for app-level state and page layout.
- It uses React hooks for state, memoization, and side effects.
- The filtering logic is centralized in `filteredItems`.
- The component passes state and handlers down to child components.
- It supports deep linking through URL query parameters.
- It has a responsive header effect based on scrolling.

## Summary
`App.jsx` acts as the root container for the Khoje Khatam application, coordinating:
- search filtering,
- branch/topic/year/semester filters,
- item selection and display,
- login/profile state,
- modal visibility,
- and page rendering.

This explanation is suitable for preparing interview notes or converting into a PDF document.
