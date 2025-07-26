"use client"

import { getAllStudents } from '@/services/Students'
import { ICreateStudentPayload } from '@/types/studenttypes';
import React, { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table';
import { DashboardTable } from '../utils/table';
import Image from 'next/image';

const Students = () => {

  const [students, setStudents] = useState<ICreateStudentPayload[]>([]);

  useEffect(() => {
    getAllStudents().then((faculty) => {
      setStudents(faculty.data);
    });
  }, []);

  
  console.log(students);


  const columns: ColumnDef<ICreateStudentPayload>[] = [
    {
      accessorKey: "profileImg",
      header: "Profile Image",
      cell: ({ row }) => <div className="text-left">
        {row.getValue("profileImg") ? (
          <Image src={row.getValue("profileImg")} alt="Profile Image" width={200} height={200} className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 text-center text-sm text-gray-500">
            
          </div>
        )}
      </div>,
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
      header: "Date Of Birth",
      cell: ({ row }) => {
        const value = row.getValue("dateOfBirth");
        const date = typeof value === "string" || typeof value === "number" 
        ? new Date(value).toLocaleDateString() : "";
        return <div className='text-left'>{date ? date : "Not Yet Added"}</div>
      },
    },
    {
      accessorKey: "bloodGroup",
      header: "Blood Group",
      cell: ({ row }) => <div className="text-left">{row.getValue("bloodGroup")}</div>,
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
      <DashboardTable columns={columns} data={students} />
    </div>
  )
}

export default Students