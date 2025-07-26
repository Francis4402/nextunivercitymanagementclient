"use server"

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";


export const createStudent = async (data: FormData) => {

    try {
        const token = await getValidToken();
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/create-student`, {
            method: "POST",
            headers: {
                'Authorization': `${token}`,
            },

            body: data,
        });

        revalidateTag("students");

        return res.json();

    } catch (error) {
        console.log(error);
    }
}


export const getAllStudents = async () => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            next: {
                tags: ["students"]
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


export const getSingleStudent = async (id: string) => {
    try {
        const token = await getValidToken();

        const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            next: {
                tags: ["students"]
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

export const updateStudent = async (studentData: { name: string }, studentId: string) => {
    const token = await getValidToken();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/${studentId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(studentData),
      });
  
      revalidateTag("students");
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

export const deleteStudent = async (studentId: string) => {
    const token = await getValidToken();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/${studentId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
  
      revalidateTag("students");
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
};