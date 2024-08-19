/*
  Warnings:

  - You are about to drop the column `problemsId` on the `ProblemEvalCode` table. All the data in the column will be lost.
  - Added the required column `problemEvalCodeId` to the `Problems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProblemEvalCode" DROP CONSTRAINT "ProblemEvalCode_problemsId_fkey";

-- AlterTable
ALTER TABLE "ProblemEvalCode" DROP COLUMN "problemsId";

-- AlterTable
ALTER TABLE "Problems" ADD COLUMN     "problemEvalCodeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Problems" ADD CONSTRAINT "Problems_problemEvalCodeId_fkey" FOREIGN KEY ("problemEvalCodeId") REFERENCES "ProblemEvalCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
