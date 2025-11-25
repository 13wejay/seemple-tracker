#!/bin/bash

echo ""
echo "===================================="
echo "  Project Tracker - Quick Start"
echo "===================================="
echo ""
echo "Starting local server..."
echo ""
echo "Your app will open at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "Using Python HTTP Server..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:8000/index-new.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open http://localhost:8000/index-new.html
    fi
    python3 -m http.server 8000
# Check if Node.js is installed
elif command -v node &> /dev/null; then
    echo "Using npx http-server..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:8000/index-new.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open http://localhost:8000/index-new.html
    fi
    npx http-server -p 8000
else
    echo ""
    echo "ERROR: Neither Python nor Node.js found!"
    echo ""
    echo "Please install one of the following:"
    echo "- Python: https://python.org"
    echo "- Node.js: https://nodejs.org"
    echo ""
    echo "Or simply open index-new.html in your browser."
    read -p "Press enter to continue"
fi
