import { acceptFriend, addFriend, checkFriendStatus } from "@/utils/rls/db";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Ping from "@/components/tests/Ping";

export default function AddFriendButton({ profile, link }) {
  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {}, [link]);

  return (
    <div
      className="relative flex"
      onClick={async () => {
        if (link && link.user2.id === user.id)
          acceptFriend(supabase, link).then((e) => console.log(e));
        else if (!link) {
          addFriend(supabase, user.id, profile.id).then((e) => console.log(e));
        }
      }}
    >
      {link && link.user2.id === user.id && <Ping />}
      {link && link.user2.id != user.id ? (
        <div className="rounded-xl p-1 border-2 text-sm">Request Sent</div>
      ) : (
        <div className="rounded-full max-w-[40px] max-h-[40px] border-2 p-1">
          <Image
            src="/icons/add_friend.png"
            alt="add friend button"
            height={30}
            width={30}
          />
        </div>
      )}
    </div>
  );
}
