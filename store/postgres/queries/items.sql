-- name: GetItems :many
SELECT * FROM items;

-- name: GetItemById :one
SELECT * FROM items WHERE id = $1;

-- name: CreateItem :one
INSERT INTO items (id, "check", typeid, description, createdat, createdby, grocerylist_id, ingredient_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;

-- name: CheckItem :one
UPDATE items
SET "check" = true
WHERE id = $1
RETURNING *;

-- name: UnCheckItem :one
UPDATE items
SET "check" = false
WHERE id = $1
RETURNING *;

-- name: DeleteItem :exec
DELETE FROM items
WHERE id = $1
RETURNING *;