-- name: CreateIngredient :one
INSERT INTO ingredients(id, name, category_id)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetIngredientById :one
SELECT * FROM ingredients 
WHERE id = $1;

-- name: GetAllIngredients :many
SELECT 
	ingredients.id, 
	ingredients.name, 
	categories.name AS category_name,
	categories.id AS category_id 
FROM 
	ingredients
LEFT JOIN 
	categories 
ON categories.id = ingredients.category_id
WHERE 
	ingredients.deleted = false
ORDER BY 
	ingredients.createdat DESC;

-- name: UpdateIngredient :one
UPDATE ingredients
SET id = $1, name = $2, category_id = $3
WHERE id = $1
RETURNING *;

-- name: DeleteIngredient :one
UPDATE ingredients
SET deleted = true
WHERE id = $1
RETURNING *;
