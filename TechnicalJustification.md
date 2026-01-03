Technical Justification — Estate Agent SPA

Overview

This document maps the coursework rubric to the implementation in this project and justifies design choices.

1. JSON Data (4%)
- `src/data/properties.json` includes 7 properties covering a range of types (House/Flat), prices, bedrooms, dates, and postcode areas. This satisfies the requirement for seven diverse entries.

2. React UI Widgets (8%)
- Date inputs: `react-datepicker` used for `dateFrom`/`dateTo`.
- Type selector: `react-select` used to provide an accessible, consistent select widget.
- Remaining inputs are native but sanitized; further enhancement (range sliders, numeric steppers) is recommended to meet full distinction.

3. Search Functionality (10%)
- Implemented in `src/utils/searchUtils.js` as `searchProperties(properties, criteria)`.
- Supports combinable criteria: type, min/max price, min/max bedrooms, postcode (partial), and date range (dateFrom/dateTo).
- Dates use month/day/year fields from JSON and are converted to JS `Date` for comparisons.

4. Results Display (7%)
- `PropertyCard` displays image, formatted price (`formatPrice`), short description and key info. Grid layout in `SearchForm` provides responsive cards.

5. Property Page — Gallery (5%)
- `PropertyDetails` provides a main image, thumbnails, next/prev navigation, and image counter; each property has 6–8 images in JSON.

6. Property Page — Tabs (7%)
- Implemented via `react-tabs` showing Description, Floor Plan and Map.
- Map uses an environment variable `REACT_APP_GOOGLE_MAPS_KEY` when available; otherwise falls back to a safe embed URL.

7. Favourites (8%)
- Add by button: implemented in `PropertyCard` and managed in `App` state; duplicates prevented.
- Drag-and-drop: `react-dnd` is used to drag property cards into the `FavoritesList` dropzone (adds to favorites).
- Drag-to-remove: favorites are draggable and can be dropped into a trash dropzone to remove.
- Clear and per-item remove buttons implemented.

8. Responsive Design (8%)
- CSS in `App.css`, `SearchForm.css`, and `PropertyDetails.css` uses CSS Grid and media queries with at least two layouts (desktop and <= 1024px/tablet). Handwritten media queries control layout changes.

9. Accessibility & Security (3% + part of code quality)
- Inputs sanitized with `DOMPurify` in `SearchForm` to prevent XSS.
- CSP meta tag added in `public/index.html`; note that CRA development mode requires some relaxations (inline styles). For submission, production CSP should avoid `unsafe-eval` and `unsafe-inline` where possible.
- Images provide alt text; a lint warning about redundant wording was corrected or can be adjusted to concise descriptions.

10. Testing (12%)
- Jest tests in `src/__tests__` include meaningful unit tests for search logic and component behavior (>=5 tests). Tests were adapted to run in the environment while mocking ESM modules where necessary.

Notes on choices and limitations
- Map API key: not committed. Use `REACT_APP_GOOGLE_MAPS_KEY` in Vercel environment settings.
- Some form fields remain native to keep implementation simple; swapping to advanced widgets is straightforward and recommended for additional marks.

Files of interest
- Search logic: `src/utils/searchUtils.js`
- Search UI: `src/components/SearchForm.js`
- Property card: `src/components/PropertyCard.js`
- Favorites: `src/components/FavoritesList.js`
- Property details + gallery + tabs: `src/components/PropertyDetails.js`

This document is brief; expand any section for the viva if you want more detailed talking points or code references.
