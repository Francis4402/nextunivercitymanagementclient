"use server"

import { getValidToken } from "@/lib/verifyToken";
import { IAcademicSemester } from "@/types/academicsemestertype";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const getAllSemesters = async () => {
    try {

        const token = (await cookies()).get("accessToken")?.value;

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