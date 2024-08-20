/*
  Warnings:

  - Changed the type of `StarterCode` on the `Problems` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Problems" DROP COLUMN "StarterCode",
ADD COLUMN     "StarterCode" JSONB NOT NULL;
