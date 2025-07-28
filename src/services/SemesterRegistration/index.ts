"use server"

import { getValidToken } from "@/lib/verifyToken";
import { ISemesterRegistration } from "@/types/semsterRegistration";
import { revalidateTag } from "next/cache";


export const createSemesterRegistration = async (data: ISemesterRegistration) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/semester-registrations/create-semester-registration`, {
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

export const getAllSemesterRegistrations = async () => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/semester-registrations`, {
            method: "GET",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            next: {
                tags: ["semesterRegistrations"]
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

export const getSingleSemesterRegistration = async (id: string) => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/semester-registrations/${id}`, {
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

export const updateSemesterRegistration = async (id: string, data: { status?: string }) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/semester-registrations/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        });

        revalidateTag("semesterRegistrations");

        return res.json();
    } catch (error) {
        console.log(error);
        throw error; 
    }
}


export const deleteSemesterRegistration = async (id: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/semester-registrations/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        });

        revalidateTag("semesterRegistrations");

        return res.json();
    } catch (error) {
        console.log(error);
    }
}