import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllConv } from "@/utils/db";
import LinkToConv from "@/components/chat/LinkToConv";
import Navbar from "@/components/Navbar";

export default function Page() {
  const [conversations, setConversations] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session && router.isReady) {
      router.push("/");
    }

    if (user && !conversations) {
      getAllConv(user, supabase).then((e) => {
        setConversations(e);
      });
    }
  }, [user, conversations, router.isReady, session]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-[80%] mx-[10%] text-xl font-bold py-[5%] border-b-2 mb-3">
        Conversations
      </div>
      <div className="mx-auto w-[80%] flex flex-col max-h-[70vh] gap-3">
        {conversations &&
          conversations.map((e, i) => (
            <LinkToConv
              key={"conversation n°" + i}
              conversation={e}
              onClick={() => router.push("/conversation/" + e.id)}
            />
          ))}
      </div>
      <Navbar />
    </div>
  );
}
