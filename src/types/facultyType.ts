import { TUserName } from "./user";


export interface IFacultyForm {
    _id?: string;
    designation: string;
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    email: string;
    dateOfBirth: string;
    profileImg?: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    academicDepartment: string;
}

export interface IFacultyPayload {
    _id?: string;
    password?: string;
    faculty: IFacultyForm;
}

export interface IFaculty extends IFacultyForm {
    password?: string;
    id: string;
    user: string;
    isDeleted?: boolean;
}