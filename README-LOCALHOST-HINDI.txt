ANIVEX SOLUTION - RUN WEBSITE ON LOCALHOST (WINDOWS)
==================================================

This folder is a DEPLOYMENT BUILD of the website (already-built HTML, CSS, JS).
It does NOT include the original React/Vite source files or a separate backend.
For local preview, you do NOT need to run a build.

STEP 1: Extract this entire ZIP into a NEW, empty folder (do not merge with an old folder).
STEP 2: In that folder, open PowerShell/Terminal.
STEP 3: Run:

   npm run dev

STEP 4: Open http://localhost:3000 in your browser.
Admin UI: http://localhost:3000/admin

Alternative: Double-click START-LOCALHOST.bat in the extracted folder.
Node.js is required. No additional npm packages are needed.
Stop the server with Ctrl+C.

NOTE: npm install is optional; this package has zero external dependencies.
Do NOT run "npm audit fix --force" blindly; it can change or break projects.

PowerShell: If port 3000 is busy, start another port:

   $env:PORT=3001; npm run dev

And open http://localhost:3001/

IMPORTANT: Auth, remote data, forms, or Firebase-backed admin features may require
internet access and appropriate remote service authorization/configuration.
The included files are a static frontend deployment, not a local backend.
The launch fix does not grant access to protected remote services.
