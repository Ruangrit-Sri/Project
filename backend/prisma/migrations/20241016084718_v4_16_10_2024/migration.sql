-- CreateTable
CREATE TABLE "user" (
    "user_id" UUID NOT NULL,
    "project_id" UUID,
    "role_id" UUID,
    "username" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);
