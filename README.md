# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## Coursework - Refinements and Notes

- Simplified and improved project to meet coursework rubric for full marks where possible.
- Key changes made:
	- Fixed broken tests and added meaningful Jest tests for `searchProperties`.
	- Enabled drag-to-favourites by wiring the drop handler to add favorites.
	- Enhanced the search form `type` control using `react-select` (better widget accessibility).
	- Removed hard-coded Google Maps API key and switched to environment variable `REACT_APP_GOOGLE_MAPS_KEY` with a safe fallback embed.
	- Tightened Content Security Policy in `public/index.html` (removed `unsafe-eval`).
	- Added `react-select` to `package.json` dependencies.

## Running the project

1. Install dependencies:

```bash
npm install
```

2. (Optional) Provide a Google Maps API key for better map embedding:

```bash
# Windows (PowerShell)
$env:REACT_APP_GOOGLE_MAPS_KEY="YOUR_KEY"

# macOS / Linux
export REACT_APP_GOOGLE_MAPS_KEY=YOUR_KEY
```

3. Start the app:

```bash
npm start
```

4. Run tests (Jest):

```bash
npm test -- --watchAll=false
```

If you want me to implement further polish (add more React widgets, improve drag-out removal UX, or prepare deployment configuration), tell me which items to prioritise.

## Deployment — Vercel (recommended)

Deploying to Vercel is straightforward. Two options: connect the GitHub repository via the Vercel dashboard, or use the Vercel CLI.

Dashboard (recommended):
- Push your project to GitHub.
- Go to https://vercel.com, sign in, choose "New Project" and import your GitHub repository.
- In the project settings set the **Build Command** to `npm run build` and **Output Directory** to `build` (these are default for CRA).
- Add any environment variables (e.g. `REACT_APP_GOOGLE_MAPS_KEY`) in the Vercel Project Settings > Environment Variables.
- Deploy — Vercel will build and provide a live URL.

Vercel CLI (alternative):
1. Install CLI:
```bash
npm i -g vercel
```
2. Login and deploy:
```bash
vercel login
vercel --prod
```
When prompted choose the project settings or accept defaults. Set `REACT_APP_GOOGLE_MAPS_KEY` in the Vercel dashboard for production.

Notes about environment variables:
- Never hard-code API keys into source files. Use `process.env.REACT_APP_GOOGLE_MAPS_KEY` in the app and set the value in Vercel's Environment Variables for Production (and Preview if needed).

Packaging for submission:
- Before zipping your project for coursework submission, remove `node_modules`.
- Ensure `package.json` and `README.md` are present and the `public/images` referenced by `src/data/properties.json` are included.

Live site:

- https://estate-agent-g5lxashae-nethmihimashas-projects.vercel.app

GitHub repository:

- https://github.com/Nethmihimasha/estate-agent-app

