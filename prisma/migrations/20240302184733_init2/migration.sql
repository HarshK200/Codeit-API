/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Problems` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Problems_id_key" ON "Problems"("id");
