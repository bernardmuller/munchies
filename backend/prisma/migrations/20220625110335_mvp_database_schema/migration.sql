/*
  Warnings:

  - Added the required column `name` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grocerylist" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "check" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "URL" TEXT,
ADD COLUMN     "cooktime" TEXT,
ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "cuiseine" TEXT,
ADD COLUMN     "directions" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT DEFAULT E'New Meal',
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "prepTime" TEXT,
ADD COLUMN     "rating" TEXT,
ADD COLUMN     "readyIn" TEXT,
ADD COLUMN     "seasons" TEXT;

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "status" TEXT;
