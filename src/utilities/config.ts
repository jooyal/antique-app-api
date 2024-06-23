// import "dotenv/config"; no need of dotenv from node 20.6.0 as it supports natively (ProcessEnv).

export const config = {
  port: parseInt(process.env.PORT || "") || 3000,
  hostname: process.env.HOSTNAME || "localhost",
  environment: (process.env.NODE_ENV || "dev").toUpperCase(),
  db: {
    name: process.env.DB_NAME || "",
    port: parseInt(process.env.DB_PORT || "") || 5432,
    hostname: process.env.DB_HOSTNAME || "localhost",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "",
    entityPattern: process.env.DB_ENTITY_PATTERN || "",
    shouldSynchronize:
      process.env.DB_SHOULD_SYNCHRONIZE?.toUpperCase() === "TRUE",
    shouldDropSchema:
      process.env.DB_SHOULD_DROP_SCHEMA?.toUpperCase() === "TRUE",
  },
};
