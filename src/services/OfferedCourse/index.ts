"use server"

import { getValidToken } from "@/lib/verifyToken";
import { IOfferedCourse } from "@/types/OfferedCoursetypes";
import { revalidateTag } from "next/cache";


export const createOfferedCourse = async (data: IOfferedCourse) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/offered-courses/create-offered-course`, {
            method: "POST",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        
        revalidateTag("semesterRegistrations");

        return res.json();
    } catch (error) {
        console.log(error);
    }
}