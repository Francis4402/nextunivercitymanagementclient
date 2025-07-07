"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Link from "next/link";



export default function Home() {

  const {user} = useUser();


  return (
    <div>
      {!user ? (
        
        <div className="flex gap-4 items-center justify-center py-10">
        <Link href="/login">
          <Button>Login</Button>
        </Link>

        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
      ) : <div><Link href={"/dashboard"}>
      <Button>{user?.role}</Button>
    </Link></div>}
    </div>
  );
}
