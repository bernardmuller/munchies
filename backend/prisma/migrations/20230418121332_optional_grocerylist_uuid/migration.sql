/*
  Warnings:

  - You are about to drop the column `grocerylistId` on the `Meal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "grocerylistId";

-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "grocerylistId" DROP NOT NULL;
