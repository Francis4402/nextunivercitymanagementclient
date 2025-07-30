/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ICourse, ICourseForm } from '@/types/coursesType';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react'
import { DashboardTable } from '../../utils/table';
import { deleteCourse, getAllCourses, updateCourse } from '@/services/Courses';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

const AllCourses = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<ICourseForm | null>(null);
    const [selectedForUpdate, setSelectedForUpdate] = useState<ICourse | null>(null);
    const [selectedPrerequisites, setSelectedPrerequisites] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await getAllCourses();
            setCourses(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteClick = (course: any) => {
        setSelectedCourse(course);
        setDeleteOpen(true);
    };

    const handleUpdateClick = (course: ICourse) => {
        setSelectedForUpdate(course);
        setSelectedPrerequisites(course.preRequisiteCourses ? [...course.preRequisiteCourses] : []);
        setDropdownOpen(true);
    };

    const handlePrerequisiteToggle = (courseId: string) => {
        setSelectedPrerequisites(prev => {
            const newSelection = prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId];
            return newSelection;
        });
    };

    const handleUpdatePrerequisites = async () => {
        if (!selectedForUpdate) return;

        try {
            const updateData = {
                preRequisiteCourses: selectedPrerequisites.map(courseId => ({
                  course: courseId,
                  isDeleted: false,
                })),
            };

            await updateCourse(selectedForUpdate._id!, updateData);

            toast.success("Prerequisite courses updated successfully");
            await fetchCourses();
            setDropdownOpen(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update prerequisite courses");
        }
    };

    const handleDelete = async () => {
        if (!selectedCourse) return;

        try {
            await deleteCourse(selectedCourse._id!);
            await fetchCourses();
            toast.success("Course deleted successfully");
            setDeleteOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    const columns: ColumnDef<ICourse>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => <div className='text-left'>{row.getValue("title")}</div>
        },
        {
            accessorKey: "prefix",
            header: "Prefix",
            cell: ({ row }) => <div className='text-left'>{row.getValue("prefix")}</div>
        },
        {
            accessorKey: "code",
            header: "Code",
            cell: ({ row }) => <div className='text-left'>{row.getValue("code")}</div>
        },
        {
            accessorKey: "credits",
            header: "Credits",
            cell: ({ row }) => <div className='text-left'>{row.getValue("credits")}</div>
        },
        {
            accessorKey: "isDeleted",
            header: "Status",
            cell: ({ row }) => <div className='text-left'>{row.getValue("isDeleted") ? "Deleted" : "Active"}</div>
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                const course = row.original;
                return (
                    <div className='flex space-x-2'>
                        <DropdownMenu open={dropdownOpen && selectedForUpdate?._id === course._id} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant={"outline"} 
                                    size={"sm"}
                                    onClick={() => handleUpdateClick(course)}
                                >
                                    Update Prerequisites
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
                                <DropdownMenuGroup>
                                    {courses
                                        .filter(c => c._id !== course._id)
                                        .map((courseOption) => (
                                            <DropdownMenuItem
                                                key={courseOption._id}
                                                onSelect={(e) => e.preventDefault()}
                                                className="focus:bg-transparent"
                                            >
                                                <div
                                                    className="flex items-center space-x-2 w-full"
                                                    onClick={() => handlePrerequisiteToggle(courseOption._id!)}
                                                >
                                                    <Checkbox
                                                        checked={
                                                            selectedForUpdate?._id === course._id &&
                                                            selectedPrerequisites.includes(courseOption._id!)
                                                        }
                                                        className="pointer-events-none"
                                                    />
                                                    <label className="w-full cursor-pointer">
                                                        {courseOption.title}
                                                    </label>
                                                </div>
                                            </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                                <div className="p-2 border-t">
                                    <Button 
                                        size="sm" 
                                        className="w-full"
                                        onClick={handleUpdatePrerequisites}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button 
                            variant={"outline"} 
                            size={"sm"} 
                            onClick={() => handleDeleteClick(course)}
                        >
                            Delete
                        </Button>
                    </div>
                )
            }
        }
    ];

    return (
        <div className='mt-10'>
            <DashboardTable columns={columns} data={courses} />

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Delete Course</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Are you sure you want to delete this course?
                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button 
                            type="submit" 
                            onClick={handleDelete} 
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AllCourses