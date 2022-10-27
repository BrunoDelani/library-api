/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

export const PORT = process.env.PORT;
export const CONNECTION_HOST = process.env.DB_HOST;
export const CONNECTION_PORT = Number(process.env.DB_PORT);
export const CONNECTION_USERNAME = process.env.DB_USERNAME;
export const CONNECTION_PASSWORD = process.env.DB_PASSWORD;
export const CONNECTION_DB = process.env.DB_DATABASE;
