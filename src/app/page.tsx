"use client"

import { useEffect } from "react";;
import { supabase } from '../../supabase';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabase.auth.refreshSession()

      if (data.user) {
        if (data.user?.role === "authenticated") {
          router.replace("/dashboard")
        }
      }
    }

    getUserData()
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-white">
      youdio (Landing Page in progress.)
      <Link className="px-4 py-2 rounded-lg bg-[#121212]" href={"/signIn"}>Sign In</Link>
    </main>
  )
}
