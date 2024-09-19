-- +goose Up
ALTER TABLE "households" ADD COLUMN "active" BOOLEAN DEFAULT true;

-- +goose Down
ALTER TABLE "households" DROP COLUMN "active";
