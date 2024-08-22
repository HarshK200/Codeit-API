/*
  Warnings:

  - You are about to drop the column `SubmissionStat` on the `Submissions` table. All the data in the column will be lost.
  - Changed the type of `ExecutionStat` on the `Submissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Submissions" DROP COLUMN "SubmissionStat",
DROP COLUMN "ExecutionStat",
ADD COLUMN     "ExecutionStat" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ExecutionStat";

-- DropEnum
DROP TYPE "submissionStatus";
