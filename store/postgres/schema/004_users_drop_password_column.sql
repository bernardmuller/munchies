-- +goose Up
ALTER TABLE users 
DROP COLUMN password;

-- +goose Down
ALTER TABLE users 
ADD COLUMN password TYPE TEXT;
