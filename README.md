# An Authful Next

Testing the latest Next.js features and integration with Auth.js

## Features

- MongoDB
- Next.js v14
- Auth.js v5
- Shadcn UI
- Prisma
- Credential Login Flows
- OAuth
- Two Factor Authentication
- Parallel and Intercepting Routes
- Account Linking

### Setting up this project

1. Setup MongoDB
   `docker compose up --wait`
2. Using MongoDB Compass, connect to localhost and start a shell prompt.
   Connection String: `mongodb://127.0.0.1:27017/?replicaSet=rs0`
3. Create a database and create a new user

```
use authfulnext
db.createUser({
  user: "authfulnext",
  pwd: "password",
  roles: [{ role: "readWrite", db: "authfulnext" }]
})
```

4. Generate prisma client
   `npx prisma generate`
5. Push the schema
   `npx prisma db push`
6. Seed the database
   `npx prisma db seed`

### Authentication

The Credential provider is setup out of the box. For OAuth support, this project is configured to use Google and Github. In order to utilize these OAuth providers, you will need to provide ID and SECRETS for both services.

### Email Sending

During the authentication process, several emails are sent out. We use [Resend](https://resend.com/) to send our emails for development so you will need to setup your own account and provide your API_KEY.

You can read the docs here: [Resend Docs](https://resend.com/docs/introduction).
