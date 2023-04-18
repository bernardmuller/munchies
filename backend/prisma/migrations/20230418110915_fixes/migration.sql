/*
  Warnings:

  - A unique constraint covering the columns `[grocerylistId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `grocerylistId` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grocerylistId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MenuMeals_mealId_key";

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "grocerylistId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "grocerylistId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Menu_grocerylistId_key" ON "Menu"("grocerylistId");
