@echo off
echo.
echo ====================================
echo   Project Tracker - Quick Start
echo ====================================
echo.
echo Starting local server...
echo.
echo Your app will open at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python HTTP Server...
    start http://localhost:8000/index-new.html
    python -m http.server 8000
) else (
    REM Check if Node.js is installed
    node --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo Using npx http-server...
        start http://localhost:8000/index-new.html
        npx http-server -p 8000
    ) else (
        echo.
        echo ERROR: Neither Python nor Node.js found!
        echo.
        echo Please install one of the following:
        echo - Python: https://python.org
        echo - Node.js: https://nodejs.org
        echo.
        echo Or simply open index-new.html in your browser.
        pause
    )
)
