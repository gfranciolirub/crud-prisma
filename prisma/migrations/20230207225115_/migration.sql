/*
  Warnings:

  - You are about to drop the column `const` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `cost` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "const",
ADD COLUMN     "cost" INTEGER NOT NULL;
