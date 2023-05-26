import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createUpdateSubscription } from "../utils/subscription";
import Post from "./Post";

export default function PostList({ friends }) {
  const [list, setList] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  // use allIds so that it does not only get user posts but also friends one
  const allIds = [].concat(friends, user.id);

  const functionSetList = async () => {
    const { data } = await supabase
      .from("posts")
      .select("id, created_at, content, user_id (username, avatar_url)")
      .order("created_at", { ascending: false })
      .in("user_id", allIds);

    setList(data);
  };

  useEffect(() => {
    const updateSubscription = createUpdateSubscription(
      supabase,
      "realtime changes on posts",
      "INSERT",
      "posts",
      `user_id.in.${allIds}`,
      () => functionSetList()
    );

    if (!list && user) {
      functionSetList();
    }

    return () => {
      // Unsubscribe from the channel when the component unmounts
      updateSubscription.unsubscribe();
    };
  }, [list, user]);

  return (
    <div className="flex flex-col gap-2 mx-[3%]">
      {list &&
        list != [] &&
        list.map((e, i) => {
          return <Post key={"post" + i + e.created_at} post={e} />;
        })}
    </div>
  );
}
