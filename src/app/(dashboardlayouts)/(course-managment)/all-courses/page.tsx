/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ICourse, ICourseForm } from '@/types/coursesType';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react'
import { DashboardTable } from '../../utils/table';
import { assignFaculty, deleteCourse, getAllCourses, updateCourse } from '@/services/Courses';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getAllFaculty } from '@/services/Faculty';


const AllCourses = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [assignOpen, setAssignOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<ICourseForm | null>(null);
    const [selectedForUpdate, setSelectedForUpdate] = useState<ICourse | null>(null);
    const [selectedPrerequisites, setSelectedPrerequisites] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedFacultyId, setSelectedFacultyId] = useState<string[]>([]);
    const [faculties, setFaculty] = useState([]);
    const [isAssigning, setIsAssigning] = useState(false);

    useEffect(() => {
        fetchCourses();
        fetchFaculties();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await getAllCourses();
            setCourses(res.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error("Failed to fetch courses");
        }
    };

    const fetchFaculties = async () => {
        try {
            const res = await getAllFaculty();
            setFaculty(res.data);
        } catch (error) {
            console.error("Error fetching faculties:", error);
            toast.error("Failed to fetch faculties");
        }
    }

    const handleAssignClick = (course: any) => {
        setSelectedCourse(course);
        setSelectedFacultyId([]); // Reset faculty selection
        setAssignOpen(true);
    }

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

    const handleAssignFaculty = async () => {
        if (!selectedCourse || selectedFacultyId.length === 0) {
            toast.warning("Please select a faculty");
            return;
        }

        setIsAssigning(true);
        
        try {
            const response = await assignFaculty(selectedCourse._id!, selectedFacultyId);

            if (response) {
                toast.success("Faculty assigned successfully");
                await fetchCourses();
                setAssignOpen(false);
                setSelectedFacultyId([]);
                setSelectedCourse(null);
            } else {
                toast.error("Failed to assign faculty");
            }
        } catch (error: any) {
            console.error("Assignment error:", error);
            
            if (error.message) {
                toast.error(error.message);
            } else if (typeof error === 'string') {
                toast.error(error);
            } else {
                toast.error("Failed to assign faculty");
            }
        } finally {
            setIsAssigning(false);
        }
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
            setSelectedForUpdate(null);
            setSelectedPrerequisites([]);
        } catch (error) {
            console.error("Error updating prerequisites:", error);
            toast.error("Failed to update prerequisites");
        }
    };

    const handleDelete = async () => {
        if (!selectedCourse) return;

        try {
            await deleteCourse(selectedCourse._id!);
            await fetchCourses();
            toast.success("Course deleted successfully");
            setDeleteOpen(false);
            setSelectedCourse(null);
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Failed to delete course");
        }
    };

    // Close modals and reset state
    const handleCloseAssignModal = () => {
        setAssignOpen(false);
        setSelectedFacultyId([]);
        setSelectedCourse(null);
    };

    const handleCloseDeleteModal = () => {
        setDeleteOpen(false);
        setSelectedCourse(null);
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
            cell: ({ row }) => (
                <div className='text-left'>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                        row.getValue("isDeleted") 
                            ? "bg-red-100 text-red-800" 
                            : "bg-green-100 text-green-800"
                    }`}>
                        {row.getValue("isDeleted") ? "Deleted" : "Active"}
                    </span>
                </div>
            )
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
                                    disabled={course.isDeleted}
                                >
                                    Update
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
                                <DropdownMenuGroup>
                                    {courses
                                        .filter(c => c._id !== course._id && !c.isDeleted)
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
                                                        {courseOption.title} ({courseOption.prefix}{courseOption.code})
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
                                        Update Prerequisites
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button 
                            variant={"outline"} 
                            size={"sm"} 
                            onClick={() => handleDeleteClick(course)}
                            disabled={course.isDeleted}
                        >
                            Delete
                        </Button>
                    </div>
                )
            }
        },
        {
            header: "Assign Faculty",
            cell: ({ row }) => {
                const course = row.original;
                return (
                    <Button 
                        variant={"outline"} 
                        size={"sm"} 
                        onClick={() => handleAssignClick(course)}
                        disabled={course.isDeleted}
                    >
                        Assign
                    </Button>
                )
            }
        }
    ];

    return (
        <div className='mt-10'>
            <DashboardTable columns={columns} data={courses} />

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onOpenChange={handleCloseDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Course</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Are you sure you want to delete the course ?
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

            {/* Assign Faculty Dialog */}
            <Dialog open={assignOpen} onOpenChange={handleCloseAssignModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Assign Faculty</DialogTitle>
                        <DialogDescription>
                            Select faculty for {selectedCourse?.title}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Select Faculty Members:</label>
                            <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                                    {faculties.length > 0 ? (
                                        faculties.map((faculty: any) => (
                                            <div key={faculty._id} className="flex items-center space-x-2 p-1">
                                                <Checkbox
                                                    checked={selectedFacultyId.includes(faculty._id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedFacultyId(prev => [...prev, faculty._id]);
                                                        } else {
                                                            setSelectedFacultyId(prev => prev.filter(id => id !== faculty._id));
                                                        }
                                                    }}
                                                    disabled={isAssigning}
                                                />
                                                <label className="text-sm cursor-pointer flex-1">
                                                    {faculty.name.firstName} {faculty.name.middleName ? faculty.name.middleName + ' ' : ''}{faculty.name.lastName}
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-gray-500">No faculties available</div>
                                    )}
                                </div>
                                {selectedFacultyId.length > 0 && (
                                    <div className="text-sm text-gray-600">
                                        {selectedFacultyId.length} faculty(ies) selected
                                    </div>
                                )}
                            </div>
                        </div>

                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={handleCloseAssignModal}
                            disabled={isAssigning}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAssignFaculty}
                            disabled={!selectedFacultyId || isAssigning || faculties.length === 0}
                        >
                            {isAssigning ? "Assigning..." : "Assign"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AllCourses