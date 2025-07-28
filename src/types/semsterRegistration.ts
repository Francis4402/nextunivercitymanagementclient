

export interface ISemesterRegistration {
  _id?: string;
  academicSemester: string;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
}