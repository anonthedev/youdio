"use client"

import { useAllYoudios } from "@/zustand/state"
import { supabase } from "../../supabase"
import { useUserDetails } from "@/zustand/state"

export default function useGetYoudios() {
    // const [audioURL, setAudioURL] = useState()
    const { updateAllYoudios } = useAllYoudios((state: any) => state)
    const { userDetails } = useUserDetails((state: any) => state)

    async function getYoudios() {
        let { data: youdio_data, error } = await supabase
            .from('youdio_data')
            .select('youdio, id')
            .eq('email', userDetails.email)

        if (youdio_data) {
            updateAllYoudios(youdio_data)
        }
    }

    return { getYoudios }
}
