import { Pool } from "pg";

export default () => {
  if (process.env.NODE_ENV == "production") {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } else {
    return new Pool({
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
    });
  }
};
