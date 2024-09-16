-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "bets" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user" ("id"),
    "sportsbook" VARCHAR(100),
    "sport" VARCHAR(100),
    "player" VARCHAR(100),
    "prop_type" VARCHAR(100),
    "prop_number" INTEGER,
    "amount" DECIMAL,
    "status" VARCHAR(20) DEFAULT 'active'
);