# Bryan Hadden Monorepo

This monorepo contains both the music production site and the tech portfolio site for Bryan Hadden.

## Structure

- `apps/music/` - Music producer website (Next.js)
- `apps/tech/` - Tech portfolio website (Next.js)
- `packages/shared/` - Shared components and utilities

## Development

Install dependencies:
```bash
npm install
```

### Run both sites simultaneously:
```bash
npm run dev
```

### Run individual sites:

**Music site** (runs on port 3001):
```bash
npm run dev:music
```

**Tech site** (runs on port 3002):
```bash
npm run dev:tech
```

## Building

Build all apps:
```bash
npm run build
```

Build individual apps:
```bash
npm run build:music
npm run build:tech
```

## Production

Start all apps:
```bash
npm run start
```

Start individual apps:
```bash
npm run start:music  # Port 3001
npm run start:tech   # Port 3002
```