import { AiOutlineClose } from "react-icons/ai"
import { useState } from "react"

export default function Toast(
    { toast, toastBG = "#339af0" }:
        { toast: string, toastBG: string }) {
    const [showToast, setShowToast] = useState<boolean>(true)

    return (
        <div className={`max-w-48 top-3 right-3 rounded-lg p-4 ${showToast ? "fixed" : "hidden"}`} style={{ backgroundColor: toastBG }}>
            <div className="flex flex-row gap-2 items-center">
                <span className="text-sm font-semibold">
                    &#9432; {toast}
                </span>
                <button onClick={() => {
                    if (showToast) {
                        setShowToast(false)
                    }
                }} className={``}><AiOutlineClose /></button>
            </div>
        </div>
    )
}
