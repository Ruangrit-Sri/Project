/*
  Warnings:

  - You are about to drop the column `role_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "resource_resource_name_key";

-- DropIndex
DROP INDEX "task_task_name_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role_id",
ADD COLUMN     "role" VARCHAR(255) NOT NULL;
