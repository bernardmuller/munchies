exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE "users" (
      "id" UUID PRIMARY KEY,
      "emailAddress" TEXT UNIQUE NOT NULL,
      "firstName" TEXT NOT NULL
    );
  `)
}

exports.down = async (knex) => {
  await knex.raw(`
    DROP TABLE "users";
`)
}
