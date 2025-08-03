/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourseForm } from "./coursesType";
import { TEnrolledCourse } from "./EnrolledCousetypes";


export interface IOfferedCourse {
    _id?: string;
    semesterRegistration: string;
    academicFaculty: string;
    academicDepartment: string;
    course: string;
    faculty: string;
    section: number;
    maxCapacity: number;
    days: string[];
    startTime: string;
    endTime: string;
}


export interface IOfferedCourseInfo {
    _id: string
  semesterRegistration: string
  academicSemester: string
  academicFaculty: string
  academicDepartment: string
  course: ICourseForm
  faculty: string
  maxCapacity: number
  section: number
  days: string[]
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
  __v: number
  enrolledCourses: TEnrolledCourse[]
  completedCourses: any[]
  completedCourseIds: any[]
  isPreRequisitesFulFilled: boolean
  isAlreadyEnrolled: boolean
}