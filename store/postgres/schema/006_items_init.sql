-- +goose Up
CREATE TABLE IF NOT EXISTS "items" (
    "id" UUID NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ NOT NULL,
    "grocerylist_id" UUID NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- +goose Down
DROP TABLE "items";
