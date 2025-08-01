"use server"

import { getValidToken } from "@/lib/verifyToken";
import { ICourse, IPrerequisite } from "@/types/coursesType";
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
};

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
};

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
};


export const updateCourse = async (
    courseId: string,
    courseData: {
      preRequisiteCourses?: IPrerequisite[];
    }
  ) => {
    const token = await getValidToken();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(courseData),
      });
  
      revalidateTag("courses");
  
      return res.json();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update course");
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


export const assignFaculty = async (courseId: string, facultyId: string[]) => {
    const token = await getValidToken();
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}/assign-faculties`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ 
                faculties: facultyId
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || `HTTP ${res.status}: Failed to assign faculty`);
        }

        return {
            success: true,
            ...data
        };
    } catch (error) {
        console.error("assignFaculty error:", error);
    }
};



export const getCourseFacutly = async (courseId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}/get-faculties`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            next: {
                tags: ["courses"]
            }
        });

        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};