/* eslint-disable @typescript-eslint/no-explicit-any */

import {BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers, {}) => {
        const token = Cookies.get("accessToken");

        if (token) {
            headers.set('authorization', `${token}`);
        }

        return headers;
    },
});

// const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
//     const result = await baseQuery(args, api, extraOptions);
    
//     if (result.error?.status === 401) {
//         try {
//             const refreshRes = await fetch(`${baseUrl}/auth/refresh-token`, {
//                 method: "POST",
//                 credentials: "include"
//             });

//             if (refreshRes.ok) {
//                 const refreshData = await refreshRes.json();
                
//                 if (refreshData.accessToken) {
//                     Cookies.set("accessToken", refreshData.accessToken);
//                 }
                
//                 const retryResult = await baseQuery(args, api, extraOptions);
//                 return retryResult;
//             }
//         } catch (error) {
//             console.error("Refresh token failed:", error);
//         }
//     }
    
//     return result;
// }

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    endpoints: () => ({})
})