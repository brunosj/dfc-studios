![DFC Studios Logo](https://dfc.studio/dfc-og-image.jpg)

# Designers for Climate Studios

A monorepo containing the Designers for Climate (DFC) Studios platform, consisting of a Next.js frontend and a Payload CMS backend.

## Project Structure

```
designers-for-climate/
├── apps/
│ ├── studio/ # Next.js frontend application
│ └── backend/ # Payload CMS backend
├── package.json
├── deploy.sh # Deployment script
└── ecosystem.config.js
```

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Start development servers:

```bash
pnpm dev
```

This will start:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend CMS: [http://localhost:3001](http://localhost:3001)

## Production Deployment

Run the deployment script:

```bash
./deploy.sh
```

This will:

- Pull latest changes
- Install dependencies
- Build both applications
- Start/restart PM2 processes

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Payload CMS
- **Database**: MongoDB
- **Process Manager**: PM2
