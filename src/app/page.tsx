"use client"

import { useEffect } from "react";;
import { supabase } from '../../supabase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabase.auth.refreshSession()

      if (data.user) {
        if (data.user?.role === "authenticated") {
          router.replace("/dashboard")
        } else if (data.user?.role === "unauthenticated") {
          router.replace("/signIn")
        }
      } else {
        router.replace("/signIn")
      }
    }

    getUserData()
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      youdio (Landing Page in progress.)
    </main>
  )
}
