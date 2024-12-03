import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env.local' });

export default defineConfig({
    schema: [
        "./src/lib/drizzy/schema/users.ts",
        "./src/lib/drizzy/schema/other.ts"
    ],
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});