import { useState } from "react"

export default function useConverter() {
    const [audioURL, setAudioURL] = useState()

    async function convert(URL:string) {
        if (URL !== undefined) {
            await fetch(`/api/converter?url=${URL}`)
                .then((data) => data.json())
                .then((resp) => {
                    setAudioURL(resp)
                    // console.log(resp)
                })
                .catch((err) => { console.log(err) })
        }
    }

    return { audioURL, convert }
}
