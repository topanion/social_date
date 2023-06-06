import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { createUpdateSubscription } from "@/utils/subscription";
import { getAllFriends, getAllFriendsWithLinks } from "@/utils/rls/db";
import ManageFriend from "./ManageFriend";

export default function Friends({ user }) {
  const supabase = useSupabaseClient();
  const [friends, setFriends] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const updateSubscription = createUpdateSubscription(
      supabase,
      "subscribing to friends from friends",
      "*",
      "user_friend",
      `or(user2.eq.${user.id}, user1.eq.${user.id})`,
      () => setFriendlist()
    );

    if (user && !friends) setFriendlist();

    return () => {
      // Unsubscribe from the channel when the component unmounts
      updateSubscription.unsubscribe();
    };
  }, [friends, modalVisible]);

  const setFriendlist = async () => {
    getAllFriendsWithLinks(user, supabase).then((e) => setFriends(e));
  };

  return (
    <>
      <div className="relative" onClick={() => setModalVisible(true)}>
        <span className="font-bold"> {friends && friends.length}</span>{" "}
        {friends && " friends"}
      </div>
      {modalVisible === true && (
        <div
          className="absolute flex top-0 left-0 z-50 h-screen w-screen bg-black/80"
          onClick={() => {
            setTimeout(() => setModalVisible(null), 300);
          }}
        >
          <div
            className="m-auto w-[80vw] rounded-xl bg-white p-3"
            onClick={(e) => e.stopPropagation()}
          >
            {friends && friends.length != 0 ? (
              <>
                {friends.map((e, i) => {
                  return (
                    <ManageFriend
                      key={"friend nb " + i}
                      friend={e.friend}
                      link={e.link}
                      user={user}
                    />
                  );
                })}
              </>
            ) : (
              <>No friends.</>
            )}
            <div className="w-full flex">
              <a className="m-auto p-1 rounded-xl border" href="/suggestion">
                See Suggestions ?
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
