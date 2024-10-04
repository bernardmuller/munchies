-- name: GetUserByEmail :one
SELECT * FROM users 
WHERE email = $1;

-- name: CreateUser :one
INSERT INTO users(id, clerk_id, email, firstname, lastname, role_id, image, status, updatedat)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now())
RETURNING *;

-- name: GetUserById :one
SELECT
    u.id,
    u.clerk_id,
    u.firstname,
    u.lastname,
    u.email,
    u.role_id,
    u.image,
    u.status,
    u.createdat,
    u.updatedat,
    u.household_id,
    COUNT(DISTINCT i.id) AS number_of_items,
    COUNT(DISTINCT gl.id) AS number_of_lists
FROM users u
LEFT JOIN items i ON u.id = i.createdby
LEFT JOIN grocerylists gl ON u.id = gl.createdby
WHERE u.id = $1
GROUP BY u.id
ORDER BY u.createdat;

-- name: GetAllUsers :many
SELECT * FROM users;

-- name: UpdateUser :one
UPDATE users
SET id = $1, clerk_id = $2, email = $3, firstname = $4, lastname = $5, role_id = $6, image = $7, status = $8, updatedat = now()
WHERE id = $1
RETURNING *;

-- name: GetUserByClerkId :one
SELECT * FROM users
WHERE clerk_id = $1;

-- name: UpdateUserHouseholdId :one
UPDATE users
SET household_id = $2
WHERE id = $1
RETURNING *;
