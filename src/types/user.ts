export interface IUser {
    userId: string;
    role: 'superAdmin' | 'admin' | 'student' | 'faculty';
    needsPasswordChange: boolean;
    iat: number;
    exp: number;
}

export interface TUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IAdmin {
  name: TUserName;
  designation: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  profileImg?: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
}

export interface IAdminPayload {
  _id?: string;
  password?: string;
  admin: IAdmin;
}

export interface IAd extends IAdmin {
  password?: string;
  id: string;
  user: string;
  isDeleted?: boolean;
}



export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}