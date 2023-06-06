import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllFriendRequests } from "@/utils/rls/db";
import Navbar from "@/components/Navbar";
import Loading from "@/components/tests/Loading";
import FriendRequest from "./FriendRequest";
import { createUpdateSubscription } from "@/utils/subscription";

export default function FriendRequestList() {
  const [requests, setRequests] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    const updateSubscription = createUpdateSubscription(
      supabase,
      "checking validation ",
      "*",
      "user_friend",
      `user2.eq.${user.id}`,
      () => {
        asyncGetRequests();
      }
    );

    if (user && !requests) {
      asyncGetRequests();
    }
  }, [user, router.isReady]);

  const asyncGetRequests = async () => {
    getAllFriendRequests(user, supabase).then((e) => {
      setRequests(e);
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex flex-col max-h-[70vh] gap-3">
        {user && requests ? (
          <>
            {requests.length != 0 ? (
              requests.map((e, i) => (
                <FriendRequest
                  key={"friend request n°" + i}
                  request={e}
                  user={user}
                  onClick={() => console.log(e)}
                />
              ))
            ) : (
              <div className="">No friend requests.</div>
            )}
            <div className="w-full flex">
              <a className="m-auto p-1 rounded-xl border" href="/suggestion">
                See Suggestions ?
              </a>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
