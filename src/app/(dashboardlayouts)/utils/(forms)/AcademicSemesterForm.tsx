"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { ASemesterValidationSchema } from '../VSchemas/ASemesterValidation'
import { createAcademicSemester } from '@/services/AcademicSemester'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { IAcademicSemester } from '@/types/academicsemestertype'


const semesterCodeMapping = {
    'Autumn': '01',
    'Summer': '02', 
    'Fall': '03'
}

const AcademicSemesterForm = () => {


    const form = useForm({
        resolver: zodResolver(ASemesterValidationSchema)
    });

    const {formState: { isSubmitting }, watch, setValue} = form;
    
    const router = useRouter();

    const selectedName = watch('name');
    

    useEffect(() => {
        if (selectedName && semesterCodeMapping[selectedName as keyof typeof semesterCodeMapping]) {
            setValue('code', semesterCodeMapping[selectedName as keyof typeof semesterCodeMapping]);
        }
    }, [selectedName, setValue]);
    
    const onSubmit = async (academicData: IAcademicSemester) => {
        try {
            const res = await createAcademicSemester(academicData);

            if (res?.success) {
                toast.success(res?.message);
                router.push("/dashboard/academic-semester");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Card className="shadow-lg border-0 w-full">
            <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-xl font-bold text-center">Create Academic Semester</CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                    Fill in the semester details
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full">
                        <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-8'>
                            <FormField control={form.control} name='name' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Semester Name</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select semester name" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='Autumn'>Autumn</SelectItem>
                                                <SelectItem value="Summer">Summer</SelectItem>
                                                <SelectItem value="Fall">Fall</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='year' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Academic Year</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select academic year" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Array.from({ length: 10 }, (_, i) => {
                                                    const year = new Date().getFullYear() + i;
                                                    return (
                                                        <SelectItem key={year} value={year.toString()}>
                                                            {year}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='code' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Generated Code</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} disabled>
                                        <FormControl>
                                            <SelectTrigger className="h-10 bg-muted/50 w-full">
                                                <SelectValue placeholder="Auto-generated code" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='01'>01</SelectItem>
                                                <SelectItem value="02">02</SelectItem>
                                                <SelectItem value="03">03</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='startMonth' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Start Month</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select start month" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Array.from({ length: 12 }, (_, i) => {
                                                    const month = i;
                                                    const monthName = new Date(2024, month, 1).toLocaleString('default', { month: 'long' });
                                                    return (
                                                        <SelectItem key={i} value={monthName}>
                                                            {monthName}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='endMonth' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">End Month</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select end month" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Array.from({ length: 12 }, (_, i) => {
                                                    const month = i;
                                                    const monthName = new Date(2024, month, 1).toLocaleString('default', { month: 'long' });
                                                    return (
                                                        <SelectItem key={i} value={monthName}>
                                                            {monthName}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                            
                        <div className='pt-4'>
                            <Button type='submit' className='w-full h-10 text-sm font-medium' disabled={isSubmitting}>
                                { isSubmitting ? "Creating..." : "Create Semester" }
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
  )
}

export default AcademicSemesterForm