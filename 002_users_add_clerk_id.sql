-- +goose Up
ALTER TABLE User
ADD COLUMN clerk_id UUID;

-- +goose Down
ALTER TABLE Users 
DROP COLUMN clerk_id;