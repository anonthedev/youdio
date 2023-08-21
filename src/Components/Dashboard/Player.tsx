'use client'

import { useAudioURL } from "@/zustand/state"
import { useEffect, useRef } from "react"

export default function Player() {
    const { audioURL, skipTo, updateDuration, duration } = useAudioURL((state: any) => state)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioRef.current!.currentTime = skipTo
    }, [skipTo, audioURL])

    useEffect(() => {
        updateDuration(Math.floor(audioRef.current!.duration))
    }, [audioURL, updateDuration])


    return (
        <div className="w-screen">
            <audio ref={audioRef} className="w-full rounded-none" src={audioURL} controls></audio>
        </div>
    )
}
