"use client"

import { getAllSemesterRegistrations } from "@/services/SemesterRegistration";
import { ISemesterRegistration } from "@/types/semsterRegistration"
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react"
import { DashboardTable } from "../../utils/table";
import { IAcademicSemester } from "@/types/academicsemestertype";


const Semesters = () => {

    const [semesters, setSemesters] = useState<ISemesterRegistration[]>([]);

    console.log(semesters);

    useEffect(() => {
        getAllSemesterRegistrations().then((semesters) => {
            setSemesters(semesters.data);
        })
    }, []);

    const columns: ColumnDef<ISemesterRegistration>[] = [
        {
            accessorKey: "academicSemester",
            header: "Academic Semester",
            cell: ({ row }) => {
                const academicSemester = row.getValue("academicSemester") as IAcademicSemester;
                const semesterInfo = academicSemester 
                    ? `${academicSemester.name} ${academicSemester.year}` 
                    : "N/A";
                return <div className="text-left">{semesterInfo}</div>
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <div className="text-left">{row.getValue("status")}</div>
        },
        {
            accessorKey: "startDate",
            header: "Start Date",
            cell: ({ row }) => {
                const value = row.getValue("startDate");
                const date = typeof value === "string" || typeof value === "number"
                ? new Date(value).toLocaleDateString() : "";
                return <div className='text-left'>{date ? date : "Not Yet Added"}</div>
            }
        },
        {
            accessorKey: "endDate",
            header: "End Date",
            cell: ({ row }) => {
                const value = row.getValue("endDate");
                const date = typeof value === "string" || typeof value === "number"
                ? new Date(value).toLocaleDateString() : "";
                return <div className='text-left'>{date ? date : "Not Yet Added"}</div>
            }
        },
        {
            accessorKey: "minCredit",
            header: "Min Credit",
            cell: ({ row }) => <div className="text-left">{row.getValue("minCredit")}</div>
        },
        {
            accessorKey: "maxCredit",
            header: "Max Credit",
            cell: ({ row }) => <div className="text-left">{row.getValue("maxCredit")}</div>
        }
    ]

  return (
    <div className="mt-10">
        <DashboardTable columns={columns} data={semesters} />
    </div>
  )
}

export default Semesters