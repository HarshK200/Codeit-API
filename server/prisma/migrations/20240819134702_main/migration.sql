/*
  Warnings:

  - Changed the type of `problemEvalCode` on the `Problems` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Problems" DROP COLUMN "problemEvalCode",
ADD COLUMN     "problemEvalCode" JSONB NOT NULL;
