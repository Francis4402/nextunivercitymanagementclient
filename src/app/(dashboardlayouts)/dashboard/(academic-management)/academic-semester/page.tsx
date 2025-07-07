"use client"

import { useEffect, useState } from "react";
import { getAllSemesters } from "@/services/AcademicSemester"
import { IAcademicSemester } from "@/types/academicsemestertype";
import { DataTable } from "./table";
import { ColumnDef } from "@tanstack/react-table";

const AcademicSemester = () => {
  const [semesterData, setSemesterData] = useState<IAcademicSemester[]>([]);

  useEffect(() => {
    getAllSemesters().then((semesters) => {
      setSemesterData(semesters.data);
    });
  }, []);

  const columns: ColumnDef<IAcademicSemester>[] = [
    {
      accessorKey: "name",
      header: "Semester Name",
      cell: ({ row }) => <div className="text-left">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "year",
      header: "Academic Year",
      cell: ({ row }) => <div className="text-left">{row.getValue("year")}</div>,
    },
    {
      accessorKey: "code",
      header: "Generated Code",
      cell: ({ row }) => <div className="text-left">{row.getValue("code")}</div>,
    },
    {
      accessorKey: "startMonth",
      header: "Start Month",
      cell: ({ row }) => <div className="text-left">{row.getValue("startMonth")}</div>,
    },
    {
      accessorKey: "endMonth",
      header: "End Month",
      cell: ({ row }) => <div className="text-left">{row.getValue("endMonth")}</div>,
    }
  ]
  
  return (
    <div className="mt-10">
      <DataTable columns={columns} data={semesterData} />
    </div>
  )
}

export default AcademicSemester


