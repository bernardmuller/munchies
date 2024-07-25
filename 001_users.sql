-- +goose Up
CREATE TABLE User
(
    id         UUID PRIMARY KEY,
    email      TEXT UNIQUE NOT NULL,
    firstName  TEXT,
    lastName   TEXT,
    dateOfBirth DATE,
    role       TEXT,
    bio        TEXT,
    image      TEXT,
    status     TEXT,
    createdAt  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    householdId UUID
);

-- +goose Down
DROP TABLE User;