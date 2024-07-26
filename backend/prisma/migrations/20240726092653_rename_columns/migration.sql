/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `householdId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedat` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_householdId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "dateOfBirth",
DROP COLUMN "householdId",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateofbirth" TIMESTAMP(3),
ADD COLUMN     "householdid" UUID,
ADD COLUMN     "updatedat" TIMESTAMPTZ NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_householdid_fkey" FOREIGN KEY ("householdid") REFERENCES "households"("id") ON DELETE SET NULL ON UPDATE CASCADE;
