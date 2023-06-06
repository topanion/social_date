import { acceptFriend, addFriend, checkFriendStatus } from "@/utils/rls/db";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import FriendRequestList from "./FriendRequestList";
import { createUpdateSubscription } from "@/utils/subscription";
import Ping from "@/components/tests/Ping";

export default function FriendRequestButton() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [ping, setPing] = useState(null);

  useEffect(() => {
    const updateSubscription = createUpdateSubscription(
      supabase,
      "checking new friendship request",
      "*",
      "user_friend",
      `user2.eq.${user.id}`,
      () => {
        pingOrNot();
      }
    );

    if (ping === null) pingOrNot();

    return () => {
      // Unsubscribe from the channel when the component unmounts
      updateSubscription.unsubscribe();
    };
  }, [ping, modalVisible]);

  const pingOrNot = async () => {
    const { count } = await supabase
      .from("user_friend")
      .select("count", { count: "exact" })
      .match({ user2: user.id, status: "pending" });

    if (count > 0) {
      setPing(true);
    } else setPing(false);
  };

  return (
    <>
      <div
        className="relative rounded-full max-w-[40px] max-h-[40px] border-2 p-1"
        onClick={() => setModalVisible(true)}
      >
        {ping && <Ping />}
        <Image
          src="/icons/add_friend.png"
          alt="add friend button"
          height={30}
          width={30}
        />
      </div>
      {modalVisible === true && (
        <div
          className="fixed flex top-0 left-0 z-50 h-screen w-screen bg-black/80"
          onClick={() => {
            setModalVisible(null);
          }}
        >
          <div
            className="m-auto w-[80vw] rounded-xl bg-white p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <FriendRequestList />
          </div>
        </div>
      )}
    </>
  );
}
