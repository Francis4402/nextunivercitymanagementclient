/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllDepartments } from '@/services/ADepartment'
import { getAllFaculties } from '@/services/AFaculty'
import { getAllCourses } from '@/services/Courses'
import { getAllFaculty } from '@/services/Faculty'
import { getAllSemesterRegistrations } from '@/services/SemesterRegistration'
import { IAdepartment } from '@/types/adepartmenttype'
import { IAfaculty } from '@/types/afacultytype'
import { ICourse } from '@/types/coursesType'
import { IFacultyPayload } from '@/types/facultyType'
import { ISemesterRegistration } from '@/types/semsterRegistration'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Check, ChevronsUpDown } from "lucide-react";


const CreateOfferedCourseForm = () => {

    const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const [departmentData, setDepartmentData] = useState<IAdepartment[]>([]);
    const [SemesterRegistration, setSemsterRegistration] = useState<ISemesterRegistration[]>([]);
    const [course, setCourse] = useState<ICourse[]>([]);
    const [selectAFaculty, setAFaculty] = useState<IAfaculty[]>([]);
    const [faculty, setFaculty] = useState<IFacultyPayload[]>([]);

    const form = useForm();

    const { formState: { isSubmitting } } = form;

    useEffect(() => {
        loadSemesterRegistration();
        loadDepartmentData();
        loadCourseData();
        loadAFacultyData();
        loadFacultyData();
    }, []);

    const loadSemesterRegistration = async () => {
        await getAllSemesterRegistrations().then((res) => {
            setSemsterRegistration(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const loadDepartmentData = async () => {
        await getAllDepartments().then((res) => {
            setDepartmentData(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const loadCourseData = async () => {
        await getAllCourses().then((res) => {
            setCourse(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const loadAFacultyData = async () => {
        await getAllFaculties().then((res) => {
            setAFaculty(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const loadFacultyData = async () => {
        await getAllFaculty().then((res) => {
            setFaculty(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const onSubmit = async (data: any) => {
        console.log(data);
    }

  return (
    <Card className="shadow-lg border-0 w-full">
        <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-bold text-center">Create Academic Faculty</CardTitle>
        </CardHeader>
        <CardContent className='sm:w-1/2 w-full mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full">
                    
                    <FormField control={form.control} name='semester' render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Semester Registration</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ''}>
                                <FormControl>
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="Select Semester Registration" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            SemesterRegistration.map((items: any) => {
                                                return (
                                                    <SelectItem key={items._id} value={items._id!}>
                                                        {items.academicSemester.name} {items.academicSemester.year}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name='faculty' render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Academic Faculty</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ''}>
                                <FormControl>
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="Select A Faculty" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            selectAFaculty.map((items: IAfaculty) => {
                                                return (
                                                    <SelectItem key={items._id} value={items._id!}>
                                                        {items.name}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    
                    <FormField control={form.control} name='department' render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Academic Department</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ''}>
                                <FormControl>
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="Select Academic Department" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            departmentData.map((items: IAdepartment) => {
                                                return (
                                                    <SelectItem key={items._id} value={items._id!}>
                                                        {items.name}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name='courses' render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Courses</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ''}>
                                <FormControl>
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="Select Course" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            course.map((items: ICourse) => {
                                                return (
                                                    <SelectItem key={items._id} value={items._id!}>
                                                        {items.title} {items.prefix}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name='members' render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Faculty Members</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ''}>
                                <FormControl>
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="Select Faculty" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            faculty.map((items: any) => {
                                                console.log(items);
                                                return (
                                                    <SelectItem key={items._id} value={items._id!}>
                                                        {items.name.firstName} {items.name.middleName} {items.name.lastName}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField 
                        control={form.control} 
                        name='body.minCredit' 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Section</FormLabel>
                                <FormControl>
                                    <Input 
                                        type='number' 
                                        {...field} 
                                        value={field.value || ""} 
                                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                        placeholder='Enter section' 
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
                    />

                    <FormField 
                        control={form.control} 
                        name='body.minCredit' 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Max Capacity</FormLabel>
                                <FormControl>
                                    <Input 
                                        type='number' 
                                        {...field} 
                                        value={field.value || ""} 
                                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                        placeholder='Enter maxCapacity' 
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
                    />

                    <FormField
                        control={form.control}
                        name="days"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Select Days</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-[200px] justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value && field.value.length > 0
                                            ? field.value.join(", ")
                                            : "Select days"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                    <div className="max-h-60 overflow-y-auto">
                                        {DAYS.map((day) => (
                                        <div
                                            key={day}
                                            className="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer"
                                            onClick={() => {
                                            const currentValue = field.value || [];
                                            if (currentValue.includes(day)) {
                                                field.onChange(
                                                currentValue.filter((d: string) => d !== day)
                                                );
                                            } else {
                                                field.onChange([...currentValue, day]);
                                            }
                                            }}
                                        >
                                            <Check
                                            className={cn(
                                                "h-4 w-4",
                                                field.value?.includes(day)
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                            />
                                            {day}
                                        </div>
                                        ))}
                                    </div>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className='pt-4'>
                        <Button type='submit' className='w-full h-10 text-sm font-medium' disabled={isSubmitting}>
                            { isSubmitting ? "Submitting...." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>

  )
}

export default CreateOfferedCourseForm