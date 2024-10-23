# An Authful Next

---

Testing the latest Next.js v14 features and integration with Auth.js v5

## Features

- MongoDB
- Next.js v14
- Auth.js v5
- Shadcn UI
- Prisma
- Accessibility focused

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
