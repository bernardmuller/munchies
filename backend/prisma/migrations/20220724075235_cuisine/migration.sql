/*
  Warnings:

  - You are about to drop the column `cuiseine` on the `Meal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "cuiseine",
ADD COLUMN     "cuisine" TEXT;
