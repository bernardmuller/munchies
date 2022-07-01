/*
  Warnings:

  - You are about to drop the column `menu_mealsId` on the `Meal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[menuId]` on the table `Menu_Meals` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_menu_mealsId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "menu_mealsId";

-- CreateIndex
CREATE UNIQUE INDEX "Menu_Meals_menuId_key" ON "Menu_Meals"("menuId");
