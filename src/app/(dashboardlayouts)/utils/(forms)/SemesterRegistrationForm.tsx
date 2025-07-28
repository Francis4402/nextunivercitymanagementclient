"use client"

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllSemesters } from '@/services/AcademicSemester'
import { IAcademicSemester } from '@/types/academicsemestertype'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { createSemesterRValidationSchema, SemesterValidation } from '../VSchemas/SemesterRValidation'
import { createSemesterRegistration } from '@/services/SemesterRegistration'
import { useRouter } from 'next/navigation'


const SemesterRegistrationForm = () => {
    const [semesterData, setSemesterData] = useState<IAcademicSemester[]>([]);

    const form = useForm({
        resolver: zodResolver(createSemesterRValidationSchema),
    });

    const router = useRouter();

    const { formState: { isSubmitting } } = form;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [semesterResult] = await Promise.all([
                    getAllSemesters(),
                ]);
                setSemesterData(semesterResult.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load semester and department data');
            }
        };
        fetchData();
    }, []);

    const onSubmit: SubmitHandler<SemesterValidation> = async (data) => {
        try {
            console.log('Form data being submitted:', data);
            
            const res = await createSemesterRegistration(data.body);

            if (res?.success) {
                toast.success(res?.message);
                form.reset();
                router.push("/semesters");
            } else {
                toast.error(res?.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Failed to create semester registration');
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-center">Create Semester Registration</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full">
                        
                        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-6 items-center'>
                            <FormField 
                                control={form.control} 
                                name='body.academicSemester' 
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Academic Semester</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-10 w-full">
                                                    <SelectValue placeholder="Select Academic Semester" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {semesterData.map((items) => (
                                                        <SelectItem key={items._id} value={items._id!}>
                                                            {items.name} {items.year}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            
                            <FormField 
                                control={form.control} 
                                name='body.status' 
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-10 w-full">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value='UPCOMING'>Upcoming</SelectItem>
                                                    <SelectItem value="ONGOING">OnGoing</SelectItem>
                                                    <SelectItem value="ENDED">Ended</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />

                            <FormField 
                                control={form.control} 
                                name='body.startDate' 
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Start Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="justify-between font-normal w-full"
                                                    type="button"
                                                >
                                                    {field.value ? new Date(field.value).toLocaleDateString() : "Select Date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(field.value) : undefined}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            field.onChange(date.toISOString());
                                                        }
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />

                            <FormField 
                                control={form.control} 
                                name='body.endDate' 
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">End Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="justify-between font-normal w-full"
                                                    type="button"
                                                >
                                                    {field.value ? new Date(field.value).toLocaleDateString() : "Select Date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(field.value) : undefined}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            field.onChange(date.toISOString());
                                                        }
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />

                            <FormField 
                                control={form.control} 
                                name='body.minCredit' 
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Min Credit</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='number' 
                                                {...field} 
                                                value={field.value || ""} 
                                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                                placeholder='Enter min credit' 
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} 
                            />

                            <FormField 
                                control={form.control} 
                                name='body.maxCredit' 
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Max Credit</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type='number' 
                                                {...field} 
                                                value={field.value || ""} 
                                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                                placeholder='Enter max credit' 
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} 
                            />
                        </div>

                        <div className='pt-4'>
                            <Button type='submit' className='w-full h-10 text-sm font-medium' disabled={isSubmitting}>
                                {isSubmitting ? "Submitting...." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SemesterRegistrationForm