-- +goose Up
CREATE TABLE IF NOT EXISTS "ingredients"
(
    id         UUID PRIMARY KEY,
    name       TEXT,
    category_id   TEXT,
    createdat  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- +goose Down
DROP TABLE ingredients;
