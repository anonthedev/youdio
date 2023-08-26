'use client'

import { useAudioURL } from "@/zustand/state"
import { useEffect, useRef } from "react"

export default function Player() {
    const { GlobalAudioURL, skipTo, updateDuration, duration } = useAudioURL((state: any) => state)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioRef.current!.currentTime = skipTo
    }, [skipTo, GlobalAudioURL])

    useEffect(() => {
        updateDuration(Math.floor(audioRef.current!.duration))
    }, [GlobalAudioURL, updateDuration])


    return (
        <div className="w-screen">
            <audio ref={audioRef} className="w-full rounded-none" src={GlobalAudioURL} controls></audio>
        </div>
    )
}
