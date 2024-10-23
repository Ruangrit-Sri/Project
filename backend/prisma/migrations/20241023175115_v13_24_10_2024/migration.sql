/*
  Warnings:

  - Changed the type of `status` on the `project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL;
