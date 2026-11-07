@echo off
cd /d "%~dp0"
echo Starting local preview... your browser will open in a moment.
start "" http://localhost:8000/index.html
python -m http.server 8000
pause
