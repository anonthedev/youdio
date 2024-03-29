'use client'

import useConverter from "@/hooks/useConverter"
import { useEffect, useState } from "react"
// import { supabase } from "../../../supabase"
import { useAudioURL, useUserDetails, useAllYoudios } from "@/zustand/state"
import useGetYoudios from "@/hooks/useGetYoudios"
import Toast from "../Toast"
import useAddYoudio from "@/hooks/useAddYoudio"

export default function Converter() {
    const [videoURL, setVideoURL] = useState<string>("")
    const [youdioExists, setYoudioExists] = useState<boolean>(false)
    const { convert } = useConverter()
    const { userDetails } = useUserDetails((state: any) => state)
    const { allYoudios } = useAllYoudios((state: any) => state)
    // const { duration } = useAudioURL((state: any) => state)
    const { getYoudios } = useGetYoudios()
    const [converted, setConverted] = useState<boolean | null>()
    const [converting, setConverting] = useState<boolean>(false)
    const { addYoudio } = useAddYoudio()

    // useEffect(() => {
    //     updateAudioURL(audioURL)
    // }, [audioURL])

    // useEffect(() => {
    //     console.log(duration)
    // })

    useEffect(() => {
        // console.log(allYoudios)
        const timer = setTimeout(() => {
            setConverted(null)
        }, 5000)
        return () => {
            clearTimeout(timer); // This will clear the timeout when the effect is cleaned up
        };
    })

    async function handleClick() {
        setConverting(true)

        const videoId = videoURL.includes("?v=") ? videoURL.slice(videoURL.indexOf("?v=")).slice(3, 14) : videoURL.slice(videoURL.indexOf("youtu.be/")).slice(9, 20)

        const tempIDArray: string[] = []

        allYoudios.forEach((youdio: any) => {
            tempIDArray.push(youdio.youdio.youdio_id)
        })
        if (tempIDArray.includes(videoId)) {
            setYoudioExists(true)
            setConverting(false)
        } else {
            fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(videoURL)}&format=json`)
                .then((data) => data.json())
                .then((resp) => {
                    console.log(resp)
                    return {
                        channelName: resp.author_name,
                        title: resp.title,
                        thumbnail: resp.thumbnail_url,
                        videoURL: videoURL
                    }
                })
                .then((videoInfo) => {
                    // console.log(videoInfo)
                    convert(videoInfo.videoURL)
                        .then(() => {
                            const added = addYoudio(videoInfo)
                            return added
                        })
                        .then((added) => {
                            if (added) {
                                getYoudios()
                                setConverting(false)
                                setConverted(true)
                            } else {
                                setConverting(false)
                                setConverted(false)
                            }
                        })
                        .catch((err) => {
                            setConverting(false)
                            setConverted(false)
                        })
                })
                .catch((err) => {
                    setConverting(false)
                    setConverted(false)
                    console.log(err)
                })
        }
    }

    return (
        <section className="w-100 flex flex-col gap-5 font-golos">
            <h2 className="text-2xl font-semibold">Convert your videos directly</h2>
            <div className="w-full flex flex-row gap-2 md:flex-col">
                <input className="text-black bg-white w-1/2 md:w-full p-4 rounded-md" placeholder="Enter YouTube video URL" type="text" name="" id="" onChange={(e) => { setVideoURL(e.target.value) }} />

                <button disabled={converting} className={`bg-white text-black font-semibold p-4 rounded-md md:w-1/3 ${converting ? "opacity-50" : "opacity-100"}`} onClick={handleClick}>{converting ? "Converting..." : "Convert"}</button>
            </div>
            {converted ? <Toast toast="Conversion successful, youdio added" type="success" /> : converted === false ? <Toast toast="Couldn't convert item, Please try again." type="error" /> : null}
            {youdioExists ? <Toast toast="Youdio already exists." type="error" /> : null}
        </section>
    )
}
