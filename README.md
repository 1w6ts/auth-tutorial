# Hono Auth API

A lightweight authentication API built with Hono.js, TypeScript, Drizzle ORM, and Neon PostgreSQL.

## Features

- JWT-based authentication
- User registration and login
- Protected routes
- PostgreSQL with Neon.tech
- Type-safe queries with Drizzle ORM

## Tech Stack

- Hono.js
- TypeScript
- PostgreSQL (Neon.tech)
- Drizzle ORM
- bcrypt & JWT

## Getting Started

### Prerequisites

- Node.js 18+
- Neon.tech account

### Setup

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/yourusername/hono-auth-api.git
cd hono-auth-api
npm install
```

2. Create a **`.env`** file:

```text
DATABASE_URL=postgresql://idkbro
JWT_SECRET=your_secret
PORT=3000 // adjust if needed
```

3. Run migrations and start the server:

```
bash
npm run generate
npm run migrate
npm run dev
```

## API Endpoints

### Public

- ´POST /register´ - Create a new user

```json
{
  "email": "user@example.com",
  "password": "password134",
  "name": "John"
}
```

- `POST /login` - Authenticate

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

- `GET / ` - health check

### Protected

- `GET /protected` - example protected route
  - Requires Authorization: Bearer <token> header

## Project Structure

```text
src/
├── config/         # app config
├── controllers/    # route handlers
├── db/             # db setup
├── middleware/     # middleware
├── models/         # models
├── services/       # business logic
├── utils/          # helper functions
└── index.ts        # entry point
```

## License

MIT
