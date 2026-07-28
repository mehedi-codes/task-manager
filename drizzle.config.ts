import { defineConfig } from 'drizzle-kit';

const drizzleConfig = defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

export default drizzleConfig;
