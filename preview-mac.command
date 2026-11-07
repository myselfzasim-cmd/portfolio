#!/bin/bash
cd "$(dirname "$0")"
echo "Starting local preview... your browser will open in a moment."
( sleep 1 && open "http://localhost:8000/index.html" ) &
python3 -m http.server 8000
