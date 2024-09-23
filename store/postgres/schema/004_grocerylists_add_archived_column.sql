-- +goose Up
ALTER TABLE "grocerylists" ADD COLUMN "archived" BOOLEAN DEFAULT false;

-- +goose Down
ALTER TABLE "grocerylists" DROP COLUMN "archived";
