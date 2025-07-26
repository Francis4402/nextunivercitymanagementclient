"use client"

import { IAdminPayload } from "@/types/user";
import { DashboardTable } from "../utils/table";
import { useEffect, useState } from "react";
import { getAllAdmins } from "@/services/Admin";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";



const Admins = () => {

    const [admin, setAdmin] = useState<IAdminPayload[]>([]);
  
    useEffect(() => {
      getAllAdmins().then((admin) => {
        setAdmin(admin.data);
      });
    }, []);
    
  
    
    const columns: ColumnDef<IAdminPayload>[] = [
      {
        accessorKey: "profileImg",
        header: "Profile Image",
        cell: ({ row }) => <div className="text-left">
          {row.getValue("profileImg") ? (
            <Image src={row.getValue("profileImg")} alt="i" width={200} height={200} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 text-center text-sm text-gray-500">
              
            </div>
          )}
        </div>,
      },
      {
        accessorKey: "designation",
        header: "Designation",
        cell: ({ row }) => <div className="text-left">{row.getValue("designation")}</div>,
      },
      {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ row }) => <div className="text-left">{row.getValue("fullName")}</div>,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="text-left">{row.getValue("email")}</div>,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => <div className="text-left">{row.getValue("gender")}</div>,
      },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        cell: ({ row }) => {
          const value = row.getValue("dateOfBirth");
          const date = typeof value === "string" || typeof value === "number" 
          ? new Date(value).toLocaleDateString() : "";
          return <div className='text-left'>{date}</div>
        }
      },
      {
        accessorKey: "contactNo",
        header: "Contact No",
        cell: ({ row }) => <div className="text-left">{row.getValue("contactNo")}</div>,
      },
      {
        accessorKey: "emergencyContactNo",
        header: "Emergency Contact No",
        cell: ({ row }) => <div className="text-left">{row.getValue("emergencyContactNo")}</div>,
      },
      {
        accessorKey: "presentAddress",
        header: "Present Address",
        cell: ({ row }) => <div className="text-left">{row.getValue("presentAddress")}</div>,
      },
      {
        accessorKey: "permanentAddress",
        header: "Permanent Address",
        cell: ({ row }) => <div className="text-left">{row.getValue("permanentAddress")}</div>,
      },
    ];
  
    return (
      <div className="mt-10">
        <DashboardTable columns={columns} data={admin} />
      </div>
    )
  }
  
  export default Admins
  