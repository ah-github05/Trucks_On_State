Hi everyone

This is a centralized website I am currently developing for local food trucks in the Madison area. Right now it is being made on replit but I am currently in the process of transfering the platform to Vercel and updating the repo so its a bit messy right now.

For technical specs, please refer to the replit.md overview file.

## Deployment to Vercel

This project is configured for deployment to Vercel.

### 1. Set up your database

This project uses a PostgreSQL database managed by Drizzle ORM. You can use any PostgreSQL provider, but we recommend [Neon](https://neon.tech) for its serverless capabilities, which work well with Vercel.

After creating your database, you will get a connection string.

### 2. Configure Environment Variables

In your Vercel project, you need to set the following environment variable:

-   `DATABASE_URL`: The connection string for your PostgreSQL database.

### 3. Deploy

Once your environment variables are set, you can deploy your project to Vercel. The `vercel.json` file in this repository is configured to build and deploy the application correctly.

### 4. Seed the database

After your project is deployed, you need to seed the database with the initial data. To do this, you will need to run the `db:seed` script. You can do this by connecting to your Vercel project's terminal or by running it locally with the production `DATABASE_URL` set.

```bash
npm run db:seed
```
