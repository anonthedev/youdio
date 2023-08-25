'use client'

import useConverter from "@/hooks/useConverter"
import { useEffect, useState } from "react"
import { supabase } from "../../../supabase"
import { useAudioURL, useUserDetails } from "@/zustand/state"
import useGetYoudios from "@/hooks/useGetYoudios"
import Toast from "../Toast"

export default function Converter() {
    const [videoURL, setVideoURL] = useState<string>("")

    const { convert } = useConverter()
    const { userDetails } = useUserDetails((state: any) => state)
    // const { duration } = useAudioURL((state: any) => state)
    const { getYoudios } = useGetYoudios()
    const [converted, setConverted] = useState<boolean | null>()

    // useEffect(() => {
    //     updateAudioURL(audioURL)
    // }, [audioURL])

    // useEffect(() => {
    //     console.log(duration)
    // })

    useEffect(() => {
        const timer = setTimeout(() => {
            setConverted(null)
        }, 5000)
        return () => {
            clearTimeout(timer); // This will clear the timeout when the effect is cleaned up
        };
    })

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
                    .catch((err) => { setConverted(false) })
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
            setConverted(true)
        } else {
            setConverted(false)
        }
    }

    return (
        <section className="w-100 flex flex-col gap-5">
            <h2 className="text-4xl font-bold">Convert your videos</h2>
            <div className="w-full flex flex-row gap-2">
                <input className="text-black bg-white w-1/2 p-4 rounded-md" placeholder="Enter YouTube video URL" type="text" name="" id="" onChange={(e) => { setVideoURL(e.target.value) }} />
                <button className="bg-white text-black font-semibold p-4 rounded-md" onClick={handleClick}>Convert</button>
            </div>
            {converted ? <Toast toast="Conversion successful, youdio added" toastBG="#20c997" /> : converted === false ? <Toast toast="Couldn't convert item, Please try again." toastBG="#e03131" /> : null}
        </section>
    )
}
