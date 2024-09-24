-- +goose Up
ALTER TABLE "grocerylists" ALTER COLUMN createdby SET NOT NULL;

-- +goose Down
ALTER TABLE "grocerylists" ALTER COLUMN createdby DROP NOT NULL;