/*
  Warnings:

  - A unique constraint covering the columns `[menuId]` on the table `Grocerylist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `menuId` to the `Grocerylist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grocerylist" ADD COLUMN     "menuId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Grocerylist_menuId_key" ON "Grocerylist"("menuId");

-- AddForeignKey
ALTER TABLE "Grocerylist" ADD CONSTRAINT "Grocerylist_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
