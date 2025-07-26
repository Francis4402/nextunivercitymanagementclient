
"use client"

import React, { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { DashboardTable } from '../../utils/table'
import { IAdepartment } from '@/types/adepartmenttype'
import { ADepartmentValidationSchema } from '../../utils/VSchemas/ADepartmentValidation'
import { getAllDepartments, updateDepartments } from '@/services/ADepartment'


const ADepartment = () => {

  const [department, setdepartment] = useState<IAdepartment[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IAdepartment | null>(null);

  // Update form
  const updateForm = useForm({
    resolver: zodResolver(ADepartmentValidationSchema)
  });

  useEffect(() => {
    getAllDepartments().then((department) => {
      setdepartment(department.data);
    })
  }, []);

  useEffect(() => {
    if (selected) {
      updateForm.reset({ name: selected.name });
    }
  }, [selected, updateForm]);

  const handleUpdateClick = (data: IAdepartment) => {
    setSelected(data);
    setOpen(true);
  };

  const handleUpdateSubmit = async (data: IAdepartment) => {
    if (!selected) return;
  
    try {
      await updateDepartments({ name: data.name }, selected._id!);
  
      const updatedFaculties = await getAllDepartments();
      setdepartment(updatedFaculties.data);
      
      toast.success("updated successfully");
      
      setOpen(false);
      updateForm.reset();
      setSelected(null);
    } catch (error) {
      console.error("Update failed", error);
    }
  };


  const columns: ColumnDef<IAdepartment>[] = [
    {
      accessorKey: "name",
      header: "Semester Name",
      cell: ({ row }) => <div className="text-left">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "academicFaculty",
      header: "Academic Faculty",
      cell: ({ row }) => {
        const faculty = row.original.academicFaculty;
        return (
          <div className="text-left">
            {typeof faculty === 'string' ? faculty : faculty?.name}
          </div>
        );
      },
    },
    {
      header: "Update",
      cell: ({ row }) => {
        const department = row.original;
        return (
          <Button 
            variant="outline" 
            size={"sm"} 
            className="w-full" 
            onClick={() => handleUpdateClick(department)}
          >
            Update
          </Button>
        );
      }
    }
  ]

  return (
    <div className="rounded-md border">
      <DashboardTable columns={columns} data={department} />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Update Academic Department</SheetTitle>
          </SheetHeader>
          <Form {...updateForm}>
            <form onSubmit={updateForm.handleSubmit(handleUpdateSubmit)} className="space-y-6 mt-4 p-5">
              <FormField control={updateForm.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ''} placeholder="Enter Department Name" />
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

export default ADepartment