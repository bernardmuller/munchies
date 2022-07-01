/*
  Warnings:

  - You are about to drop the `_MealToMenu_Meals` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mealId]` on the table `Menu_Meals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mealId` to the `Menu_Meals` table without a default value. This is not possible if the table is not empty.
  - Made the column `menuId` on table `Menu_Meals` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Menu_Meals" DROP CONSTRAINT "Menu_Meals_menuId_fkey";

-- DropForeignKey
ALTER TABLE "_MealToMenu_Meals" DROP CONSTRAINT "_MealToMenu_Meals_A_fkey";

-- DropForeignKey
ALTER TABLE "_MealToMenu_Meals" DROP CONSTRAINT "_MealToMenu_Meals_B_fkey";

-- AlterTable
ALTER TABLE "Menu_Meals" ADD COLUMN     "mealId" UUID NOT NULL,
ALTER COLUMN "menuId" SET NOT NULL;

-- DropTable
DROP TABLE "_MealToMenu_Meals";

-- CreateIndex
CREATE UNIQUE INDEX "Menu_Meals_mealId_key" ON "Menu_Meals"("mealId");

-- AddForeignKey
ALTER TABLE "Menu_Meals" ADD CONSTRAINT "Menu_Meals_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Meals" ADD CONSTRAINT "Menu_Meals_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
