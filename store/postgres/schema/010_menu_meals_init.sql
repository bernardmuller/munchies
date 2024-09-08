-- +goose Up
CREATE TABLE IF NOT EXISTS "menu_meals" (
    "id" UUID NOT NULL,
    "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ NOT NULL,
    "menu_id" UUID NOT NULL,
    "meal_id" UUID NOT NULL,

    CONSTRAINT "menu_meals_pkey" PRIMARY KEY ("id")
);

-- +goose Down
DROP TABLE "menu_meals";
