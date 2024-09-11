-- name: GetAllCategories :many
SELECT * FROM categories;

-- name: GetCategoryById :one
SELECT * FROM categories
WHERE id = $1;
