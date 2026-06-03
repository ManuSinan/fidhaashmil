#!/bin/bash
cd "$(dirname "$0")"
PORT=8080
echo ""
echo "  Nikkah landing page"
echo "  → Open in browser: http://localhost:${PORT}"
echo ""
echo "  Press Ctrl+C to stop."
echo ""

if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  exec python -m http.server "$PORT"
else
  echo "Python not found. Install Node and run: npm start"
  exit 1
fi
