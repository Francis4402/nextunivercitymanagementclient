import { IAfaculty } from "./afacultytype";

export interface IAdepartment {
    _id?: string;
    name: string;
    academicFaculty?: IAfaculty | string;
}