"use client"

import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { changePassword, logout } from '@/services/AuthServices'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ChangePasswordValidation, changePasswordValidationSchema } from './Validations'
import { useRouter } from "next/navigation"


interface ChangePFormProps {
    className?: string;
  }

const ChangedPasswordForm = ({className,
    ...props}: ChangePFormProps) => {

        const router = useRouter();

    const form = useForm({
        resolver: zodResolver(changePasswordValidationSchema)
    });

    const { formState: { isSubmitting }} = form;

    const onSubmit: SubmitHandler<ChangePasswordValidation> = async (data) => {
        try {
            const res = await changePassword(data);

            if (res?.success) {
                toast.success(res?.message);
                await logout();
                router.push("/login");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Change Your Password</h1>
            </div>
            
            <FormField control={form.control} name="oldPassword" render={({field}) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value || ""} placeholder="00001" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
            <FormField control={form.control} name="newPassword" render={({field}) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} value={field.value || ""} placeholder="456123" />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )} />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              { isSubmitting ? "submitting..." : "submit" }
            </Button>
          </form>
      </Form>
      </CardContent>
    </Card>
  )
}

export default ChangedPasswordForm