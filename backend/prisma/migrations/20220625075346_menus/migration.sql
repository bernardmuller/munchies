/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Grocerylist` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Grocerylist` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the `Menu_Meals` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ingredientId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ingredientId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_mealId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_grocerylistId_fkey";

-- DropForeignKey
ALTER TABLE "Menu_Meals" DROP CONSTRAINT "Menu_Meals_mealId_fkey";

-- DropForeignKey
ALTER TABLE "Menu_Meals" DROP CONSTRAINT "Menu_Meals_menuId_fkey";

-- AlterTable
ALTER TABLE "Grocerylist" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "mealId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "ingredientId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "Menu_Meals";

-- CreateTable
CREATE TABLE "MenuMeals" (
    "id" UUID NOT NULL,
    "menuId" UUID NOT NULL,
    "mealId" UUID NOT NULL,

    CONSTRAINT "MenuMeals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealIngredient" (
    "id" UUID NOT NULL,
    "mealId" UUID NOT NULL,
    "ingredientId" UUID NOT NULL,

    CONSTRAINT "MealIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrocerylistItem" (
    "id" UUID NOT NULL,
    "grocerylistId" UUID NOT NULL,
    "itemId" UUID NOT NULL,

    CONSTRAINT "GrocerylistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuMeals_menuId_key" ON "MenuMeals"("menuId");

-- CreateIndex
CREATE UNIQUE INDEX "MenuMeals_mealId_key" ON "MenuMeals"("mealId");

-- CreateIndex
CREATE UNIQUE INDEX "MealIngredient_mealId_key" ON "MealIngredient"("mealId");

-- CreateIndex
CREATE UNIQUE INDEX "MealIngredient_ingredientId_key" ON "MealIngredient"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "GrocerylistItem_grocerylistId_key" ON "GrocerylistItem"("grocerylistId");

-- CreateIndex
CREATE UNIQUE INDEX "GrocerylistItem_itemId_key" ON "GrocerylistItem"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_ingredientId_key" ON "Item"("ingredientId");

-- AddForeignKey
ALTER TABLE "MenuMeals" ADD CONSTRAINT "MenuMeals_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuMeals" ADD CONSTRAINT "MenuMeals_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealIngredient" ADD CONSTRAINT "MealIngredient_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealIngredient" ADD CONSTRAINT "MealIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrocerylistItem" ADD CONSTRAINT "GrocerylistItem_grocerylistId_fkey" FOREIGN KEY ("grocerylistId") REFERENCES "Grocerylist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrocerylistItem" ADD CONSTRAINT "GrocerylistItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
