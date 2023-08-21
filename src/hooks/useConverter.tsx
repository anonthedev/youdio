"use client"

import { useState } from "react"
import { useAudioURL } from "@/zustand/state"

export default function useConverter() {
    const [audioURL, setAudioURL] = useState()
    const updateSkipTo = useAudioURL((state: any) => state.updateSkipTo)

    async function convert(URL: string) {
        if (URL !== undefined) {
            await fetch(`/api/converter?url=${URL}`)
                .then((data) => data.json())
                .then((resp) => {
                    setAudioURL(resp)
                    // console.log(resp)
                }).then(() => {
                    if (URL.includes("&t=")) {
                        updateSkipTo(URL.slice(URL.indexOf("&t=")).slice(3).slice(0, -1))
                    } else {
                        updateSkipTo(0)
                    }
                })
                .catch((err) => { console.log(err) })
        }
    }

    return { audioURL, convert }
}
