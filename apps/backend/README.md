# DFC Studios Backend

The backend CMS for Designers for Climate Studios, powered by Payload CMS.

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

The admin panel will be available at [http://localhost:3001](http://localhost:3001)

## Building

```bash
pnpm build
```

## Environment Variables

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_uri
PAYLOAD_SECRET=your_secret_key
# Add other environment variables here
```

## API Endpoints

- Admin Panel: `http://localhost:3001`
- API: `http://localhost:3001/api`
- GraphQL: `http://localhost:3001/api/graphql`

## Related Links

- [Frontend](../studio)
- [Main Documentation](../../README.md)
