"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";
import { AlignRight, Book, LocateIcon, Mail, Phone } from "lucide-react";
import Link from "next/link";


export function Navbar() {
    
    const {user} = useUser();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div>
        <Card>
            <CardContent className="flex justify-between items-center">
                
                <CardTitle><Link href={"/"} className="flex items-center gap-2"><Book /> <span className="text-2xl">Edunity</span></Link></CardTitle>
                
                <div className="sm:flex items-center gap-6 hidden">
                    {
                        navLinks.map((link) => {
                            return (
                                <Link key={link.name} href={link.href}>
                                    <div className="font-medium hover:underline">{link.name}</div>
                                </Link>
                            )
                        })
                    }
                </div>


                <CardAction>
                    <Sheet>
                        <SheetTrigger asChild className="sm:hidden block">
                            <Button variant={"ghost"}><AlignRight size={20} /></Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle><span className="flex items-center gap-2"><Book /> <span className="text-2xl">Edunity</span></span></SheetTitle>
                            </SheetHeader>

                            <div className="grid gap-2 px-6">
                                {
                                    navLinks.map((link) => {
                                        return (
                                            <Link key={link.name} href={link.href}>
                                                <div className="font-medium hover:bg-gray-300 p-2 rounded-lg">{link.name}</div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            
                            <div className="grid gap-6 px-6 mt-10 auto-cols-min">
                                <h1 className="text-4xl">Get In Touch</h1>
                                <div className="flex items-center gap-5">
                                    <div className="p-4 rounded-full bg-blue-600 text-white">
                                        <Mail size={22} />
                                    </div>
                                    <span className="flex flex-col gap-2">
                                        <span>Email</span>
                                        <span className="text-lg">contact@edunity.com</span>
                                    </span>
                                </div>

                                <div className="flex items-center gap-5">
                                    <div className="p-4 rounded-full bg-blue-600 text-white">
                                        <Phone size={22} />
                                    </div>
                                    <span className="flex flex-col gap-2">
                                        <span>Phone</span>
                                        <span className="text-lg">(00)5611227890</span>
                                    </span>
                                </div>

                                <div className="flex items-center gap-5 auto-rows-min">
                                    <div className="p-4 rounded-full bg-blue-600 text-white">
                                        <LocateIcon size={22} />
                                    </div>
                                    <span className="flex flex-col gap-2">
                                        <span>Location</span>
                                        <span className="text-lg">238, Arimantab, Moska - USA.</span>
                                    </span>
                                </div>
                            </div>
                            
                            <SheetFooter>
                                {
                                    user ? <Link href="/dashboard">
                                        <Button className="w-full">Dashboard</Button>
                                    </Link> : <Link href="/login">
                                        <Button className="w-full">Login</Button>
                                    </Link>
                                }
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                    {
                        user ? <Link href="/dashboard" className="hidden sm:block">
                        <Button>Dashboard</Button>
                        </Link> : <Link href="/login" className="hidden sm:block">
                            <Button>Login</Button>
                        </Link>
                    }
                </CardAction>
            </CardContent>
        </Card>
    </div>
  );
}