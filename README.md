# Promodo Timer

Timer for focusing/studying/working/ect. This project was developed only in educational interest, not commercial.

## :hammer_and_wrench: Stack

1. Database: MS SQL already deployed to Azure, ORM - Prisma
2. Frontend: React using Typescript
3. API: REST, Swagger UI, Postman

## :wrench: Configuration

1. Create `~/.env` file and add databases JDBC (SQL authentication) links, all auth services ID's and secret's:

```shell
# Database Setup
DATABASE_URL=""
SHADOW_DATABASE_URL=""

# Google Auth Setup
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# GitHub Auth Setup
GITHUB_ID=""
GITHUB_SECRET=""

# NextAuth Setup
NEXTAUTH_SECRET="randomPassword"
NEXTAUTH_URL="http://localhost:3000"
```

2. Run in terminal:

```shell
npm ci
npx prisma generate
npm run dev
```

## :pencil: Decomposition of tasks

1. **Deployment**

   - [x] Database using Azure
   - [ ] Frontend using Vercel
   - [ ] CI/CD using Vercel

2. **API**

   - [ ] Connect Swagger UI
   - [ ] Add all CRUD operations
   - [ ] Connect Postman

3. **Database**

   - [x] Services
   - [ ] Dependency injection in NextJS app ??

4. **Pages**
   - [ ] About
   - [ ] Sign In, Sign Up page
   - [x] Different OAuth variants: Google, Microsoft
   - [ ] Home with your timer. Choose different timers, search for people, timers\settings
   - [ ] Profile with your timers, timer's settings

## :iphone: Contact me

:email: [Email](mailto:olegsuv.dev@gmail.com)

:calling: [Telegram](https://t.me/suph0mi3)
