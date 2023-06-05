import { acceptFriend, addFriend, checkFriendStatus } from "@/utils/rls/db";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AddFriendButton({ profile, link }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [pending, setPending] = useState(false);

  useEffect(() => {}, [pending]);

  return (
    <div
      className="rounded-full max-w-[40px] max-h-[40px] border-2 p-1"
      onClick={async () => {
        if (link && link.user2 === user.id)
          acceptFriend(supabase, link).then((e) => console.log(e));
        else {
          addFriend(supabase, user.id, profile.id).then((e) => console.log(e));
        }
      }}
    >
      <Image
        src="/icons/add_friend.png"
        alt="add friend button"
        height={30}
        width={30}
      />
    </div>
  );
}
