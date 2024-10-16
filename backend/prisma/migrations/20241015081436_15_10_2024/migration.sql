/*
  Warnings:

  - You are about to alter the column `budget` on the `project` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(15,2)`.
  - You are about to alter the column `status` on the `project` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - A unique constraint covering the columns `[project_name]` on the table `project` will be added. If there are existing duplicate values, this will fail.
  - Made the column `status` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "project" ALTER COLUMN "budget" DROP NOT NULL,
ALTER COLUMN "budget" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "start_date" DROP DEFAULT,
ALTER COLUMN "start_date" SET DATA TYPE DATE,
ALTER COLUMN "end_date" SET DATA TYPE DATE,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "updated_at" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "project_project_name_key" ON "project"("project_name");
