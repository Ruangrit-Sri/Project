/*
  Warnings:

  - You are about to drop the column `role_id` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "role_id",
ADD COLUMN     "role" VARCHAR(255);
