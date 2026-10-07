@echo off
cd /d "%~dp0"

echo Starting Hexguessr dev server...
start "Hexguessr Dev Server" cmd /k npm run dev

timeout /t 3 /nobreak >nul
start "" "http://localhost:5173"

echo.
echo Game opened in your browser.
echo Close the "Hexguessr Dev Server" window to stop the server.
pause
