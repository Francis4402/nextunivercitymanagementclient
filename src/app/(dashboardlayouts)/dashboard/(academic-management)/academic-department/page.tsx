"use client"

import { getAllDepartments } from '@/services/ADepartment';
import { IAdepartment } from '@/types/adepartmenttype';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react'
import { ADepartMentTable } from './table';

const ADepartment = () => {

  const [departmentData, setdepartmentData] = useState<IAdepartment[]>([]);

  useEffect(() => {
    getAllDepartments().then((department) => {
      setdepartmentData(department.data);
    });
  }, []);

  const columns: ColumnDef<IAdepartment>[] = [
    {
      accessorKey: "name",
      header: "Semester Name",
      cell: ({ row }) => <div className="text-left">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "academicFaculty",
      header: "Academic Faculty",
      cell: ({ row }) => {
        const faculty = row.original.academicFaculty;
        return (
          <div className="text-left">
            {typeof faculty === 'string' ? faculty : faculty?.name}
          </div>
        );
      },
    },
  ]

  return (
    <div className="mt-10">
      <ADepartMentTable columns={columns} data={departmentData} />
    </div>
  )
}

export default ADepartment