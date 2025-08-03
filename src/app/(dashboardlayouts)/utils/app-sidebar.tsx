"use client"

import { BookMarked, BookOpen, BookOpenCheck, Boxes, LayoutDashboard, LucideFileChartColumnIncreasing, PanelsTopLeft, User2, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavRoutes } from "./nav-routes"
import { useUser } from "@/context/UserContext"
import { TeamSwitcher } from "./team-switcher"





export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {

    const {user} = useUser();


    const navRoutes = [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        isActive: true,
      },
      ...(user?.role === "superAdmin" || user?.role == "admin" ? [
        {
          title: "Admins",
          url: "/admins",
          icon: User2,
          isActive: false,
        },
        {
          title: "Students",
          url: "/students",
          icon: Users,
          isActive: false,
        },
        {
          title: "Faculties",
          url: "/faculties",
          icon: Boxes,
          isActive: false,
        }
      ]: []),
        ...(user?.role === "student" ? [
          {
            title: "Offered Courses",
            url: "/offered-courses",
            icon: BookOpenCheck,
            isActive: false,
          }
        ]: []),
    ];

    const navMain = [
    {
        title: "Academic Management",
        url: "#",
        icon: BookOpenCheck,
        items: [
            {
              title: "Create A. Semester",
              url: "/create-a-semester",
            },
            {
              title: "Academic Semester",
              url: "/academic-semester",
            },
            {
              title: "Create A. Faculty",
              url: "/create-a-faculty",
            },
            {
              title: "Academic Faculty",
              url: "/academic-faculty",
            },
            {
              title: "Create A. Department",
              url: "/create-a-department",
            },
            {
              title: "Academic Department",
              url: "/academic-department",
            },
        ]
    },
    {
      title: "User Management",
      url: "#",
      icon: PanelsTopLeft,
      items: [
        {
          title: "Create Faculty",
          url: "/create-faculty",
        },
        {
          title: "Create Student",
          url: "/create-student",
        },
        ...(user?.role === "superAdmin"
          ? [{
            title: "Create Admin",
            url: "/create-admin",
          },]
          : []),
      ],
    },
    {
      title: "Semester Management",
      url: "#",
      icon: BookMarked,
      items: [
        {
          title: "Semester Registration",
          url: "/semester-registration",
        },
        {
          title: "Semesters",
          url: "/semesters",
        }
      ]
    },
    {
      title: "Course Management",
      url: "#",
      icon: LucideFileChartColumnIncreasing,
      items: [
        {
          title: "Create Course",
          url: "/create-course"
        },
        {
          title: "All Courses",
          url: "/all-courses"
        }
      ]
    },
    {
      title: "Offered Courses",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Create Offered Course",
          url: "/create-offered-courses",
        },
      ]
    }
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <NavRoutes items={navRoutes} />
        {
          user?.role === "superAdmin" || user?.role === "admin" ? <NavMain items={navMain} /> : null
        }
      </SidebarContent>

      <SidebarFooter>
      </SidebarFooter>

      <SidebarRail/>
    </Sidebar>
  )
}