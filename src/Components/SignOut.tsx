"use client"

import { supabase } from "../../supabase"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Toast from "./Toast"

export default function SignOut() {
    const [signOutFail, setSignOutFail] = useState<boolean>()

    const router = useRouter()
    async function handleSignOut() {
        let { error } = await supabase.auth.signOut()
        if (!error) {
            router.replace("/")
        } else {
            setSignOutFail(true)
        }
    }

    return (
        <>
        <button className="rounded-md bg-black text-white font-semibold px-3 py-2" onClick={handleSignOut}>Sign out</button>
        <Toast toast="Sign out failed, Please try again!" type="error" />
        </>
    )
}
