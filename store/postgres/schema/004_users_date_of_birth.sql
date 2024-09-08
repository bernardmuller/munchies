-- +goose Up
ALTER TABLE "users"
ADD COLUMN "date_of_birth" TIMESTAMP(3);

-- +goose Down
ALTER TABLE "users" 
DROP COLUMN "date_of_birth";
