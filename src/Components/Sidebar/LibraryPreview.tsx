'use client'

import { useUserDetails } from "@/zustand/state"
import { useEffect } from "react"

export default function LibraryPreview() {
    const userDetails = useUserDetails((state: any) => state.userDetails)

//    useEffect(()=>{
//     console.log(userDetails)
//    })

    return (
        <section>
            <div>
                <span>Work in progress 🫣🫣🫣</span>
                {/* <p>{userDetails.email}</p> */}
            </div>
        </section>
    )
}
