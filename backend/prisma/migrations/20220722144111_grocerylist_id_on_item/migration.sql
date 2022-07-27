/*
  Warnings:

  - You are about to drop the `GrocerylistItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[groceryListId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groceryListId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GrocerylistItem" DROP CONSTRAINT "GrocerylistItem_grocerylistId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "groceryListId" UUID NOT NULL;

-- DropTable
DROP TABLE "GrocerylistItem";

-- CreateIndex
CREATE UNIQUE INDEX "Item_groceryListId_key" ON "Item"("groceryListId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_groceryListId_fkey" FOREIGN KEY ("groceryListId") REFERENCES "Grocerylist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
