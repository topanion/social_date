import UserIcon from "@/components/tests/UserIcon";
import { useState, useEffect } from "react";
import { addFriend, deleteFriend } from "@/utils/rls/db";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ManageFriend({
  friend,
  user,
  defaultStatus = "friend",
}) {
  const [linkStatus, setLinkStatus] = useState(defaultStatus);
  const supabase = useSupabaseClient();
  const currentUser = useUser();

  const image_source = friend.avatar_url
    ? friend.avatar_url
    : "/profile/blank.png";

  useEffect(() => {
    if (currentUser && linkStatus && user && user.id !== currentUser.id)
      setLinkStatus(null);
  }, [currentUser, linkStatus]);

  const statusMessage = {
    friend: "Friend",
    deleted: "Ask Friend",
    requested: "Request sent",
  };

  const manageClick = () => {
    if (linkStatus === "friend") {
      deleteFriend(supabase, friend.id, currentUser.id).then((e) => {
        console.log(e);
        setLinkStatus("deleted");
      });
    } else if (linkStatus === "deleted") {
      addFriend(supabase, currentUser.id, friend.id).then(() => {
        setLinkStatus("requested");
      });
    }
  };

  return (
    <div className="relative w-full flex gap-4 flex-row content-center justify-between p-2">
      <a
        className="flex flex-row gap-2 content-center"
        href={`/${friend.username}`}
      >
        <UserIcon source={image_source} />
        <p className="my-auto text-lg font-bold">{friend.username}</p>
      </a>
      {currentUser && linkStatus && (
        <div className="rounded-2xl p-2 border" onClick={() => manageClick()}>
          {statusMessage[linkStatus]}
        </div>
      )}
    </div>
  );
}
