"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AFacultyValidationSchema } from '../VSchemas/AFacultyValidation'
import { IAfaculty } from '@/types/afacultytype'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { createAcademicFaculty } from '@/services/AFaculty'



const AFacultyForm = () => {

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(AFacultyValidationSchema)
    })

    const {formState: { isSubmitting }} = form;

    const onSubmit = async (facultyData: IAfaculty) => {
        try {
            const res = await createAcademicFaculty(facultyData);

            if (res?.success) {
                toast.success(res?.message);
                router.push("/dashboard/academic-faculty");
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
            <CardTitle className="text-xl font-bold text-center">Create Academic Faculty</CardTitle>
        </CardHeader>
        <CardContent className='sm:w-1/2 w-full mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full">
                    <FormField control={form.control} name='name' render={({field}) => (
                        <FormItem>
                            <FormLabel>Faculty Name</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} value={field.value || ""} placeholder='Enter Faculty Name' />
                            </FormControl>
                            <FormMessage/>
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

export default AFacultyForm