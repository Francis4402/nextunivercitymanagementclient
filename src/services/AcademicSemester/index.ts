"use server"

import { getValidToken } from "@/lib/verifyToken";
import { IAcademicSemester } from "@/types/academicsemestertype";
import { IAfaculty } from "@/types/afacultytype";
import { revalidateTag } from "next/cache";



export const getAllSemesters = async () => {
    try {

        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academic-semesters`, {
            method: "GET",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            next: {
                tags: ["academicSemesters"]
            },
        });

        if (!res.ok) {
            if (res.status === 401) {
              throw new Error('Unauthorized - Invalid access token');
            }
            throw new Error(`Failed to fetch: ${res.statusText}`);
          }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const createAcademicSemester = async (academicData: IAcademicSemester) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academic-semesters/create-academic-semester`, {
            method: "POST",
            body: JSON.stringify(academicData),
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        });

        revalidateTag("academicSemesters");

        return res.json();
    } catch (error) {
        console.log(error);
    }
}


export const createAcademicFaculty = async (facultyData: IAfaculty) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academic-faculties/create-academic-faculty`, {
            method: "POST",
            body: JSON.stringify(facultyData),
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        });

        revalidateTag("academicFaculties");
        
        return res.json();

    } catch (error) {
        console.log(error);        
    }
}


export const getAllFaculties = async () => {
    try {

        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academic-faculties`, {
            method: "GET",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            next: {
                tags: ["academicFaculties"]
            },
        });

        if (!res.ok) {
            if (res.status === 401) {
              throw new Error('Unauthorized - Invalid access token');
            }
            throw new Error(`Failed to fetch: ${res.statusText}`);
          }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}