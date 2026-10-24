# CloudOps Manager API

NestJS REST API for CloudOps projects and servers, with JWT authentication, role-based access, Prisma, and PostgreSQL.

## Setup

From the `backend` directory, copy `.env.example` to `.env`, then install dependencies and prepare the database:

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
```

## Run

```bash
npm run start:dev
```

Swagger documentation: http://localhost:3000/api/docs

## Test

```bash
npm test -- --runInBand
```
