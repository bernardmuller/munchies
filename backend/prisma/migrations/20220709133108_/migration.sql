/*
  Warnings:

  - You are about to drop the column `grocerylistId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "grocerylistId",
ADD COLUMN     "typeId" INTEGER NOT NULL;
