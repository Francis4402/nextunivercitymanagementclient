/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CourseValidationSchema, TCourse } from '../VSchemas/CourseValidation'
import { Badge } from '@/components/ui/badge'
import { ICourse } from '@/types/coursesType'
import { createCourse, getAllCourses } from '@/services/Courses'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { toast } from 'sonner';
import { useRouter } from 'next/navigation'


const CreateCourseForm = () => {
    const [courseData, setCourseData] = useState<ICourse[]>([]);

    const form = useForm<TCourse>({
        resolver: zodResolver(CourseValidationSchema),
        defaultValues: {
            title: "",
            prefix: "",
            code: 0,
            credits: 0,
            preRequisiteCourses: [],
            isDeleted: false
        }
    });

    const router = useRouter();

    const { formState: { isSubmitting } } = form;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllCourses();
                const activeCourses = response.data.filter((course: ICourse) => !course.isDeleted);
                setCourseData(activeCourses);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);


    const handleCourseSelect = (
        courseId: string,
        currentValues: { course: string; isDeleted: boolean }[],
        onChange: (value: { course: string; isDeleted: boolean }[]) => void
      ) => {
        if (!currentValues.some(item => item.course === courseId)) {
          const updated = [...currentValues, { course: courseId, isDeleted: false }];
          onChange(updated);
        }
    };
    

    const handleRemoveCourse = (
        courseId: string,
        currentValues: { course: string; isDeleted: boolean }[],
        onChange: (value: { course: string; isDeleted: boolean }[]) => void
      ) => {
        const updated = currentValues.filter(item => item.course !== courseId);
        onChange(updated);
    };

    const getSelectedCourses = (selected: { course: string }[]) => {
        return courseData.filter(course => 
          selected.some(item => item.course === course._id)
        );
    };

    const onSubmit: SubmitHandler<TCourse> = async (data) => {
        try {
          const apiPayload: ICourse = {
            ...data,
            preRequisiteCourses: Array.isArray(data.preRequisiteCourses)
            ? data.preRequisiteCourses.map((id: any) =>
                typeof id === 'string'
                    ? { course: id, isDeleted: false }
                    : id
                )
            : [],
          };
      
          const res = await createCourse(apiPayload);
      
          if (res?.success === true) {
            toast.success(res?.message || 'Course created successfully!');
            form.reset();
            router.push("/all-courses");
          } else {
            toast.error(res?.message || 'Something went wrong');
          }
        } catch (error) {
          console.log(error);
        }
      };
      

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-center">Create Course</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full">
                        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-6 items-center'>
                            <FormField control={form.control} name='title' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} placeholder='Enter Title' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="prefix" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Prefix</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} placeholder='Enter Prefix' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="code" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type='number' 
                                            {...field} 
                                            onChange={(e) => field.onChange(Number(e.target.value))} 
                                            placeholder='Enter Code' 
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="credits" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Credits</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type='number' 
                                            {...field} 
                                            onChange={(e) => field.onChange(Number(e.target.value))} 
                                            placeholder='Enter Credits' 
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField
                                control={form.control}
                                name="preRequisiteCourses"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PreRequisite Courses</FormLabel>
                                        <FormControl>
                                            <div className="space-y-2">
                                            <Select 
                                                onValueChange={(courseId) => handleCourseSelect(courseId, field.value || [], field.onChange)}
                                                value=""
                                            >
                                                <SelectTrigger>
                                                <SelectValue placeholder="Select a course" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                {courseData.map((course) => {
                                                    const isSelected = (field.value || []).some(item => item.course === course._id);
                                                    return (
                                                    <SelectItem 
                                                        key={course._id} 
                                                        value={course._id!}
                                                        disabled={isSelected}
                                                    >
                                                        {course.title}
                                                    </SelectItem>
                                                    );
                                                })}
                                                </SelectContent>
                                            </Select>

                                            <div className="flex flex-wrap gap-2">
                                                {getSelectedCourses(field.value || []).map((course) => (
                                                <Badge 
                                                    key={course._id} 
                                                    variant="secondary" 
                                                    className="px-3 py-1 flex items-center gap-1"
                                                >
                                                    {course.title}
                                                    <button
                                                    type="button"
                                                    className="ml-1 text-xs"
                                                    onClick={() => handleRemoveCourse(course._id!, field.value || [], field.onChange)}
                                                    aria-label={`Remove course ${course.title}`}
                                                    >
                                                    ×
                                                    </button>
                                                </Badge>
                                                ))}
                                            </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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

export default CreateCourseForm