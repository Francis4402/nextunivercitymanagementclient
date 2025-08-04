
"use server"

import { getValidToken } from "@/lib/verifyToken";
import { IAfaculty } from "@/types/afacultytype";
import { revalidateTag } from "next/cache";


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


export const getSingleFaculties = async (id: string) => {
  try {
      const token = await getValidToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academic-faculties/${id}`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
          },
          next: {
              tags: ["academicFaculties"]
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


export const updateFaculties = async (facultyData: { name: string }, facultyId: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academic-faculties/${facultyId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(facultyData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    revalidateTag("academicFaculties");
    return await res.json();
  } catch (error) {
    console.error("Update faculty error:", error);
    throw error;
  }
};
  