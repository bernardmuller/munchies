-- name: GetUserByEmail :one
SELECT * FROM User
WHERE email = $1;

-- name: CreateUser :one
INSERT INTO User (id, firstname, lastname, email, clerk_id, dateOfBirth, role, bio, image, status, householdId)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *;

-- name: GetUserById :one
SELECT * FROM User
WHERE id = $1;

-- name: GetAllUsers :many
SELECT * FROM User;

-- name: UpdateUser :one
UPDATE User
SET firstname = $2,
    lastname = $3,
    email = $4,
    clerk_id = $5,
    dateOfBirth = $6,
    role = $7,
    bio = $8,
    image = $9,
    status = $10,
    householdId = $11
WHERE id = $1
RETURNING *;

-- name: GetUserByClerkId :one
SELECT * FROM User
WHERE clerk_id = $1;