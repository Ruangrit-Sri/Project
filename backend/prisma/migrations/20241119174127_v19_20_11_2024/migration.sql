/*
  Warnings:

  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Name_name` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `Role_id` on the `Role` table. All the data in the column will be lost.
  - Added the required column `name` to the `Role` table without a default value. This is not possible if the table is not empty.
  - The required column `role_id` was added to the `Role` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "Name_name",
DROP COLUMN "Role_id",
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "role_id" UUID NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id");
