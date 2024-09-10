-- name: GetGrocerylists :many
SELECT * FROM grocerylists;

-- name: GetLatestGrocerylist :one
SELECT * FROM grocerylists ORDER BY createdat DESC LIMIT 1;

-- name: CreateGrocerylist :one
INSERT INTO grocerylists (id, menu_id, household_id) VALUES ($1, $2, $3) RETURNING *;

