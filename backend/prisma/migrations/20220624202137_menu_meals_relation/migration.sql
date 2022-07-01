/*
  Warnings:

  - You are about to drop the column `menuId` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `menu_mealsId` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_menuId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "menuId",
ADD COLUMN     "menu_MealsId" UUID,
ADD COLUMN     "menu_mealsId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Menu_Meals" (
    "id" UUID NOT NULL,
    "menuId" UUID,

    CONSTRAINT "Menu_Meals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_menu_mealsId_fkey" FOREIGN KEY ("menu_mealsId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_menu_MealsId_fkey" FOREIGN KEY ("menu_MealsId") REFERENCES "Menu_Meals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Meals" ADD CONSTRAINT "Menu_Meals_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
