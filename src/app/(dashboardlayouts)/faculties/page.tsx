"use client"

import React, { useEffect, useState } from 'react'
import { IFacultyPayload } from '@/types/facultyType';
import { ColumnDef } from '@tanstack/react-table';
import { getAllFaculty } from '@/services/Faculty';
import { DashboardTable } from '../utils/table';
import Image from 'next/image';
import { TUserName } from '@/types/user';

const Faculties = () => {

  const [faculties, setFaculties] = useState<IFacultyPayload[]>([]);

  useEffect(() => {
    getAllFaculty().then((faculty) => {
      setFaculties(faculty.data);
    });
  }, []);
  

  
  const columns: ColumnDef<IFacultyPayload>[] = [
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
      accessorKey: "name",
      header: "Full Name",
      cell: ({ row }) => {
        const value = row.getValue("name") as TUserName;
        const fullName = value
        ? `${value.firstName} ${value.middleName} ${value.lastName}`
        : "N/A";
        return <div className="text-left">{fullName}</div>;
      }
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => <div className="text-left">{row.getValue("designation")}</div>,
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
          
          if (!value || 
              (typeof value !== 'string' && 
               typeof value !== 'number' && 
               !(value instanceof Date))) {
              return <div className='text-left'>Not Yet Added</div>;
          }
          
          const date = new Date(value);
          
          if (isNaN(date.getTime())) {
              return <div className='text-left'>Invalid Date</div>;
          }
          
          const options: Intl.DateTimeFormatOptions = { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
          };
          const formattedDate = date.toLocaleDateString(undefined, options);
          return <div className='text-left'>{formattedDate}</div>;
      }
    },
    {
      accessorKey: "contactNo",
      header: "Contact No",
      cell: ({ row }) => <div className="text-left">{row.getValue("contactNo")}</div>,
    },
    {
      accessorKey: "emergencyContactNo",
      header: "Emergency ContactNo",
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
      <DashboardTable columns={columns} data={faculties} />
    </div>
  )
}

export default Faculties



