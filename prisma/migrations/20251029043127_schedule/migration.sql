-- CreateTable
CREATE TABLE "public"."schedules" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."doctor_schedule" (
    "doctorId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL,
    "appointmentId" TEXT,

    CONSTRAINT "doctor_schedule_pkey" PRIMARY KEY ("doctorId","scheduleId")
);

-- AddForeignKey
ALTER TABLE "public"."doctor_schedule" ADD CONSTRAINT "doctor_schedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."doctor_schedule" ADD CONSTRAINT "doctor_schedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
