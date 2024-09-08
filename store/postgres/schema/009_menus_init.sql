
-- +goose Up
CREATE TABLE IF NOT EXISTS "menus" (
    "id" UUID NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- +goose Down
DROP TABLE "menus";
