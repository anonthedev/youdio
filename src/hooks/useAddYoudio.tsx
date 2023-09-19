"use client"

import useConverter from "@/hooks/useConverter"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import { useAudioURL, useUserDetails, useAllYoudios } from "@/zustand/state"

export default function useAddYoudio() {
    const { userDetails } = useUserDetails((state: any) => state)

    async function addYoudio(videoInfo: any) {
        const videoId = videoInfo.videoURL.includes("?v=") ? videoInfo.videoURL.slice(videoInfo.videoURL.indexOf("?v=")).slice(3, 14) : videoInfo.videoURL.slice(videoInfo.videoURL.indexOf("youtu.be/")).slice(9, 20)

        const { data, error } = await supabase
            .from('youdio_data')
            .insert(
                {
                    email: userDetails.email,
                    youdio: {
                        youdio_id: videoId,
                        channelName: videoInfo.channelName,
                        title: videoInfo.title
                    },
                    Name: null
                }
            )
            .select()
        if (data) {
            return true
        } else if (error) {
            return false
        }
    }
    return { addYoudio }
}