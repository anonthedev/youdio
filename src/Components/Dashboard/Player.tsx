'use client'

import { useAudioURL } from "@/zustand/state"
import { useEffect, useRef } from "react"

export default function Player() {
    const { globalAudioURL, skipTo, updateDuration, duration } = useAudioURL((state: any) => state)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    
    // useEffect(() => {
    //     audioRef.current!.currentTime = skipTo
    // }, [skipTo, globalAudioURL])

    useEffect(() => {
        updateDuration(Math.floor(audioRef.current!.duration))
    }, [globalAudioURL, updateDuration])


    return (
        <div className="w-screen">
            <audio autoPlay ref={audioRef} className="w-full rounded-none" src={globalAudioURL} controls></audio>
        </div>
    )
}
