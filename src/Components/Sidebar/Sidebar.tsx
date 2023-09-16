// import { BiSearch } from "react-icons/bi"
import { GoHome } from "react-icons/go"
import { BsArrowRight } from "react-icons/bs"
import { LuLibrary } from "react-icons/lu"
import { IoIosAdd } from "react-icons/io"
import LibraryPreview from "./LibraryPreview"
import Link from "next/link"

export default function Sidebar() {
    return (
        <section className="md:hidden w-1/5 flex flex-col gap-2">
            <ul className="bg-[#121212] rounded-lg py-3 px-5 flex flex-col gap-6 w-100">
                <Link href={"/dashboard"} className="flex flex-row items-center gap-2 text-md text-gray-500">
                    <GoHome size={25} strokeWidth={0.75} />
                    <span className="font-bold font-raleway text-lg">Home</span>
                </Link>
                {/* <li className="flex flex-row items-center gap-2 text-md">
                    <BiSearch size={30} color="#ffffff" />
                    <span>Search</span>
                </li> */}
            </ul>
            <div className="bg-[#121212] rounded-lg py-3 px-5 flex flex-col gap-6 w-100 flex-grow">
                <div className="flex flex-row justify-between items-center text-gray-500">
                    <span className="flex flex-row items-center gap-2">
                        <LuLibrary size={25} strokeWidth={1.75} />
                        <h2 className="font-bold font-raleway text-lg">Your Library</h2>
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <div className="hover:bg-gray-700 cursor-pointer rounded-full">
                            <IoIosAdd size={30} strokeWidth={1.5} />
                        </div>
                        <Link href={"/library"}>
                            <BsArrowRight size={20} strokeWidth={0.75} />
                        </Link>
                    </span>
                </div>
                <LibraryPreview />
                {/* <p className="text-center text-xl">Work in progress 🫣🫣...</p> */}
            </div>
        </section>
    )
}
