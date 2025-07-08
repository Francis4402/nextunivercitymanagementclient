import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { useForm } from 'react-hook-form'

const CreateStudentForm = () => {

    const form = useForm();


    const {formState: { isSubmitting }} = form;

    const onSubmit = async () => {
        
    }

  return (
    <Card className="shadow-lg border-0 w-full">
        <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-bold text-center">Create Academic Department</CardTitle>
        </CardHeader>
        <CardContent className='sm:w-1/2 w-full mx-auto'>
            <Form {...form}>
                <form className="space-y-10 w-full">
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

export default CreateStudentForm