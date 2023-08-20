'use client'

import useAudioURL from "@/hooks/useAudioURL"

export default function Player() {
    const audioURL = useAudioURL((state: any) => state.audioURL)

    return (
        <div className="w-screen">
            <audio className="w-full rounded-none" src={audioURL} controls></audio>
        </div>
    )
}
