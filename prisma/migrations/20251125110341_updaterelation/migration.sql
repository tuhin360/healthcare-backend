/*
  Warnings:

  - A unique constraint covering the columns `[appointmentId]` on the table `doctor_schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "doctor_schedule_appointmentId_key" ON "public"."doctor_schedule"("appointmentId");

-- AddForeignKey
ALTER TABLE "public"."doctor_schedule" ADD CONSTRAINT "doctor_schedule_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "public"."appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
