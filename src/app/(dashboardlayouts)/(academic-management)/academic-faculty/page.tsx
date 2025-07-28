
"use client"

import React, { useEffect, useState } from 'react'
import { IAfaculty } from '@/types/afacultytype'
import { ColumnDef } from '@tanstack/react-table'
import { getAllFaculties, updateFaculties } from '@/services/AFaculty'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AFacultyValidationSchema } from '@/app/(dashboardlayouts)/utils/VSchemas/AFacultyValidation'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { DashboardTable } from '../../utils/table'


const AFaculty = () => {

  const [facultyData, setFacultyData] = useState<IAfaculty[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<IAfaculty | null>(null);

  // Update form
  const updateForm = useForm({
    resolver: zodResolver(AFacultyValidationSchema)
  });

  useEffect(() => {
    getAllFaculties().then((faculties) => {
      setFacultyData(faculties.data);
    })
  }, []);

  useEffect(() => {
    if (selectedFaculty) {
      updateForm.reset({ name: selectedFaculty.name });
    }
  }, [selectedFaculty, updateForm]);

  const handleUpdateClick = (faculty: IAfaculty) => {
    setSelectedFaculty(faculty);
    setOpen(true);
  };

  const handleUpdateSubmit = async (data: IAfaculty) => {
    if (!selectedFaculty) return;
  
    try {
      await updateFaculties({ name: data.name }, selectedFaculty._id!);
  
      const updatedFaculties = await getAllFaculties();
      setFacultyData(updatedFaculties.data);
      
      toast.success("Faculty updated successfully");
      
      setOpen(false);
      updateForm.reset();
      setSelectedFaculty(null);
    } catch (error) {
      console.error("Update failed", error);
    }
  };


  const columns: ColumnDef<IAfaculty>[] = [
    {
      accessorKey: "name",
      header: "Department Name",
      cell: ({ row }) => <div className="text-left">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "End Date",
      cell: ({ row }) => {
          const value = row.getValue("createdAt");
          
          if (!value || 
              (typeof value !== 'string' && 
               typeof value !== 'number' && 
               !(value instanceof Date))) {
              return <div className='text-left'>Not Yet Added</div>;
          }
          
          const date = new Date(value);
          
          if (isNaN(date.getTime())) {
              return <div className='text-left'>Invalid Date</div>;
          }
          
          const options: Intl.DateTimeFormatOptions = { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
          };
          const formattedDate = date.toLocaleDateString(undefined, options);
          return <div className='text-left'>{formattedDate}</div>;
      }
    },
    {
      header: "Update",
      cell: ({ row }) => {
        const faculty = row.original;
        return (
          <Button variant="outline" size={"sm"} className="w-full" onClick={() => handleUpdateClick(faculty)}>
            Update
          </Button>
        );
      }
    },
  ]

  return (
    <div className="rounded-md border">
      <DashboardTable columns={columns} data={facultyData} />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Update Academic Faculty</SheetTitle>
          </SheetHeader>
          <Form {...updateForm}>
            <form onSubmit={updateForm.handleSubmit(handleUpdateSubmit)} className="space-y-6 mt-4 p-5">
              <FormField control={updateForm.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ''} placeholder="Enter Faculty Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="pt-4 flex gap-2">
                <Button type="submit" variant={"outline"} className="w-full h-10 text-sm font-medium" disabled={updateForm.formState.isSubmitting}>
                  {updateForm.formState.isSubmitting ? 'Updating...' : 'Update'}
                </Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default AFaculty