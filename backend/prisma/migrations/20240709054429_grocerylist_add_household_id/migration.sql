-- AlterTable
ALTER TABLE "Grocerylist" ADD COLUMN     "householdId" UUID;

-- AddForeignKey
ALTER TABLE "Grocerylist" ADD CONSTRAINT "Grocerylist_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE SET NULL ON UPDATE CASCADE;
