"use server"

import { getValidToken } from "@/lib/verifyToken"
import { revalidateTag } from "next/cache";



export const createFaculty = async (data: FormData) => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/create-faculty`, {
            method: "POST",
            headers: {
                'Authorization': `${token}`,
            },
            body: data,
        });

        revalidateTag("faculties");

        return res.json();
    } catch (error) {
        console.log(error);
    }
}