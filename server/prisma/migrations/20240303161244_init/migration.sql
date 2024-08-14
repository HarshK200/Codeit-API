-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "submissionStatus" AS ENUM ('CORRECT', 'INCORRECT');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "Role" "Role" NOT NULL DEFAULT 'USER',
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problems" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "examples" JSONB NOT NULL,
    "testCases" JSONB NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "AcceptanceRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "SubmissionStat" "submissionStatus" NOT NULL,
    "usersId" TEXT NOT NULL,
    "problemsId" INTEGER NOT NULL,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Problems_id_key" ON "Problems"("id");

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_problemsId_fkey" FOREIGN KEY ("problemsId") REFERENCES "Problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
