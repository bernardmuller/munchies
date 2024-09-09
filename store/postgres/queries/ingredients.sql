-- name: CreateIngredient :one
INSERT INTO ingredients(id, name, category_id)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetIngredientById :one
SELECT * FROM ingredients 
WHERE id = $1;

-- name: GetAllIngredients :many
SELECT * FROM ingredients;

-- name: UpdateIngredient :one
UPDATE ingredients
SET id = $1, name = $2, category_id = $3
WHERE id = $1
RETURNING *;
