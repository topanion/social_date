import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Navbar() {
    const router = useRouter();
    const supabase = useSupabaseClient();

    return (
    <div className="h-[6vh] bg-white fixed bottom-0 w-full border-t justify-items-center  p-1 flex flex-row">
        <div className="m-auto" onClick={() => router.push("/conversation")}>
            Tchat
        </div>
        <div className="m-auto" onClick={() => router.push("/feed")}>
            Feed
        </div>
        <div className="m-auto" onClick={() => supabase.auth.signOut()}>
            Logout
        </div>
    </div>
    )
}