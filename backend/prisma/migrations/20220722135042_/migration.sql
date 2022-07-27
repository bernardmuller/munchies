/*
  Warnings:

  - You are about to drop the column `itemId` on the `GrocerylistItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GrocerylistItem" DROP CONSTRAINT "GrocerylistItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_ingredientId_fkey";

-- DropIndex
DROP INDEX "GrocerylistItem_itemId_key";

-- AlterTable
ALTER TABLE "GrocerylistItem" DROP COLUMN "itemId";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
