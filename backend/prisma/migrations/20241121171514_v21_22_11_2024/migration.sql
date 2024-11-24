/*
  Warnings:

  - The `created_by` column on the `plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `resource` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `resource` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "plan" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "created_by" UUID,
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "resource" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_fkey" FOREIGN KEY ("role") REFERENCES "role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
