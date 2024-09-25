-- +goose Up
ALTER TABLE "items" ALTER COLUMN createdby SET NOT NULL;

-- +goose Down
ALTER TABLE "items" ALTER COLUMN createdby DROP NOT NULL;