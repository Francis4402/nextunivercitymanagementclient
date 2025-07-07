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
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { useLoginMutation } from "@/redux/features/auth/authApi"
import { useAppDispatch } from "@/redux/hooks"
import { setUser } from "@/redux/features/auth/authSlice"
import { verifyToken } from "@/app/utils/verifyToken"



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {formState: { isSubmitting }} = form;

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");


  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    try {

      const userInfo = {
        id: formData.id,
        password: formData.password
      }

      const result = await login(userInfo).unwrap();

      if (result.data.success) {
        toast.success("Login successful");

        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/dashboard");
        }
      } 

      const user = verifyToken(result.data.accessToken);

      dispatch(setUser({user: user, token: result.data.accessToken}));

    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
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
                  <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
                    { isLoading ? "Logging in..." : "Login" }
                  </Button>
                  <Button variant="outline" className="w-full">
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