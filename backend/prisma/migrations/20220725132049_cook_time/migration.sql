/*
  Warnings:

  - You are about to drop the column `cooktime` on the `Meal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "cooktime",
ADD COLUMN     "cookTime" INTEGER;
