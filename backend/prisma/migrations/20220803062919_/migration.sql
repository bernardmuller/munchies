-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "householdId" UUID;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE SET NULL ON UPDATE CASCADE;
