import { supabase } from "../../supabase"

export default function SignOut() {
    async function handleSignOut() {
        let { error } = await supabase.auth.signOut()
    }

    return (
        <button className="rounded-md bg-black text-white font-semibold px-3 py-2" onClick={handleSignOut}>Sign out</button>
    )
}
