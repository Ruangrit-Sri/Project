-- AlterTable
ALTER TABLE "project" ADD COLUMN     "project_image" VARCHAR(255),
ALTER COLUMN "created_by" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_by" DROP NOT NULL;
