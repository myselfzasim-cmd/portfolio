@echo off
cd /d "%~dp0"
echo ========================================================
echo   ZASIM UDDIN - PACKAGING PORTFOLIO & ADMIN STUDIO
echo ========================================================
echo.
echo Starting Next.js studio server on http://localhost:3000...
echo Admin Studio URL: http://localhost:3000/admin
echo Default password: zasim@pran2026
echo.

start "" http://localhost:3000

call npm run dev
pause
