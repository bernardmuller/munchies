-- name: GetItems :many
SELECT * FROM items,

-- name: GetItemById :one
SELECT * FROM items WHERE id = $1;

-- name: CreateItem :one
INSERT INTO items (id, check, typeid, description, createdat, createdby, grocerylist_id)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
