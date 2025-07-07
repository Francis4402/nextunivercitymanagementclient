"use client"

import { BookOpenCheck, LayoutDashboard, PanelsTopLeft } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { NavMain } from "./nav-main"
import { NavRoutes } from "./nav-routes"




export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {


    const navRoutes = [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
          isActive: true,
        },
      ];

    const navMain = [
    {
        title: "Academic Management",
        url: "#",
        icon: BookOpenCheck,
        items: [
            {
              title: "Create A. Semester",
              url: "/dashboard/create-a-semester",
            },
            {
              title: "Academic Semester",
              url: "/dashboard/academic-semester",
            },
            {
              title: "Create A. Faculty",
              url: "/dashboard/create-a-faculty",
            },
            {
              title: "Academic Faculty",
              url: "/dashboard/academic-faculty",
            },
            {
              title: "Create A. Department",
              url: "/dashboard/create-a-department",
            },
            {
              title: "Academic Department",
              url: "/dashboard/academic-department",
            },
        ]
    },
    {
      title: "User Management",
      url: "#",
      icon: PanelsTopLeft,
      items: [
        {
          title: "Faculty",
          url: "/dashboard/create-faculty",
        },
        {
          title: "Student",
          url: "/dashboard/create-student",
        },
        {
          title: "Admin",
          url: "/dashboard/create-admin",
        }
      ],
    }
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size={"lg"} asChild>
                    <Link href={"/"}>
                        <div className="flex items-center justify-center gap-4">
                            <Image src={"/vercel.svg"} alt="Next.js logo" width={30} height={30} />

                            <h2 className="font-bold text-base">Univercity Managment</h2>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavRoutes items={navRoutes} />
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>

      </SidebarFooter>

      <SidebarRail/>
    </Sidebar>
  )
}