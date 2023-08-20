// import { BiSearch } from "react-icons/bi"
import { GoHome } from "react-icons/go"

export default function Sidebar() {
    return (
        <section className="w-1/5 flex flex-col gap-2">
            <ul className="bg-[#121212] rounded-lg p-3 flex flex-col gap-6 w-100">
                <li className="flex flex-row items-center gap-2 text-md">
                    <GoHome size={30} />
                    <span>Home</span>
                </li>
                {/* <li className="flex flex-row items-center gap-2 text-md">
                    <BiSearch size={30} color="#ffffff" />
                    <span>Search</span>
                </li> */}
            </ul>
            <div className="bg-[#121212] rounded-lg p-3 flex flex-col gap-6 w-100">
                <h3>Your Library</h3>
            </div>
        </section>
    )
}
