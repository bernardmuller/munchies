-- name: CreateMealIngredient :exec
INSERT INTO meal_ingredients (meal_id, ingredient_id)
VALUES ($1, $2)
RETURNING *;

-- name: DeleteMealIngredient :exec
DELETE FROM meal_ingredients
WHERE meal_id = $1 AND ingredient_id = $2;

-- name: GetMealIngredients :many
SELECT * FROM meal_ingredients
WHERE meal_id = $1;

-- name: GetMealIngredientsByIngredientId :many
SELECT * FROM meal_ingredients
WHERE ingredient_id = $1;

-- name: GetMealIngredientsByMealId :many
SELECT * FROM meal_ingredients
WHERE meal_id = $1;

-- -- name: GetMealIngredientsByUserId :many
-- SELECT * FROM meal_ingredients
-- WHERE meal_id IN (
-- 	SELECT meal_id FROM meals WHERE createdby = $1
-- );

-- name: GetMealIngredient :one
SELECT * FROM meal_ingredients
WHERE meal_id = $1 AND ingredient_id = $2;
