@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js could not be found. Please install Node.js LTS from https://nodejs.org/
  pause
  exit /b 1
)
echo Starting Anivex Solution on http://localhost:3000
node local-server.cjs
if errorlevel 1 (
  echo.
  echo Server failed to start. Check the error shown above.
  pause
)
