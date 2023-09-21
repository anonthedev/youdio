'use client'

import { useUserDetails } from "@/zustand/state"
import { useEffect } from "react"

export default function LibraryPreview() {
    const userDetails = useUserDetails((state: any) => state.userDetails)

//    useEffect(()=>{
//     console.log(userDetails)
//    })

    return (
        <section className="flex items-center h-full w-full justify-center">
            <div className="">
                <span className="text-center font-semibold ">Work in progress 🫣🫣🫣</span>
                {/* <p>{userDetails.email}</p> */}
            </div>
        </section>
    )
}
