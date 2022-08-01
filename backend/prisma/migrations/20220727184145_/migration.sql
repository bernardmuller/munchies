-- DropForeignKey
ALTER TABLE "Grocerylist" DROP CONSTRAINT "Grocerylist_menuId_fkey";

-- AlterTable
ALTER TABLE "Grocerylist" ALTER COLUMN "menuId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Grocerylist" ADD CONSTRAINT "Grocerylist_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
