
export interface TUserName {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export interface IGuardian {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export interface ILocalGuardian {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}


export interface IStudentForm {
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    profileImg?: string;
    emergencyContactNo: string;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: IGuardian;
    localGuardian: ILocalGuardian;
    admissionSemester: string;
    academicDepartment: string;
}


export interface ICreateStudentPayload {
    password?: string;
    student: IStudentForm;
}


export interface IStudent extends IStudentForm {
    password?: string;
    id: string;
    user: string;
    isDeleted?: boolean;
}