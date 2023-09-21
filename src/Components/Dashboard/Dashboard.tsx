'use client'

import { useEffect, useState } from "react";;
import { supabase } from '../../../supabase';
import Converter from "./Converter";
import { useUserDetails } from "@/zustand/state";
import SomeYoudios from "./SomeYoudios";
import SignOut from "../SignOut";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "../Loader";
import SearchVideos from "./SearchVideos";
import BuyMeACoffee from "../BuyMeACoffee";
import Script from "next/script";

export default function Dashboard() {
    const { updateUserDetails } = useUserDetails((state: any) => state)
    const [signedIn, setSignedIn] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>()

    // const router = useRouter()

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
            <section className="bg-[#121212] p-4 rounded-lg flex flex-col gap-8 h-full mb-2 lg:h-fit">
                <div className="flex flex-row justify-between items-center">
                    <a href="https://www.buymeacoffee.com/anonthedev" target="_blank">
                        <Image
                            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                            alt="Buy Me A Coffee"
                            width={145}
                            height={30}
                        />
                    </a>
                    {/* <BuyMeACoffee/> */}
                    <div className="self-end">
                        <SignOut />
                    </div>
                </div>
                <div className="flex flex-col gap-8 overflow-y-auto lg:overflow-y-hidden lg:mb-28">
                    <SearchVideos />
                    <span>OR</span>
                    <Converter />
                    <SomeYoudios />
                </div>

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
