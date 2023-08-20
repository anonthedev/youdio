'use client'

import { useEffect, useState } from "react";;
import { supabase } from '../../../supabase';
import Converter from "./Converter";

export default function Dashboard() {
    const [userData, setUserData] = useState<any>()

    useEffect(() => {
        async function getUserData() {
            const { data } = await supabase.auth.refreshSession()

            setUserData(data.user)
        }

        getUserData()
    }, [])

    // useEffect(() => {
    //     async function addUserToDB() {
    //         if (userData) {
    //             if (userData.aud === "authenticated") {
                    
    //             }

    //         }
    //     }

    //     addUserToDB()
    // }, [userData])

    return (
        <Converter />
    )
}
