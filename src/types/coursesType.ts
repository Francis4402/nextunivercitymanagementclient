
export interface IPrerequisite {
    course: string;
    isDeleted: boolean;
}

export interface ICourseForm {
    _id?: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses?: IPrerequisite[];
    isDeleted: boolean;
}

export interface ICourse extends Omit<ICourseForm, 'preRequisiteCourses'> {
    preRequisiteCourses?: string[]; 
}