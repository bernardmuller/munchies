-- +goose Up
ALTER TABLE users 
ALTER COLUMN clerk_id TYPE TEXT;

-- +goose Down
ALTER TABLE users 
ALTER COLUMN clerk_id TYPE UUID;
