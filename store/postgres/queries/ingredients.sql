-- name: CreateIngredient :one
INSERT INTO ingredients(id, name, categoryId)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetIngredientById :one
SELECT * FROM ingredients 
WHERE id = $1;

-- name: GetAllIngredients :many
SELECT * FROM ingredients;

-- name: UpdateIngredient :one
UPDATE ingredients
SET id = $1, name = $2, categoryId = $3
WHERE id = $1
RETURNING *;
