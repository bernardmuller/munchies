// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: users.sql

package postgres

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users(id, firstname, lastname, email, clerk_id, dateOfBirth, role, bio, image, status, createdAt, updatedAt, householdId)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
RETURNING id, email, firstname, lastname, dateofbirth, role, bio, image, status, createdat, updatedat, householdid, clerk_id
`

type CreateUserParams struct {
	ID          uuid.UUID
	Firstname   sql.NullString
	Lastname    sql.NullString
	Email       string
	ClerkID     uuid.NullUUID
	Dateofbirth sql.NullTime
	Role        sql.NullString
	Bio         sql.NullString
	Image       sql.NullString
	Status      sql.NullString
	Createdat   time.Time
	Updatedat   time.Time
	Householdid uuid.NullUUID
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.ID,
		arg.Firstname,
		arg.Lastname,
		arg.Email,
		arg.ClerkID,
		arg.Dateofbirth,
		arg.Role,
		arg.Bio,
		arg.Image,
		arg.Status,
		arg.Createdat,
		arg.Updatedat,
		arg.Householdid,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.Dateofbirth,
		&i.Role,
		&i.Bio,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.Householdid,
		&i.ClerkID,
	)
	return i, err
}

const getAllUsers = `-- name: GetAllUsers :many
SELECT id, email, firstname, lastname, dateofbirth, role, bio, image, status, createdat, updatedat, householdid, clerk_id FROM users
`

func (q *Queries) GetAllUsers(ctx context.Context) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, getAllUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.Email,
			&i.Firstname,
			&i.Lastname,
			&i.Dateofbirth,
			&i.Role,
			&i.Bio,
			&i.Image,
			&i.Status,
			&i.Createdat,
			&i.Updatedat,
			&i.Householdid,
			&i.ClerkID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUserByClerkId = `-- name: GetUserByClerkId :one
SELECT id, email, firstname, lastname, dateofbirth, role, bio, image, status, createdat, updatedat, householdid, clerk_id FROM users
WHERE clerk_id = $1
`

func (q *Queries) GetUserByClerkId(ctx context.Context, clerkID uuid.NullUUID) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserByClerkId, clerkID)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.Dateofbirth,
		&i.Role,
		&i.Bio,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.Householdid,
		&i.ClerkID,
	)
	return i, err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT id, email, firstname, lastname, dateofbirth, role, bio, image, status, createdat, updatedat, householdid, clerk_id FROM users 
WHERE email = $1
`

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserByEmail, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.Dateofbirth,
		&i.Role,
		&i.Bio,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.Householdid,
		&i.ClerkID,
	)
	return i, err
}

const getUserById = `-- name: GetUserById :one
SELECT id, email, firstname, lastname, dateofbirth, role, bio, image, status, createdat, updatedat, householdid, clerk_id FROM users 
WHERE id = $1
`

func (q *Queries) GetUserById(ctx context.Context, id uuid.UUID) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserById, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.Dateofbirth,
		&i.Role,
		&i.Bio,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.Householdid,
		&i.ClerkID,
	)
	return i, err
}

const updateUser = `-- name: UpdateUser :one
UPDATE users
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
RETURNING id, email, firstname, lastname, dateofbirth, role, bio, image, status, createdat, updatedat, householdid, clerk_id
`

type UpdateUserParams struct {
	ID          uuid.UUID
	Firstname   sql.NullString
	Lastname    sql.NullString
	Email       string
	ClerkID     uuid.NullUUID
	Dateofbirth sql.NullTime
	Role        sql.NullString
	Bio         sql.NullString
	Image       sql.NullString
	Status      sql.NullString
	Householdid uuid.NullUUID
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUser,
		arg.ID,
		arg.Firstname,
		arg.Lastname,
		arg.Email,
		arg.ClerkID,
		arg.Dateofbirth,
		arg.Role,
		arg.Bio,
		arg.Image,
		arg.Status,
		arg.Householdid,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Firstname,
		&i.Lastname,
		&i.Dateofbirth,
		&i.Role,
		&i.Bio,
		&i.Image,
		&i.Status,
		&i.Createdat,
		&i.Updatedat,
		&i.Householdid,
		&i.ClerkID,
	)
	return i, err
}
