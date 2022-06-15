/*
  Warnings:

  - You are about to drop the column `ModifiedDate` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "ModifiedDate",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3);
