'use client'

import useConverter from "@/hooks/useConverter"
import { useEffect, useState } from "react"
import { supabase } from "../../../supabase"
import useAudioURL from "@/hooks/useAudioURL"

export default function Converter() {
    const [URL, setURL] = useState<string>("")

    const { audioURL, convert } = useConverter()
    const updateAudioURL = useAudioURL((state: any) => state.updateAudioURL)
    // console.log(updateAudioURL)

    useEffect(() => {
        updateAudioURL(audioURL)
    }, [audioURL])

    // useEffect(() => {
    //     async function addYoudio() {
    //         const { data, error } = await supabase
    //             .from('user_data')
    //             .insert([
    //                 {
    //                     email: "opss59332@gmail.com",
    //                     youdio: audioURL,
    //                     Name: null
    //                 },
    //             ])
    //             .select("*")
    //         if (data) {
    //             console.log(data)
    //         } else {
    //             console.log(error)
    //         }
    //     }

    //     if (audioURL) {
    //         addYoudio()
    //     }
    // }, [audioURL])

    return (
        <section className="w-100">
            <div className="w-full flex flex-row gap-2">
                <input className="text-black bg-white w-1/2 p-4 rounded-md" placeholder="Enter YouTube video URL" type="text" name="" id="" onChange={(e) => { setURL(e.target.value) }} />
                <button className="bg-white text-black font-semibold p-4 rounded-md" onClick={() => { convert(URL) }}>Convert</button>
                {/* <audio src={audioURL} controls></audio> */}
                {/* <p className="text-white">{audioURL}</p> */}
            </div>
        </section>
    )
}
