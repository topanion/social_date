import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import Login from "../components/Login";
import Chat from "@/components/chat/Chat";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import TestButton from "@/components/tests/TestButton";
import { useRouter } from "next/router";
import { global } from "styled-jsx/css";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/feed");
    }
  }, [session]);

  return (
    <main>
      <div className="h-[100vh] w-screen flex">
        <div className="m-auto">{!session && <Login />}</div>
      </div>
    </main>
  );
}
