-- +goose Up
ALTER TABLE users
ADD COLUMN clerk_id UUID;

-- +goose Down
ALTER TABLE users 
DROP COLUMN clerk_id;