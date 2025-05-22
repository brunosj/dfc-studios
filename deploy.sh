#!/bin/bash

set -e  # Exit on error
set -x  # Print commands

echo "Starting deployment process..."

# Ensure correct Node.js and pnpm are in PATH
export PATH=$HOME/.nvm/versions/node/v22.12.0/bin:$HOME/.local/share/pnpm:$PATH

BASE_DIR="/home/lando/dfcstudios"
cd "$BASE_DIR"

# Pull latest changes
git pull origin main

# Install dependencies
pnpm install

# Build applications with fresh data
echo "Building frontend with fresh data..."
export NEXT_FETCH_CACHE=force-no-store
cd "$BASE_DIR/apps/studio" && pnpm build:fresh && cd "$BASE_DIR"

echo "Building backend..."
if [ -d "$BASE_DIR/apps/backend" ]; then
    cd "$BASE_DIR/apps/backend" && pnpm build && cd "$BASE_DIR"
else
    echo "Warning: Backend directory not found, skipping backend build"
fi

# Restart or start apps using PM2
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

if pm2 list | grep -q "frontend\|backend"; then
    pm2 reload all
else
    pm2 start "$BASE_DIR/ecosystem.config.js"
fi

pm2 save
echo "Deployment completed successfully!"
pm2 list