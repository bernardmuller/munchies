-- name: CreateHousehold :one
INSERT INTO households(id, createdby, createdat, active)
VALUES ($1, $2, now(), true)
RETURNING *;

-- name: GetHouseholdById :one
SELECT * FROM households 
WHERE id = $1;

-- name: GetAllHouseholds :many
SELECT * FROM households;

-- name: GetHouseholdDetailsByUserId :one
WITH user_household As (
	SELECT household_id
	FROM users 
	WHERE users.id = $1
),
household_row AS (
    SELECT *
    FROM households
    WHERE id = (SELECT household_id FROM user_household)
),
users AS (
    SELECT id, firstname, lastname, household_id
    FROM users
    WHERE household_id = (SELECT id FROM household_row)
),
latest_grocerylist AS (
    SELECT *
    FROM grocerylists
    WHERE household_id = (SELECT id FROM household_row)
    ORDER BY createdat DESC
    LIMIT 1
)
SELECT
    h.id as "id",
    h.createdby as "createdby",
    h.createdat as "createdat",
    h.active as "active",
    json_agg(u) AS "members",
    json_build_object(
        'id', gl.id,
        'createdat', gl."createdat",
        'items', (
            SELECT json_agg(
                json_build_object(
                    'id', i.id,
                    'type', i.typeid,
                    'check', i.check,
                    'ingredient', ing.*,
                    'createdby', u.firstname
                )
            )
            FROM items i
            LEFT JOIN ingredients ing ON i.ingredient_id = ing.id
            LEFT JOIN users u ON i.createdby = u.id
            WHERE i.grocerylist_id = gl.id
        )
    ) AS grocerylist
FROM household_row h
LEFT JOIN users u ON h.id = u.household_id
LEFT JOIN latest_grocerylist gl ON h.id = gl.household_id
GROUP BY h.id, gl.id, h.createdby, h.createdat, h.active, gl.createdat;

-- name: AddUserToHousehold :one
UPDATE users 
SET household_id = $1
WHERE id = $2
RETURNING *;

-- name: RemoveUserFromHousehold :one
UPDATE users 
SET household_id = NULL
WHERE id = $1
RETURNING *;

-- name: ActivateHousehold :one
UPDATE households 
SET active = true
WHERE id = $1
RETURNING *;

-- name: DeactivateHousehold :one
UPDATE households 
SET active = false
WHERE id = $1
RETURNING *;

-- name: GetHouseholdByUserId :one
SELECT *
FROM households
WHERE createdby = $1;
