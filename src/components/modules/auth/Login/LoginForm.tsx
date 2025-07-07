"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "./loginValidation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/services/AuthServices"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser } from "@/context/UserContext"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {formState: { isSubmitting }} = form;

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const { refreshUser } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);

      if (res?.success) {
        toast.success(res?.message);
        await refreshUser();
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/dashboard");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField control={form.control} name="id" render={({field}) => (
                    <FormItem>
                      <FormLabel>Id</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} value={field.value || ""} placeholder="00001" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid gap-3">
                <FormField control={form.control} name="password" render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} value={field.value || ""} placeholder="456123" />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )} />
                </div>
                <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    { isSubmitting ? "Logging in..." : "Login" }
                  </Button>
                  <Button variant="outline" className="w-full" disabled={isSubmitting}>
                    Login with Google
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
} 