-- name: CreateMeal :one
INSERT INTO meals (name,  createdat, updatedat)
VALUES ($1, now(), now())
RETURNING *;

-- name: UpdateMeal :exec
UPDATE meals
SET name = $1, updatedat = now()
WHERE id = $2
RETURNING *;

-- name: DeleteMeal :exec
DELETE FROM meals
WHERE id = $1
RETURNING *;

-- name: GetMealById :one
SELECT * FROM meals
WHERE id = $1
LIMIT 1;

-- name: GetMeals :many
SELECT * FROM meals
ORDER BY createdat DESC;

-- name: GetMealsByUserId :many
SELECT * FROM meals
WHERE createdby = $1
ORDER BY createdat DESC;
