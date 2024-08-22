/*
  Warnings:

  - Added the required column `ExecutionStat` to the `Submissions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExecutionStat" AS ENUM ('Runtime_Error', 'Compile_Error');

-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "ExecutionStat" "ExecutionStat" NOT NULL;
