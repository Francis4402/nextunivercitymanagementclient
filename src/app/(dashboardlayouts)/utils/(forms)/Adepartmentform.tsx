"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ADepartmentValidationSchema, IAdepartmentValidationSchema } from '../VSchemas/ADepartmentValidation';
import { createADepartment } from '@/services/ADepartment';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { IAfaculty } from '@/types/afacultytype';
import { getAllFaculties } from '@/services/AFaculty';

const Adepartmentform = () => {

    const [facultyData, setFacultyData] = useState<IAfaculty[]>([]);


    useEffect(() => {
        getAllFaculties().then((faculty) => {
            setFacultyData(faculty.data);
        });
    }, []);

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(ADepartmentValidationSchema)
    })

    const {formState: { isSubmitting }} = form;

    const onSubmit: SubmitHandler<IAdepartmentValidationSchema> = async (departmentData) => {
        try {
            const res = await createADepartment(departmentData);

            if (res?.success) {
                toast.success(res?.message);
                router.push("/academic-department");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Card className="shadow-lg border-0 w-full">
        <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-bold text-center">Create Academic Department</CardTitle>
        </CardHeader>
        <CardContent className='sm:w-1/2 w-full mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full">
                    <FormField control={form.control} name='name' render={({field}) => (
                        <FormItem>
                            <FormLabel>Department Name</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} value={field.value || ""} placeholder='Enter Faculty Name' />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='academicFaculty' render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Academic Faculty</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ''}>
                                <FormControl>
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="Select Academic Faculty" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            facultyData.map((items) => {
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

export default Adepartmentform