"use server"

import { getValidToken } from "@/lib/verifyToken";
import { IChangePassword } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";



export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(userData)
        });

        const result = await res.json();

        if(result.success) {
            (await cookies()).set("accessToken", result.data.accessToken);
        }

        return result;

    } catch (error) {
        console.log(error);
    }
}



export const getCurrentUser = async () => {
    const token = (await cookies()).get("accessToken")?.value;

    let decodedData = null;

    if (token) {
        decodedData = await jwtDecode(token);
        return decodedData;
    } else {
        return null;
    }
}


export const logout = async () => {
    (await cookies()).delete("accessToken");
}

export const getNewToken = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": (await cookies()).get("refreshToken")!.value
            }
        });
      
        return res.json();
    } catch (error) {
        console.log(error);
    }
}


export const changePassword = async (data: IChangePassword) => {

    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            credentials: "include",
            body: JSON.stringify(data)
        })

        const result = await res.json();

        return result;

    } catch (error) {
        console.log(error)
    }
}