-- +goose Up
ALTER TABLE "users" 
ADD COLUMN     "modified_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastname" TEXT;

-- +goose Down
ALTER TABLE "users" 
DROP COLUMN "modified_date",
DROP COLUMN "lastname";
