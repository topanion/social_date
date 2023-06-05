import { checkFriendStatus, getAllFriends } from "@/utils/rls/db";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import AddFriendButton from "./AddFriendButton";
import { createUpdateSubscription } from "@/utils/subscription";
import MessageButton from "./MessageButton";

export default function OtherUserHeader({ profile }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const updateSubscription = createUpdateSubscription(
      supabase,
      "realtime changes on user_friend",
      "*",
      "user_friend",
      `or(user1.eq.${user.id}, user2.eq.${user.id})`,
      () => {
        console.log("ok now ");
        checkIsFriend();
      }
    );

    if (user && !friend) checkIsFriend();

    return () => {
      updateSubscription.unsubscribe();
    };
  }, [user, friend]);

  const checkIsFriend = async () => {
    checkFriendStatus(supabase, user.id, profile.id).then((e) => {
      setFriend(e);
    });
  };

  return (
    <>
      {friend && friend.status === "approved" ? (
        <MessageButton profile={profile} />
      ) : (
        <div className="">
          <AddFriendButton profile={profile} link={friend} />
        </div>
      )}
    </>
  );
}
