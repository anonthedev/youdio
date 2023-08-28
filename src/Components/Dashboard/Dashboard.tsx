'use client'

import { useEffect, useState } from "react";;
import { supabase } from '../../../supabase';
import Converter from "./Converter";
import { useUserDetails, useAudioURL } from "@/zustand/state";
import SomeYoudios from "./SomeYoudios";
import SignOut from "../SignOut";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "../Loader";

export default function Dashboard() {
    // const [userData, setUserData] = useState<any>()
    const { updateUserDetails } = useUserDetails((state: any) => state)
    const [signedIn, setSignedIn] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>()

    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        async function getUserData() {
            const { data, error } = await supabase.auth.refreshSession()
            if (data.user) {
                setSignedIn(true)
                updateUserDetails(data.user);
            } else if (error) {
                // console.log(error)
                // console.log("X")
                // router.replace("/signIn")
                setSignedIn(false)
            }
        }

        getUserData().then(() => { setLoading(false) })
    }, [])

    if (signedIn) {
        return (
            <section className="bg-[#121212] p-4 rounded-lg flex flex-col gap-8 h-full mb-2">
                <div className="self-end">
                    <SignOut />
                </div>
                <Converter />
                <SomeYoudios />

            </section>
        )
    } else if (signedIn === false) {
        return (
            <section className="w-full h-full bg-black flex flex-col items-center justify-center gap-2">
                Please Sign In first
                <Link className="px-4 py-2 rounded-lg bg-[#121212]" href={"/signIn"}>Sign In</Link>
            </section>
        )
    } else if (loading) {
        <div className="w-full h-full items-start justify-center">
            <Loader />
        </div>
    }
}
