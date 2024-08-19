-- CreateTable
CREATE TABLE "ProblemEvalCode" (
    "id" TEXT NOT NULL,
    "evalCode" TEXT NOT NULL,
    "problemsId" INTEGER NOT NULL,

    CONSTRAINT "ProblemEvalCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProblemEvalCode" ADD CONSTRAINT "ProblemEvalCode_problemsId_fkey" FOREIGN KEY ("problemsId") REFERENCES "Problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
