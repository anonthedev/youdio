'use client'

import { useEffect, useState } from "react";;
import { supabase } from '../../../supabase';
import Converter from "./Converter";
import { useUserDetails, useAudioURL } from "@/zustand/state";
import SomeYoudios from "./SomeYoudios";
import SignOut from "../SignOut";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    // const [userData, setUserData] = useState<any>()
    const { updateUserDetails } = useUserDetails((state: any) => state)

    const router = useRouter()

    useEffect(() => {
        async function getUserData() {
            const { data, error } = await supabase.auth.refreshSession();
            if (data.user) {
                updateUserDetails(data.user);
            } else {
                // console.log("X")
                router.replace("/signIn")
            }
        }

        getUserData()
    }, [])

    // console.log(userDetails)

    return (
        <section className="bg-[#121212] p-4 rounded-lg flex flex-col gap-8 overflow-y-auto">
            <div className="self-end">
                <SignOut />
            </div>
            <Converter />
            <SomeYoudios />
            
        </section>
    )
}
