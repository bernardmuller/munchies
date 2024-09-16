-- name: GetAllRoles :many
SELECT * FROM "roles";

-- name: GetRoleById :one
SELECT * FROM "roles"
WHERE id = $1;

-- name: GetAllPermissions :many
SELECT * FROM "permissions";

-- name: GetPermissionById :one
SELECT * FROM "permissions"
WHERE id = $1;

-- name: AssignPermissionToRole :one
INSERT INTO "role_permissions"
(role_id, permission_id, createdat, updatedat)
VALUES ($1, $2, $3, $4) 
RETURNING *;

-- name: GetRoleWithPermissions :many
SELECT 
	r.id AS role_id,
	p.id AS permission_id,
	r.name,
	p.name as permission,
	p.description as description
FROM 
	"role_permissions" rp
LEFT JOIN "roles" r ON 
	rp.role_id = r.id
LEFT JOIN "permissions" p ON 
	rp.permission_id = p.id
WHERE role_id = $1;

-- name: CreatePermission :one
INSERT INTO "permissions"
(name, description, createdat, updatedat)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: CreateRole :one
INSERT INTO "roles"
(name, description, createdat, updatedat)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: DeleteRole :exec
DELETE FROM "roles"
WHERE id = $1;

-- name: DeletePermission :exec
DELETE FROM "permissions"
WHERE id = $1;

-- name: DeleteRolePermission :exec
DELETE FROM "role_permissions"
WHERE role_id = $1 AND permission_id = $2;

--name: GetRoleByUserId :many
SELECT 
	r.*,
	u.id as user_id
FROM "roles" r
LEFT JOIN "users" u ON 
	u.role_id = r.id
WHERE u.id = $1;

-- name: GetRoleByPermissionId :many
SELECT 
	r.*,
	p.id as permission_id
FROM "roles" r
LEFT JOIN "permissions" p ON 
	p.id = r.id
WHERE p.id = $1;

-- name: GetRolesByUserId :many
SELECT 
	r.*,
	u.id as user_id
FROM "roles" r
LEFT JOIN "users" u ON 
	u.role_id = r.id
WHERE u.id = $1;
