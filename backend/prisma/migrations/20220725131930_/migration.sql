/*
  Warnings:

  - The `cooktime` column on the `Meal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `prepTime` column on the `Meal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `readyIn` column on the `Meal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "cooktime",
ADD COLUMN     "cooktime" INTEGER,
DROP COLUMN "prepTime",
ADD COLUMN     "prepTime" INTEGER,
DROP COLUMN "readyIn",
ADD COLUMN     "readyIn" INTEGER;
