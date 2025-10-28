import { BloodGroup, Gender, MaritalStatus } from "../../../generated/prisma";

export type IPatientFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
};

type IPatientHealthData = {
  gender: Gender
  dateOfBirth: string
  bloodGroup: BloodGroup
  hasAllergies?: boolean
  hasDiabetes?: boolean
  height: string
  weight: string
  smokingStatus?: boolean
  dietaryPreferences?: string
  pregnancyStatus?: boolean
  mentalHealthHistory?: string
  immunizationStatus?: string
  hasPastSurgeries?: boolean
  recentAnxiety?: boolean
  recentDepression?: boolean
  maritalStatus?: MaritalStatus
}

type IMedicalReport = {
  reportName: string
  reportLink: string
}

export type IPatientUpdate = {
  name: string
  contactNumber: string
  address: string;
  patientHealthData: IPatientHealthData,
  medicalReport: IMedicalReport
}