"use client"

import { ModeToggle } from "@/app/utils/mode-toggle"
import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { logout } from "@/services/AuthServices"
import { useUser } from "@/context/UserContext"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const { setUser } = useUser();
  const router = useRouter();
  
  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push("/");
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-5">
          <Button variant={"outline"} onClick={() => handleLogout()}>Logout</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
