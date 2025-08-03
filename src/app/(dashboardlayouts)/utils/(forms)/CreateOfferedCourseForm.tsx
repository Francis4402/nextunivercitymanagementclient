/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllDepartments, getSingleDepartments } from '@/services/ADepartment'
import { getAllCourses, getCourseFacutly } from '@/services/Courses'
import { getAllSemesterRegistrations } from '@/services/SemesterRegistration'
import { IAdepartment } from '@/types/adepartmenttype'
import { IAfaculty, IAfacultyPayload } from '@/types/afacultytype'
import { ICourse, ICoursePayload } from '@/types/coursesType'
import { ISemesterRegistration } from '@/types/semsterRegistration'
import React, { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Check, ChevronsUpDown } from "lucide-react";
import { IFacultyForm } from "@/types/facultyType";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfferedCourseValidation, OfferedCourseValidationSchema } from "../VSchemas/OfferedCourseValidation";
import { TimePicker } from "../TimePicker";
import { createOfferedCourse } from "@/services/OfferedCourse";
import { toast } from "sonner";




const CreateOfferedCourseForm = () => {

    const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const [departmentData, setDepartmentData] = useState<IAdepartment[]>([]);
    const [SemesterRegistration, setSemsterRegistration] = useState<ISemesterRegistration[]>([]);
    const [course, setCourse] = useState<ICourse[]>([]);
    const [selectAFaculty, setAFaculty] = useState<IAfacultyPayload | null>(null);
    const [courseFaculty, setCourseFaculty] = useState<ICoursePayload | null>(null);


    const form = useForm<OfferedCourseValidation>({
        resolver: zodResolver(OfferedCourseValidationSchema),
        defaultValues: {
            section: 0,
            maxCapacity: 0,
            days: [],
            startTime: "00:00",
            endTime: "00:00"
        }
    });

    const { formState: { isSubmitting } } = form;

    const loadInitialData = useCallback(async () => {
        try {
            await Promise.all([
                loadSemesterRegistration(),
                loadDepartmentData(),
                loadCourseData(),
            ]);
        } catch (error) {
            console.error("Error loading initial data:", error);
        }
    }, []);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);


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

    const loadAFacultyData = async (id: string) => {
        if (!id) {
            setAFaculty(null);
            return;
        }
        
        try {
            const res = await getSingleDepartments(id);
            setAFaculty(res.data);
        } catch (error) {
            console.error("Error loading course faculty:", error);
            setAFaculty(null);
        }
    }


    const loadCourseFacultyData = async (id: string) => {
        if (!id) {
            setCourseFaculty(null);
            return;
        }
        
        try {
            const res = await getCourseFacutly(id);
            setCourseFaculty(res.data);
        } catch (error) {
            console.error("Error loading course faculty:", error);
            setCourseFaculty(null);
        }
    }
    

    const handleFacultyData = (id: string) => {
        form.setValue('faculty', '');
        loadCourseFacultyData(id);
    }

    const handleLoadAFacultyData = (id: string) => {
        form.setValue('academicFaculty', '');
        loadAFacultyData(id);
    }

    const onSubmit: SubmitHandler<OfferedCourseValidation> = async (data) => {
        
        try {

            const payload = {
                ...data,
            };

            const res = await createOfferedCourse(payload);

            if (res) {
                toast.success(res?.message);
                form.reset();
            } else {
                toast.error(res?.message || 'Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Card className="shadow-lg border-0 w-full">
        <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-bold text-center">Create Academic Faculty</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full">
                    
                    <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                        <h1 className='border-b w-full'>Academic Info</h1>
                        <div className='grid lg:grid-cols-5 sm:grid-cols-2 gap-5 w-full'>

                            <FormField control={form.control} name='semesterRegistration' render={({field}) => (
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

                            <FormField control={form.control} name='academicDepartment' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Academic Department</FormLabel>
                                    <Select onValueChange={(value) => {
                                                field.onChange(value);
                                                handleLoadAFacultyData(value);
                                            }}  value={field.value || ''}>
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

                            <FormField control={form.control} name='academicFaculty' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Academic Faculty</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value || ''} disabled={!selectAFaculty}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select A Faculty" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {selectAFaculty?.academicFaculty ? (
                                                    Array.isArray(selectAFaculty.academicFaculty) ? (
                                                        selectAFaculty.academicFaculty.map((faculty: IAfaculty) => (
                                                            faculty._id && (
                                                                <SelectItem key={faculty._id} value={faculty._id}>
                                                                    {faculty.name}
                                                                </SelectItem>
                                                            )
                                                        ))
                                                    ) : (
                                                        selectAFaculty.academicFaculty._id && (
                                                            <SelectItem value={selectAFaculty.academicFaculty._id}>
                                                                {selectAFaculty.academicFaculty.name}
                                                            </SelectItem>
                                                        )
                                                    )
                                                ) : (
                                                    <SelectItem value="no-faculty" disabled>
                                                        No faculty available
                                                    </SelectItem>
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            
                            

                            <FormField control={form.control} name='course' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Courses</FormLabel>
                                    <Select onValueChange={(value) => {
                                                field.onChange(value);
                                                handleFacultyData(value);
                                            }}  value={field.value || ''}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select Course" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    course.map((items: any) => {
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

                            <FormField control={form.control} name="faculty" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Faculty Member</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value || ''} disabled={!courseFaculty}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select Faculty Member" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {courseFaculty?.faculties?.map((faculty: IFacultyForm) => {
                                                    const displayName = `${faculty.name.firstName} ${faculty.name.lastName}`;
                                                    return (
                                                        <SelectItem key={faculty._id || faculty.email} value={faculty._id!}>
                                                            {displayName} - {faculty.designation}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                        </div>
                    </div>


                    <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                        <h1 className='border-b w-full'>Other Info</h1>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                            <FormField 
                                control={form.control} 
                                name='section' 
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
                                name='maxCapacity' 
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

                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <TimePicker
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            use12Hour={true}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End Time</FormLabel>
                                    <FormControl>
                                    <TimePicker
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        use12Hour={true}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                    </div>

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