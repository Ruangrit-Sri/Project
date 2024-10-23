-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_project_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "project_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;
