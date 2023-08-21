import { useUserDetails } from "@/zustand/state"
import { useEffect, useState } from "react"
import { supabase } from "../../../supabase"
import { useAllYoudios, useAudioURL } from "@/zustand/state"
import { FaPlay } from "react-icons/fa"
import useConverter from "@/hooks/useConverter"
import useGetYoudios from "@/hooks/useGetYoudios"

export default function SomeYoudios() {
    const userDetails = useUserDetails((state: any) => state.userDetails)
    const { allYoudios } = useAllYoudios((state: any) => state)
    const { updateAudioURL } = useAudioURL((state: any) => state)
    const { audioURL, convert } = useConverter()
    const { getYoudios } = useGetYoudios()

    useEffect(() => {
        updateAudioURL(audioURL)
    }, [audioURL])

    useEffect(() => {
        if (userDetails) {
            getYoudios()
        }
    }, [userDetails])

    return (
        <section className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Your Youdios</h2>
            <div className="flex flex-col gap-3">
                {allYoudios ? allYoudios.map((youdio: any) => (
                    <div onClick={() => { convert(`https://youtube.com/watch?v=${youdio.youdio.youdio_id}`) }} key={youdio.youdio.youdio_id} className="flex flex-row gap-3 items-center cursor-pointer">
                        <FaPlay />
                        <div>
                            <p className="text-gray-200 font-medium">{youdio.youdio.title}</p>
                            <p className="text-sm text-gray-500">{youdio.youdio.channelName}</p>
                        </div>
                    </div>
                )) : ""}
            </div>
        </section>
    )
}
