-- AlterTable
ALTER TABLE "PlasticItem" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "PlasticItem" ADD CONSTRAINT "PlasticItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
