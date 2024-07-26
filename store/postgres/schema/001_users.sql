-- +goose Up
CREATE TABLE users
(
    id         UUID PRIMARY KEY,
    email      TEXT UNIQUE NOT NULL,
    firstname  TEXT,
    lastname   TEXT,
    dateofbirth DATE,
    role       TEXT,
    bio        TEXT,
    image      TEXT,
    status     TEXT,
    createdat  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    householdid UUID
);

-- +goose Down
DROP TABLE users;