"use server"

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";


export const createEnrolledCourse = async (data: {offeredCourse: string}) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/enrolled-courses/create-enrolled-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    });

    revalidateTag("enroll");

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export const getEnrolledCourses = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/enrolled-courses/my-enrolled-courses`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      next: {
        tags: ["enroll"]
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