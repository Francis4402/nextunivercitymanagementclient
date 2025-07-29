"use server"

import { getValidToken } from "@/lib/verifyToken";
import { ICourse } from "@/types/coursesType";
import { revalidateTag } from "next/cache";



export const createCourse = async (data: ICourse) => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/create-course`, {
            method: "POST",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        revalidateTag("courses");

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export const getAllCourses = async () => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            next: {
                tags: ["courses"]
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

export const getSingleCourse = async (id: string) => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            next: {
                tags: ["courses"]
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


export const updateCourse = async (courseData: ICourse, courseId: string) => {
    const token = await getValidToken();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(courseData),
      });
  
      revalidateTag("courses");
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

export const deleteCourse = async (courseId: string) => {
    const token = await getValidToken();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
  
      revalidateTag("courses");
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
};