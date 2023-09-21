import { useState, useEffect } from "react"
import axios from "axios"
import { SiConvertio } from "react-icons/si"
import { useAllYoudios, useSearch, useAudioURL } from "@/zustand/state"
import useAddYoudio from "@/hooks/useAddYoudio"
import useGetYoudios from "@/hooks/useGetYoudios"
import Toast from "../Toast"
import useConverter from "@/hooks/useConverter"
import { FaChevronDown, FaPlay } from "react-icons/fa"

export default function SearchVideos() {
    const [searching, setSearching] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [converted, setConverted] = useState<boolean | null>()
    const [converting, setConverting] = useState<boolean>(false)
    const [youdioExists, setYoudioExists] = useState<boolean>(false)
    const [collaspeResults, setCollaspeResults] = useState<boolean>(false)

    const { updateSearchResults, searchResults } = useSearch((state: any) => state)
    const { GlobalAudioURL, updateGlobalAudioURL } = useAudioURL((state: any) => state)
    const { audioURL, convert } = useConverter()
    const { allYoudios } = useAllYoudios((state: any) => state)
    const { getYoudios } = useGetYoudios()
    const { addYoudio } = useAddYoudio()

    useEffect(() => {
        updateGlobalAudioURL(audioURL)
    }, [audioURL])

    async function handleClick() {
        if (searchQuery !== "") {
            setSearching(true)
            await axios.get(`https://youdio-backend.up.railway.app/api/ytSearchResultScraper?query=${searchQuery}`)
                .then((results) => {
                    updateSearchResults(results.data.videosData)
                    // console.log(results.data)
                })
                .then(() => {
                    setSearching(false)
                    setCollaspeResults(false)
                })
                .catch(() => { setSearching(false) })
        }
    }

    async function handleConvert(index: number) {
        const tempIDArray: string[] = []
        const selectedVideoId = searchResults[index].videoURL.slice(searchResults[index].videoURL.indexOf("?v=")).slice(3, 14)

        allYoudios.forEach((youdio: any) => {
            tempIDArray.push(youdio.youdio.youdio_id)
        })
        if (tempIDArray.includes(selectedVideoId)) {
            setYoudioExists(true)
            setConverting(false)
        } else {
            convert(searchResults[index].videoURL)
                .then(() => {
                    const added = addYoudio(searchResults[index])
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
        }
    }

    return (
        <section className="w-100 flex flex-col gap-5 font-golos">
            <h2 className="text-4xl font-bold">Search a video</h2>

            <div className="w-full flex flex-row gap-2 md:flex-col">
                <input className="text-black bg-white w-1/2 md:w-full p-4 rounded-md" placeholder="Enter video title" type="text" name="" id="" onChange={(e) => { setSearchQuery(e.target.value) }} />

                <button disabled={searching} className={`bg-white text-black font-semibold p-4 rounded-md md:w-1/3 ${searching ? "opacity-50" : "opacity-100"}`} onClick={handleClick}>{searching ? "Searching..." : "Search"}</button>
            </div>

            <div className={`${searchResults ? "flex" : "hidden"} flex-row gap-2 items-center w-fit cursor-pointer text-gray-500 font-normal text-sm ease-in duration-300`} onClick={() => { setCollaspeResults(!collaspeResults) }}>
                <FaChevronDown className={`${collaspeResults ? "-rotate-90" : "rotate-0"}`} />
                <span>{collaspeResults ? "Expand search results" : "Collapse search Results"}</span>
            </div>

            {searchResults ? searchResults.map((searchResult: any, index: number) => (
                <div key={index} className={`${collaspeResults ? "hidden" : "flex"} flex-row items-center justify-between px-3 ease-in duration-300`}>
                    <div className="flex flex-row gap-3 items-center">
                        <FaPlay size={20} className="cursor-pointer" onClick={() => {
                            convert(searchResult.videoURL)
                        }} />
                        <div className="flex flex-col">
                            <p className="text-gray-200 font-medium">{searchResult.title.length > 40 ? searchResult.title.slice(0, -(searchResult.title.length - 40)) + "..." : searchResult.title}</p>
                            <p className="text-xs text-gray-500">{searchResult.channelName}</p>
                        </div>
                    </div>
                    <div>
                        <SiConvertio size={20} className="cursor-pointer" onClick={() => handleConvert(index)} />
                        <p>{searchResult.duration}</p>
                    </div>
                </div>))
                : null
            }

            {converted ? <Toast toast="Conversion successful, youdio added" type="success" /> : converted === false ? <Toast toast="Couldn't convert item, Please try again." type="error" /> : null}
            {youdioExists ? <Toast toast="Youdio already exists." type="error" /> : null}
        </section>
    )
}
