export interface IUser {
    userId: string;
    role: 'superAdmin' | 'admin' | 'student' | 'faculty';
    iat: number;
    exp: number;
  }