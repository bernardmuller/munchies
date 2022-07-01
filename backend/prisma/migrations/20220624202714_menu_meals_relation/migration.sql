/*
  Warnings:

  - You are about to drop the column `menu_MealsId` on the `Meal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_menu_MealsId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "menu_MealsId";

-- CreateTable
CREATE TABLE "_MealToMenu_Meals" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MealToMenu_Meals_AB_unique" ON "_MealToMenu_Meals"("A", "B");

-- CreateIndex
CREATE INDEX "_MealToMenu_Meals_B_index" ON "_MealToMenu_Meals"("B");

-- AddForeignKey
ALTER TABLE "_MealToMenu_Meals" ADD CONSTRAINT "_MealToMenu_Meals_A_fkey" FOREIGN KEY ("A") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToMenu_Meals" ADD CONSTRAINT "_MealToMenu_Meals_B_fkey" FOREIGN KEY ("B") REFERENCES "Menu_Meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
