import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import Login from "../components/Login";
import Feed from "@/components/Feed";
import Chat from "@/components/chat/Chat";

export default function Home() {
  const session = useSession();

  useEffect(() => {}, [session]);

  return (
    <main>
      <div className="h-screen w-screen flex">
        <div className="m-auto">
          {!session && <Login />}
          {session && <Chat />}
        </div>
      </div>
    </main>
  );
}
