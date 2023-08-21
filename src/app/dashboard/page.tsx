import Dashboard from "@/Components/Dashboard/Dashboard";
import Player from "@/Components/Dashboard/Player";
import Sidebar from "@/Components/Sidebar/Sidebar";

export default function Page() {
  return (
    <main className="flex flex-col w-screen h-screen">
      <section className="flex flex-row w-full gap-2 p-2 mb-auto">
        <Sidebar />
        <section className="flex-grow">
          <Dashboard />
        </section>
      </section>
      <section className="mt-auto">
        <Player/>
      </section>
    </main>
  )
}
