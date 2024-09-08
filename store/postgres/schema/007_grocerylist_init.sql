-- +goose Up
CREATE TABLE If NOT EXISTS "grocerylists" (
    "id" UUID NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "grocerylists_pkey" PRIMARY KEY ("id")
);

-- +goose Down
DROP TABLE "grocerylists";
