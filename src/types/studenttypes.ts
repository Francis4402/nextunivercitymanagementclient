
export interface TUserName {
    firstName: string;
    middleName: string;
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

export interface IStudent {
    id: string;
    user: string;
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: IGuardian;
    localGuardian: ILocalGuardian;
    admissionSemester: string;
    academicDepartment: string;
}