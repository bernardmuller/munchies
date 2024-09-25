-- +goose Up
ALTER TABLE "items" ALTER COLUMN ingredient_id SET NOT NULL;

-- +goose Down
ALTER TABLE "items" ALTER COLUMN ingredient_id DROP NOT NULL;