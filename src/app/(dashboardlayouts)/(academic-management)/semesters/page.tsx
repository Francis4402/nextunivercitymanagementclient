"use client"

import { deleteSemesterRegistration, getAllSemesterRegistrations, updateSemesterRegistration } from "@/services/SemesterRegistration";
import { ISemesterRegistration } from "@/types/semsterRegistration"
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react"
import { DashboardTable } from "../../utils/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IAcademicSemester } from "@/types/academicsemestertype";


const Semesters = () => {
    const [semesters, setSemesters] = useState<ISemesterRegistration[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [semesterToDelete, setSemesterToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchSemesters();
    }, []);

    const fetchSemesters = async () => {
        try {
            const response = await getAllSemesterRegistrations();
            setSemesters(response.data);
        } catch (error) {
            console.error("Failed to fetch semesters:", error);
            toast.error("Failed to fetch semester registrations");
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await updateSemesterRegistration(id, { status });
            toast.success("Semester status updated successfully");
            await fetchSemesters();
        } catch (error) {
            console.error("Failed to update semester:", error);
            toast.error("Failed to update semester status");
        }
    };

    const handleDeleteClick = (id: string) => {
        setSemesterToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = async () => {
        if (!semesterToDelete) return;
        
        try {
            await deleteSemesterRegistration(semesterToDelete);
            toast.success("Semester deleted successfully");
            await fetchSemesters();
        } catch (error) {
            console.error("Failed to delete semester:", error);
            toast.error("Failed to delete semester");
        } finally {
            setOpenDeleteDialog(false);
            setSemesterToDelete(null);
        }
    };

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
            cell: ({ row }) => <div className="flex items-start">
                <div className="text-center border rounded-full p-2">{row.getValue("status")}</div>
            </div>
        },
        {
            accessorKey: "startDate",
            header: "Start Date",
            cell: ({ row }) => {
                const value = row.getValue("startDate");
                
                if (!value || 
                    (typeof value !== 'string' && 
                     typeof value !== 'number' && 
                     !(value instanceof Date))) {
                    return <div className='text-left'>Not Yet Added</div>;
                }
                
                const date = new Date(value);
                // Additional check for invalid date
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
            accessorKey: "endDate",
            header: "End Date",
            cell: ({ row }) => {
                const value = row.getValue("endDate");
                
                if (!value || 
                    (typeof value !== 'string' && 
                     typeof value !== 'number' && 
                     !(value instanceof Date))) {
                    return <div className='text-left'>Not Yet Added</div>;
                }
                
                const date = new Date(value);
                // Additional check for invalid date
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
            accessorKey: "minCredit",
            header: "Min Credit",
            cell: ({ row }) => <div className="text-left">{row.getValue("minCredit")}</div>
        },
        {
            accessorKey: "maxCredit",
            header: "Max Credit",
            cell: ({ row }) => <div className="text-left">{row.getValue("maxCredit")}</div>
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                const semester = row.original;
                return (
                    <div className="flex space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"outline"} size={"sm"}>
                                    Update Status
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(semester._id!, "UPCOMING")}>
                                        UPCOMING
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(semester._id!, "ONGOING")}>
                                        ONGOING
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(semester._id!, "ENDED")}>
                                        ENDED
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(semester._id!)}
                        >
                            Delete
                        </Button>
                    </div>
                )
            }
        },
    ];

    return (
        <div className="mt-10">
            <DashboardTable columns={columns} data={semesters} />
            
            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the semester registration.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>Cancel</DialogClose>
                        <Button onClick={handleDeleteConfirm}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Semesters