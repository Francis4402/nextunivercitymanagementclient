"use server"

import { getValidToken } from "@/lib/verifyToken"
import { IAdepartment } from "@/types/adepartmenttype";
import { revalidateTag } from "next/cache";


export const createADepartment = async (departmentData: IAdepartment) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academic-departments/create-academic-department`, {
            method: "POST",
            headers: {
                'Authorization': `${token}`,
            },
            body: JSON.stringify(departmentData)
        });

        revalidateTag("academicDepartments");

        return res.json();

    } catch (error) {
        console.log(error);
    }
}


export const getAllDepartments = async () => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academic-departments`, {
            method: "GET",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            next: {
                tags: ["academicDepartments"]
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

export const getSingleDepartments = async (id: string) => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academic-departments/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            next: {
                tags: ["academicDepartments"]
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



export const updateDepartments = async (departmentData: { name: string }, departmentId: string) => {
    const token = await getValidToken();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academic-departments/${departmentId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(departmentData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      revalidateTag("academicDepartments");
  
      return await res.json();
    } catch (error) {
      console.log(error);
    }
};