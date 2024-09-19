-- name: CreateHousehold :one
INSERT INTO households(id, createdby, createdat, active)
VALUES ($1, $2, now(), true)
RETURNING *;

-- name: GetHouseholdById :one
SELECT * FROM households 
WHERE id = $1;

-- name: GetAllHouseholds :many
SELECT * FROM households;
