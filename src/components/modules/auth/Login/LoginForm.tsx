"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent
} from "@/components/ui/card"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "./loginValidation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/services/AuthServices"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"

interface LoginFormProps {
  className?: string;
}

export function LoginForm({
  className,
  ...props
}: LoginFormProps) {

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {formState: { isSubmitting }} = form;

  const router = useRouter();
  const { refreshUser } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);

      if (res?.success) {
        toast.success(res?.message);
        await refreshUser();

        router.push("/");
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
              <h1 className="text-2xl font-bold">Login to your account</h1>
            </div>
            
            <FormField control={form.control} name="id" render={({field}) => (
                <FormItem>
                  <FormLabel>Id</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} placeholder="00001" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField control={form.control} name="password" render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} value={field.value || ""} placeholder="456123" />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )} />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              { isSubmitting ? "Logging in..." : "Login" }
            </Button>
          </form>
      </Form>
      </CardContent>
    </Card>
  )
} 