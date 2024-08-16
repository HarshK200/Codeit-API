/*
  Warnings:

  - Added the required column `testCasesResult` to the `Submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "testCasesResult" TEXT NOT NULL;
