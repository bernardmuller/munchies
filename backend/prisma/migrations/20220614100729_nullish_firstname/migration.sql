/*
  Warnings:

  - You are about to drop the `knex_migrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `knex_migrations_lock` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "firstName" DROP NOT NULL;

-- DropTable
DROP TABLE "knex_migrations";

-- DropTable
DROP TABLE "knex_migrations_lock";
