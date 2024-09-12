-- +goose Up
ALTER TABLE "ingredients"
ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT false;

-- +goose Down
ALTER TABLE "ingredients"
DROP COLUMN "deleted";
