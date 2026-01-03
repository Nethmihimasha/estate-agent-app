Viva Notes — Estate Agent SPA

Quick bullets to guide the viva:

- Project overview: client-side SPA that searches properties in `properties.json` with 7 sample properties.
- Core features: multi-criteria search, responsive results grid, detailed property page with gallery and tabs, favourites via button + drag/drop, persistent favorites in `localStorage`.
- Data model: properties JSON contains fields `id, type, bedrooms, price, tenure, description, longDescription, location, postcode, images[], floorplan, added {month,day,year}`.
- Search algorithm: `searchProperties()` performs sequential filter checks for each provided criteria; dates converted using month-name mapping.
- Widgets & UX: `react-datepicker`, `react-select` used; drag/drop via `react-dnd`; gallery manually implemented (thumbnails + next/prev).
- Security: inputs sanitized with `DOMPurify`; CSP meta present; no API keys committed — use `REACT_APP_GOOGLE_MAPS_KEY` in deployment.
- Testing: Jest tests cover search logic and component rendering; run `npm test -- --watchAll=false`.
- Deployment: hosted on Vercel (live URL provided in README). Show the deployed site during viva.
- Known limitations & future work: replace remaining native inputs with widgets, add keyboard undo for favourites, tighten CSP further.
- Quick demo script: open search page -> filter by type/price/bedrooms/postcode/date -> view property details -> show gallery thumbnails and tabs -> add favourite by button and by drag to sidebar -> remove favourite by trash drop or remove button -> show `localStorage` persistence.

Memorize these 8–10 bullets and expand with code references (file names) as needed.
