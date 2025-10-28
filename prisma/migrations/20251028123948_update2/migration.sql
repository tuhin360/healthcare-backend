/*
  Warnings:

  - Added the required column `dateOfBirth` to the `patient_health_datas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."patient_health_datas" ADD COLUMN     "dateOfBirth" TEXT NOT NULL;
