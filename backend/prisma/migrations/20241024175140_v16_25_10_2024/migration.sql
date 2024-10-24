/*
  Warnings:

  - A unique constraint covering the columns `[resource_name]` on the table `resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[task_name]` on the table `task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "resource_resource_name_key" ON "resource"("resource_name");

-- CreateIndex
CREATE UNIQUE INDEX "task_task_name_key" ON "task"("task_name");
