"use client"

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronDownIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

const CreateStudentForm = () => {

    const form = useForm();


    const {formState: { isSubmitting }} = form;

    const onSubmit = async (data: any) => {
        console.log(data);
    }

  return (
    <Card className="shadow-lg border-0 w-full">
        <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-bold text-center">Create Student</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full">
                    <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                        <h1 className='border-b w-full'>Personal Info</h1>
                        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                            
                            <FormField control={form.control} name='firstName' render={({field}) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter FirstName' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='middleName' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Middle Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter MiddleName' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='lastName' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter LastName' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='gender' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Gender</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='male'>Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='dateOfBirth' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Date Of Birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="justify-between font-normal w-full"
                                            >
                                                {field.value ? new Date(field.value).toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                captionLayout="dropdown"
                                                onSelect={(date) => field.onChange(date)}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='bloodGroup' render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Blood Group</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Select Blood Group" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='A+'>A+</SelectItem>
                                                <SelectItem value="A-">A-</SelectItem>
                                                <SelectItem value="B+">B+</SelectItem>
                                                <SelectItem value="B-">B-</SelectItem>
                                                <SelectItem value="AB+">AB+</SelectItem>
                                                <SelectItem value="AB-">AB-</SelectItem>
                                                <SelectItem value="O+">O+</SelectItem>
                                                <SelectItem value="O-">O-</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </div>


                    <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                        <h1 className='border-b w-full'>Contact Info</h1>
                        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                            
                            <FormField control={form.control} name='email' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Email' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='contactNo' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Contact No</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Contact' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='emergencyContactNo' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Emergency Contact</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Emergency Contact' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='presentAddress' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Present Address</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Present Address' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='permanentAddress' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Permanent Address</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Permanent Address' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                        </div>
                    </div>


                    <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                        <h1 className='border-b w-full'>Guardian Info</h1>
                        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                            
                            <FormField control={form.control} name='fatherName' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Father Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Father Name' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='fatherOccupation' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Father Occupation</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Father Occupation' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='fatherContactNo' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Father Contact No</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Father ContactNo' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='motherName' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Mother Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Mother Name' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='motherOccupation' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Mother Occupation</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Mother Occupation' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='motherContactNo' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Mother ContactNo</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} value={field.value || ""} placeholder='Enter Mother ContactNo' />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />
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

export default CreateStudentForm