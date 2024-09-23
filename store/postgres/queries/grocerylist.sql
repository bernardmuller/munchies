-- name: GetGrocerylists :many
SELECT * FROM grocerylists;

-- name: GetLatestGrocerylist :one
SELECT * FROM grocerylists ORDER BY createdat DESC LIMIT 1;

-- name: CreateGrocerylist :one
INSERT INTO grocerylists (id, menu_id, household_id, createdat, createdby)
VALUES ($1, $2, $3, now(), $4)
RETURNING *;

-- name: GetGrocerylistWithItemsById :one
SELECT
  gl.id AS grocerylist_id,
  gl.household_id,
  gl.menu_id,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'item_id', i.id,
      'check', i.check,
      'name', ing.name 
    )
  ) AS items
FROM
  grocerylists gl
LEFT JOIN
  items i ON i.grocerylist_id = gl.id
LEFT JOIN
  ingredients ing ON ing.id = i.ingredient_id
WHERE
  gl.id = $1
GROUP BY
  gl.id;

-- name: GetGrocerylistWithItemsByUserId :one
SELECT
  gl.id AS grocerylist_id,
  gl.household_id,
  gl.menu_id,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'item_id', i.id,
      'check', i.check,
      'name', ing.name 
    )
  ) AS items
FROM
  grocerylists gl
LEFT JOIN
  items i ON i.grocerylist_id = gl.id
LEFT JOIN
  ingredients ing ON ing.id = i.ingredient_id
WHERE
  gl.createdby = $1
GROUP BY
  gl.id;

-- name: GetGrocerylistWithItemsByHouseholdId :one
SELECT
  gl.id AS grocerylist_id,
  gl.household_id,
  gl.menu_id,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'item_id', i.id,
      'check', i.check,
      'name', ing.name 
    )
  ) AS items
FROM
  grocerylists gl
LEFT JOIN
  items i ON i.grocerylist_id = gl.id
LEFT JOIN
  ingredients ing ON ing.id = i.ingredient_id
WHERE
  gl.household_id = $1
GROUP BY
  gl.id;
