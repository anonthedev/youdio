import Dashboard from "@/Components/Dashboard/Dashboard";
import Player from "@/Components/Dashboard/Player";
import MobileSidebar from "@/Components/Sidebar/MobileSidebar";
import Sidebar from "@/Components/Sidebar/Sidebar";

export default function Page() {
  return (
    <main className="flex flex-col w-screen h-screen">
      <section className="bg-black flex flex-row w-full gap-2 p-2 flex-auto overflow-y-hidden md:overflow-y-auto md:flex-col md:pb-28">
        <Sidebar />
        <section className="flex-grow">
          <Dashboard />
        </section>
      </section>
      <section className="flex-initial md:fixed md:bottom-0">
        <Player />
        <MobileSidebar />
      </section>
    </main>
  )
}
