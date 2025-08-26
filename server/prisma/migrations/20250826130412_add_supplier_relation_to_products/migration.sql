-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "supplierId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
