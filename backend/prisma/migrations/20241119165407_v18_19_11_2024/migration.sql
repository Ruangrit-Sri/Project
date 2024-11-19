/*
  Warnings:

  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "permission";

-- CreateTable
CREATE TABLE "Role" (
    "Role_id" UUID NOT NULL,
    "Name_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("Role_id")
);
