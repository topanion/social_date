import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import NavMessageButton from "./navbar/NavMessageButton";
import NavProfileButton from "./navbar/NavProfileButton";
import NavHomeButton from "./navbar/NavHomeButton";

export default function Navbar() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  return (
    <div className="z-50 min-h-[40px] h-[6vh] bg-white fixed bottom-0 w-full border-t flex flex-row justify-between">
      <NavHomeButton onClick={() => router.push("/feed")} />
      <NavMessageButton onClick={() => router.push("/conversation")} />
      <NavProfileButton onClick={() => router.push("/profile")} />

      <div className="flex grow" onClick={() => supabase.auth.signOut()}>
        <div className="relative m-auto">Logout</div>
      </div>
    </div>
  );
}
