import { useUserDetails } from "@/zustand/state"
import { useEffect, useState } from "react"
import { supabase } from "../../../supabase"
import { useAllYoudios, useAudioURL } from "@/zustand/state"
import { FaPlay } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import useConverter from "@/hooks/useConverter"
import useGetYoudios from "@/hooks/useGetYoudios"
import Toast from "../Toast"
// import { UUID } from "crypto"

export default function SomeYoudios() {
    const userDetails = useUserDetails((state: any) => state.userDetails)
    const { allYoudios } = useAllYoudios((state: any) => state)
    const { updateAudioURL } = useAudioURL((state: any) => state)
    const { audioURL, convert } = useConverter()
    const { getYoudios } = useGetYoudios()
    const [itemDeleted, setItemDeleted] = useState<boolean | null>()
    // const [ itemNotDeleted, setItemNotDeleted] = useState()
    useEffect(() => {
        updateAudioURL(audioURL)
    }, [audioURL])

    useEffect(() => {
        if (userDetails) {
            getYoudios()
        }
    }, [userDetails])

    // console.log(allYoudios)

    useEffect(() => {
        const timer = setTimeout(() => {
            setItemDeleted(null)
        }, 5000)
        return () => {
            clearTimeout(timer); // This will clear the timeout when the effect is cleaned up
        };
    })

    async function DeleteAYoudio(id: string) {
        const { error } = await supabase
            .from('user_data')
            .delete()
            .eq('id', `${id}`)
        if (!error) {
            getYoudios()
            setItemDeleted(true)
        }
        if (error) {
            setItemDeleted(false)
        }
    }

    return (
        <section className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Your Youdios</h2>
            <div className="flex flex-col gap-3">
                {allYoudios ? allYoudios.map((youdio: any) => (
                    <div onClick={() => { convert(`https://youtube.com/watch?v=${youdio.youdio.youdio_id}`) }} key={youdio.id} className="flex flex-row gap-3 items-center cursor-pointer">
                        <FaPlay />
                        <div>
                            <p className="text-gray-200 font-medium">{youdio.youdio.title}</p>
                            <p className="text-xs text-gray-500">{youdio.youdio.channelName}</p>
                        </div>
                        <button onClick={() => { DeleteAYoudio(youdio.id) }} className="ml-auto">
                            <MdDelete size={25} color="#c7020e" />
                        </button>
                    </div>
                )) : ""}
            </div>
            {itemDeleted ? <Toast toast="Item deleted successfully" toastBG="#20c997" /> : itemDeleted === false ? <Toast toast="Couldn't delete item, Please try again" toastBG="#e03131" /> : null}
        </section>
    )
}