import "dotenv/config";

export const PORT = process.env.PORT || 3005;
export const DB_HOST = process.env.DB_HOST || "localhost"
export const DB_PORT = process.env.DB_PORT || 5432
export const DB_USERNAME = process.env.DB_USERNAME || "test"
export const DB_PASSWORD = process.env.DB_PASSWORD || "test"
export const DB_DATABASE = process.env.DB_DATABASE || "test"
