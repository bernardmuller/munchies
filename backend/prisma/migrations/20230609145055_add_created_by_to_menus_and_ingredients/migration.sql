-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "createdBy" UUID;

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "createdBy" UUID;
