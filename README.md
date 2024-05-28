## Prerequisites

you must have npm installed

install packages:

```shell
npm install
```

in clerk's session token, add:

```json
{
	"metadata": "{{user.public_metadata}}",
	"last_name": "{{user.last_name}}",
	"first_name": "{{user.first_name}}"
}
```

you also need to have `.env` file in root project, in the file you need `key=value` each line<br>
required environment variables:<br>
Variable | Purpose
--- | ---
NEXT_PUBLIC_NODE_ENV | set runtime environment, can be "development" or "production"
NEXT_PUBLIC_DOMAIN | set app domain name
NEXT_PUBLIC_PROTOCOL | set protocol, can be "http" or "https"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | clerk public key
CLERK_SECRET_KEY | clerk secret key
WEBHOOK_SECRET | clerk webhook key for webhook connection
DATABASE_URL | for prisma connection with database

## About project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Update database schema:

```bash
npx prisma db push
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Run test

Run the end-to-end tests

```bash
npx playwright test
```

Start the interactive UI mode

```bash
npx playwright test --ui
```

Run the test only on Desktop Chrome

```bash
npx playwright test --project=chromium
```

Run the tests in a specific file

```bash
npx playwright test example
```

Run the tests in debug mode

```bash
npx playwright test --debug
```

Auto generate tests with Codegen

```bash
npx playwright codegen
```

We suggest that you begin by typing:

```bash
npx playwright test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
