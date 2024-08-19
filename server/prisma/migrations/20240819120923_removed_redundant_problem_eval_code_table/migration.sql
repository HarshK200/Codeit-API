/*
  Warnings:

  - You are about to drop the column `problemEvalCodeId` on the `Problems` table. All the data in the column will be lost.
  - You are about to drop the `ProblemEvalCode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `problemEvalCode` to the `Problems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Problems" DROP CONSTRAINT "Problems_problemEvalCodeId_fkey";

-- AlterTable
ALTER TABLE "Problems" DROP COLUMN "problemEvalCodeId",
ADD COLUMN     "problemEvalCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProblemEvalCode";
