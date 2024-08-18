/*
  Warnings:

  - Added the required column `stderr` to the `Submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stdout` to the `Submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "stderr" TEXT NOT NULL,
ADD COLUMN     "stdout" TEXT NOT NULL;
