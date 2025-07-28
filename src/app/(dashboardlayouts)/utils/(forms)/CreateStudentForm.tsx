/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllSemesters } from '@/services/AcademicSemester'
import { getAllDepartments } from '@/services/ADepartment'
import { IAcademicSemester } from '@/types/academicsemestertype'
import { IAdepartment } from '@/types/adepartmenttype'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon, Upload } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createStudentValidationSchema, StudentValidation } from '../VSchemas/StudentFormValidation'
import { toast } from 'sonner'
import { ICreateStudentPayload } from '@/types/studenttypes'
import { createStudent } from '@/services/Students'


const studentDummyData: ICreateStudentPayload = {
    "password": "student123",
    "student": {
        "name": {
            "firstName": "Adnan ",
            "middleName": "Student",
            "lastName": "gandu"
        },
        "gender": "male",
        "dateOfBirth": "",
        "email": "adnan@gmail.com",
        "contactNo": "01319052507",
        "emergencyContactNo": "01319052508",
        "bloodGroup": "A+",
        "presentAddress": "124 Main St, Cityville",
        "permanentAddress": "256 Oak St, Townsville",
        "guardian": {
            "fatherName": "James Dew",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "01319052504",
            "motherName": "Mary Dew",
            "motherOccupation": "Teacher",
            "motherContactNo": "01319052505"
        },
        "localGuardian": {
            "name": "Alice Johnson",
            "occupation": "Doctor",
            "contactNo": "01319052505",
            "address": "789 Pine St, Villageton"
        },
        "admissionSemester": "686bc3a8c566899728a81d0b",
        "academicDepartment": "686cf97910acb39687f3072b"
    }
};

const CreateStudentForm = () => {
    const [semesterData, setSemesterData] = useState<IAcademicSemester[]>([]);
    const [departmentData, setDepartmentData] = useState<IAdepartment[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [semesterResult, departmentResult] = await Promise.all([
                    getAllSemesters(),
                    getAllDepartments()
                ]);
                setSemesterData(semesterResult.data);
                setDepartmentData(departmentResult.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load semester and department data');
            }
        };

        fetchData();
    }, []);

    const form = useForm({
        resolver: zodResolver(createStudentValidationSchema),
        defaultValues: {
            body: {
                password: studentDummyData.password,
                student: studentDummyData.student
            }
        }
    });

    const { formState: { isSubmitting } } = form;

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
  
            if (!file.type.startsWith('image/')) {
                toast.error('Please select a valid image file');
                return;
            }


            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                toast.error('File size should be less than 5MB');
                return;
            }

            setSelectedFile(file);
            

            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit: SubmitHandler<StudentValidation> = async (data) => {
        try {
            const formData = new FormData();
            

            formData.append("data", JSON.stringify(data.body));
            

            if (selectedFile) {
                formData.append("file", selectedFile);
            }


            const result = await createStudent(formData);
            
            if (result?.success) {
                toast.success(result.message || 'Student created successfully!');
                

                form.reset();
                setSelectedFile(null);
                setFilePreview(null);
                

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                toast.error(result?.message || 'Failed to create student');
            }
        } catch (error: any) {
            console.error('Error creating student:', error);
            toast.error(error?.message || 'An error occurred while creating the student');
        }
    };

    return (
        <Card className="shadow-lg border-0 w-full">
            <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-xl font-bold text-center">Create Student</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full">
                        
                        <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                            <h1 className='border-b w-full'>Profile Image</h1>
                            <div className='flex flex-col items-center space-y-4'>
                                {filePreview && (
                                    <div className='relative'>
                                        <img
                                            src={filePreview}
                                            alt="Profile preview"
                                            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                                        />
                                    </div>
                                )}
                                <div className='flex items-center space-x-4'>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                        id="profile-image"
                                    />
                                    <label 
                                        htmlFor="profile-image" 
                                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        {selectedFile ? 'Change Image' : 'Upload Image'}
                                    </label>
                                    {selectedFile && (
                                        <span className="text-sm text-gray-500">
                                            {selectedFile.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Personal Info Section */}
                        <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                            <h1 className='border-b w-full'>Personal Info</h1>
                            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>

                                <FormField control={form.control} name='body.student.name.firstName' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter FirstName' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.name.middleName' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter MiddleName' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.name.lastName' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter LastName' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.gender' render={({field}) => (
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
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.dateOfBirth' render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Date Of Birth</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date"
                                                    className="justify-between font-normal w-full"
                                                >
                                                    { field.value ? new Date(field.value).toLocaleDateString() : "Select Date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                           </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(field.value) : undefined}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => field.onChange(date?.toISOString())}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.bloodGroup' render={({field}) => (
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

                                <FormField control={form.control} name='body.password' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' {...field} value={field.value || ''} placeholder='Enter Password' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* Contact Info Section */}
                        <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                            <h1 className='border-b w-full'>Contact Info</h1>
                            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                                
                                <FormField control={form.control} name='body.student.email' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type='email' {...field} value={field.value || ''} placeholder='Enter Email' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.contactNo' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Contact No</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Contact' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.emergencyContactNo' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Emergency Contact</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Emergency Contact' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.presentAddress' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Present Address</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Present Address' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.permanentAddress' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Permanent Address</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Permanent Address' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* Guardian Info Section */}
                        <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                            <h1 className='border-b w-full'>Guardian Info</h1>
                            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                                
                                <FormField control={form.control} name='body.student.guardian.fatherName' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Father Name</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Father Name' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.guardian.fatherOccupation' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Father Occupation</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Father Occupation' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.guardian.fatherContactNo' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Father Contact No</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Father ContactNo' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.guardian.motherName' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Mother Name</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Mother Name' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.guardian.motherOccupation' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Mother Occupation</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Mother Occupation' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.guardian.motherContactNo' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Mother ContactNo</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Mother ContactNo' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* Local Guardian Info Section */}
                        <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                            <h1 className='border-b w-full'>LocalGuardian Info</h1>
                            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 w-full'>
                                
                                <FormField control={form.control} name='body.student.localGuardian.name' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Local Guardian Name' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.localGuardian.occupation' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Occupation</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Local Guardian Occupation' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.localGuardian.contactNo' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Contact No</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Local Guardian ContactNo' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='body.student.localGuardian.address' render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} value={field.value || ''} placeholder='Enter Local Guardian Address' />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* Academic Info Section */}
                        <div className='flex flex-col items-center justify-center space-y-5 text-center'>
                            <h1 className='border-b w-full'>Academic Info</h1>
                            <div className='grid sm:grid-cols-2 gap-5 w-full'>
                                
                                <FormField control={form.control} name='body.student.admissionSemester' render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Academic Semester</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value || ''}>
                                            <FormControl>
                                                <SelectTrigger className="h-10 w-full">
                                                    <SelectValue placeholder="Select Academic Semester" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        semesterData.map((items) => {
                                                            return (
                                                                <SelectItem key={items._id} value={items._id!}>
                                                                    {items.name} {items.year}
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

                                <FormField control={form.control} name='body.student.academicDepartment' render={({field}) => (
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
                                                        departmentData.map((items) => {
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
                            </div>
                        </div>

                        {/* Submit Button */}
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