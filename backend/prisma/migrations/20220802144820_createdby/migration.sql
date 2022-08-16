/*
  Warnings:

  - Added the required column `createdBy` to the `Household` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Household" ADD COLUMN     "createdBy" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "createdBy" UUID NOT NULL;
