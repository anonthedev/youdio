'use client'

import useConverter from "@/hooks/useConverter"
import { useEffect, useState } from "react"
import { supabase } from "../../../supabase"
import { useAudioURL, useUserDetails } from "@/zustand/state"
import useGetYoudios from "@/hooks/useGetYoudios"

export default function Converter() {
    const [videoURL, setVideoURL] = useState<string>("")

    const { audioURL, convert } = useConverter()
    const updateAudioURL = useAudioURL((state: any) => state.updateAudioURL)
    const { userDetails } = useUserDetails((state: any) => state)
    const { duration } = useAudioURL((state: any) => state)
    const { getYoudios } = useGetYoudios()

    // useEffect(() => {
    //     updateAudioURL(audioURL)
    // }, [audioURL])

    // useEffect(() => {
    //     console.log(duration)
    // })

    async function handleClick() {
        fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(videoURL)}&format=json`)
            .then((data) => data.json())
            .then((resp) => {
                console.log(resp)
                return {
                    channelName: resp.author_name,
                    title: resp.title,
                    thumbnail: resp.thumbnail_url
                }
            })
            .then((videoInfo) => {
                // console.log(videoInfo)
                convert(videoURL)
                    .then(() => {
                        addYoudio(videoInfo)
                    })
                    .catch((err) => { console.log(err) })
            })
            .catch((err) => { console.log(err) })
    }

    async function addYoudio(videoInfo: any) {
        const { data, error } = await supabase
            .from('user_data')
            .insert(
                {
                    email: userDetails.email,
                    youdio: {
                        youdio_id: videoURL.slice(videoURL.indexOf("?v=")).slice(3),
                        channelName: videoInfo.channelName,
                        title: videoInfo.title
                    },
                    Name: null
                }
            )
            .select()
        if (data) {
            getYoudios()
            // console.log(data)
        } else {
            console.log(error)
        }
    }

    return (
        <section className="w-100 flex flex-col gap-5">
            <h2 className="text-4xl font-bold">Convert your videos</h2>
            <div className="w-full flex flex-row gap-2">
                <input className="text-black bg-white w-1/2 p-4 rounded-md" placeholder="Enter YouTube video URL" type="text" name="" id="" onChange={(e) => { setVideoURL(e.target.value) }} />
                <button className="bg-white text-black font-semibold p-4 rounded-md" onClick={handleClick}>Convert</button>
            </div>
        </section>
    )
}
