import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getConversation } from "@/utils/rls/db";

export default function MessageButton({ profile }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    if (user && !conversation) {
      functionSetConversation();
    }
  }, [user, conversation]);

  const functionSetConversation = async () => {
    getConversation(supabase, profile.id, user.id).then((e) => {
      setConversation(e);
    });
  };

  return (
    <>
      {conversation && (
        <div
          className="rounded-full max-w-[40px] max-h-[40px] border-2 p-1"
          onClick={() => router.push(`/conversation/${conversation.id}`)}
        >
          <Image
            src="/icons/mail.png"
            alt="message button"
            height={30}
            width={30}
          />
        </div>
      )}
    </>
  );
}
