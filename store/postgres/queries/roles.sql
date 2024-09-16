-- name: GetAllRoles :many
SELECT * FROM "roles";

-- name: GetRoleById :one
SELECT * FROM "roles"
WHERE id = $1;

