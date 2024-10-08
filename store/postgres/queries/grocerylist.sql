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
  gl.id,
  gl.household_id,
  gl.menu_id,
  COALESCE(
      JSON_AGG(
      JSON_BUILD_OBJECT(
              'item_id', i.id,
              'check', i.check,
              'name', ing.name,
              'ingredient_id', ing.id,
              'category_id', ing.category_id
      ) ORDER BY ing.name ASC
              ) FILTER (WHERE i.id IS NOT NULL),
      '[]'::json
  )::json AS items
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
  gl.createdby,
  COALESCE(
    JSON_AGG(
        JSON_BUILD_OBJECT(
          'item_id', i.id,
          'check', i.check,
          'name', ing.name,
          'category_id', ing.category_id
      ) ORDER BY ing.name ASC
    ) FILTER (WHERE i.id IS NOT NULL),
    '[]'::json
  )::json AS items
FROM
  grocerylists gl
LEFT JOIN
  items i ON i.grocerylist_id = gl.id
LEFT JOIN
  ingredients ing ON ing.id = i.ingredient_id
WHERE
  gl.createdby = $1
AND
    gl.archived = false
AND
    gl.household_id IS NULL
GROUP BY
  gl.id
ORDER BY
  gl.createdat DESC
LIMIT 1;

-- name: GetGrocerylistWithItemsByHouseholdId :one
SELECT
  gl.id AS grocerylist_id,
  gl.household_id,
  gl.menu_id,
  gl.createdby,
  COALESCE(
      JSON_AGG(
          JSON_BUILD_OBJECT(
              'item_id', i.id,
              'check', i.check,
              'name', ing.name,
              'category_id', ing.category_id
          ) ORDER BY ing.name ASC
      ) FILTER (WHERE i.id IS NOT NULL),
      '[]'::json
  )::json AS items
FROM
  grocerylists gl
LEFT JOIN
  items i ON i.grocerylist_id = gl.id
LEFT JOIN
  ingredients ing ON ing.id = i.ingredient_id
WHERE
  gl.household_id = $1
GROUP BY
  gl.id
ORDER BY
  gl.createdat DESC
LIMIT 1;

-- name: GetGrocerylistById :one
SELECT * FROM grocerylists WHERE id = $1;