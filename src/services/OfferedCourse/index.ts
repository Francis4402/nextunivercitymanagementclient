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

export const getOfferedCourses = async () => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/offered-courses`, {
            method: "GET",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            
            next: {
                tags: ["semesterRegistrations"]
            }
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

export const getSingleOfferedCourse = async (id: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/offered-courses/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            
            next: {
                tags: ["semesterRegistrations"]
            }
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


export const getMyOfferedCourses = async () => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/offered-courses/my-offered-courses`, {
            method: "GET",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            next: {
                tags: ["semesterRegistrations"]
            }
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


export const updateOfferedCourse = async (data: IOfferedCourse) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/offered-courses/${data._id}`, {
            method: "PATCH",
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