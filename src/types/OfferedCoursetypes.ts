

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