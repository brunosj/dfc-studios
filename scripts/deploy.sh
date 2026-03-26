#!/bin/bash

set -Eeuo pipefail
set -x  # Print commands

echo "Starting deployment process..."

# Ensure correct Node.js and pnpm are in PATH
export PATH=$HOME/.nvm/versions/node/v22.12.0/bin:$HOME/.local/share/pnpm:$PATH

BASE_DIR="/home/lando/dfc-studios"
cd "$BASE_DIR"

# Pull latest changes
git fetch origin
git reset --hard origin/main

# Install dependencies
pnpm install

echo "Building backend..."
if [ ! -d "$BASE_DIR/apps/backend" ]; then
  echo "Error: Backend directory not found: $BASE_DIR/apps/backend"
  exit 1
fi
cd "$BASE_DIR/apps/backend"
pnpm build
cd "$BASE_DIR"

# Ensure PM2 is installed
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
fi

if [ ! -f "$BASE_DIR/ecosystem.config.js" ]; then
  echo "Error: Missing PM2 ecosystem file: $BASE_DIR/ecosystem.config.js"
  exit 1
fi

# Start/reload backend first so frontend build can fetch from localhost:5173
if pm2 describe backend > /dev/null 2>&1; then
  pm2 reload backend --update-env
else
  pm2 start "$BASE_DIR/ecosystem.config.js" --only backend --update-env
fi

# Wait for backend health before frontend build (required for localhost CMS fetches)
for i in {1..30}; do
  if curl -fsS "http://127.0.0.1:5173/" > /dev/null; then
    break
  fi
  if [ "$i" -eq 30 ]; then
    echo "Error: backend did not become reachable at http://127.0.0.1:5173"
    pm2 logs backend --lines 100
    exit 1
  fi
  sleep 1
done

# Build frontend with fresh data
echo "Building frontend with fresh data..."
export NEXT_FETCH_CACHE=force-no-store
cd "$BASE_DIR/apps/studio"
pnpm build:fresh
cd "$BASE_DIR"

# Start/reload frontend explicitly (do not reload unrelated apps)
if pm2 describe frontend > /dev/null 2>&1; then
  pm2 reload frontend --update-env
else
  pm2 start "$BASE_DIR/ecosystem.config.js" --only frontend --update-env
fi

# Validate required apps are online
for app in backend frontend; do
  if ! pm2 describe "$app" > /dev/null 2>&1; then
    echo "Error: PM2 app '$app' was not found after deployment"
    exit 1
  fi
  if ! pm2 jlist | grep -q "\"name\":\"$app\".*\"status\":\"online\""; then
    echo "Error: PM2 app '$app' is not online"
    pm2 show "$app"
    exit 1
  fi
done

pm2 save
echo "Deployment completed successfully!"
pm2 list