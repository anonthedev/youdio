"use client"

import { useEffect } from "react";;
import { supabase } from '../../supabase';
import { useRouter } from 'next/navigation';
// import Link from "next/link";
import LandingPage from "@/Components/LandingPage/LandingPage";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabase.auth.refreshSession()

      if (data.user) {
        // console.log(data)
        if (data.user?.role === "authenticated") {
          router.replace("/dashboard")
        }
      } else if (error) {
        console.log(error) 
      }
    }

    getUserData()
  }, []);

  return (
    <main className="">
      {/* youdio (Landing Page in progress.)
      <Link className="px-4 py-2 rounded-lg bg-[#121212]" href={"/signIn"}>Sign In</Link> */}
      <LandingPage/>
    </main>
  )
}
