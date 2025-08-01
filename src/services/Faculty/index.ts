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


export const getAllFaculty = async () => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/faculties`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            next: {
                tags: ["faculties"]
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


export const getSingleFaculty = async (id: string) => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/faculties/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            next: {
                tags: ["faculties"]
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


export const updateFaculty = async (studentData: { name: string }, faclutyId: string) => {
    const token = await getValidToken();
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/faculties/${faclutyId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(studentData),
      });
  
      revalidateTag("faculties");
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

export const deleteFaculty = async (faclutyId: string) => {
    const token = await getValidToken();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/${faclutyId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
  
      revalidateTag("faculties");
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
};