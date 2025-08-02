

export interface IAfaculty {
    _id?: string;
    name: string;
    createdAt?: string;
}


export interface IAfacultyPayload {
    _id?: string;
    name: string;
    academicFaculty: IAfaculty[] | IAfaculty;
}