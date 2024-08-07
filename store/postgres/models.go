// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0

package postgres

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID          uuid.UUID
	Email       string
	Firstname   sql.NullString
	Lastname    sql.NullString
	Dateofbirth sql.NullTime
	Role        sql.NullString
	Bio         sql.NullString
	Image       sql.NullString
	Status      sql.NullString
	Createdat   time.Time
	Updatedat   time.Time
	Householdid uuid.NullUUID
	ClerkID     uuid.NullUUID
}
