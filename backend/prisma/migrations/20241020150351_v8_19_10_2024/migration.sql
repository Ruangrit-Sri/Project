-- CreateTable
CREATE TABLE "role" (
    "role_id" UUID NOT NULL,
    "role_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "permission" (
    "permission_id" UUID NOT NULL,
    "permission_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "rolePermission" (
    "role_permission_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,

    CONSTRAINT "rolePermission_pkey" PRIMARY KEY ("role_permission_id")
);

-- CreateTable
CREATE TABLE "task" (
    "task_id" UUID NOT NULL,
    "task_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "budget" DECIMAL(15,2) NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "plan" (
    "plan_id" UUID NOT NULL,
    "description" TEXT,
    "progress_task" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "resource" (
    "resource_id" UUID NOT NULL,
    "cost" DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    "total" DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    "resource_name" VARCHAR(255) NOT NULL,
    "resource_type" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("resource_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_role_name_key" ON "role"("role_name");
