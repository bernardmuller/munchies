-- +goose Up
CREATE TABLE If NOT EXISTS "meals" (
    "id" UUID NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- +goose Down
DROP TABLE "meals";
