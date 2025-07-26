"use server"

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";


export const createAdmin = async (data: FormData) => {

    try {
        const token = await getValidToken();
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/create-admin`, {
            method: "POST",
            headers: {
                'Authorization': `${token}`,
            },

            body: data
        });

        revalidateTag("admin");

        return res.json();

    } catch (error) {
        console.log(error);
    }
}


export const getAllAdmins = async () => {
    try {

        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admins`, {
            method: "GET",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            next: {
                tags: ["admin"]
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


export const getSingleAdmin = async (id: string) => {
    try {
        const token = await getValidToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admins/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            next: {
                tags: ["admin"]
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



export const updateAdmins = async (adminData: { name: string }, adminId: string) => {
    const token = await getValidToken();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admins/${adminId}`, {
        method: "PATCH",
        headers: {
          'Authorization': `${token}`,
        },
        body: JSON.stringify(adminData),
      });
  
      revalidateTag("admin");
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
};


export const deleteAdmin = async (adminId: string) => {
    const token = await getValidToken();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admins/${adminId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `${token}`,
        },
      });
  
      revalidateTag("admin");
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
};