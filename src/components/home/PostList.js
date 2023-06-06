import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createUpdateSubscription } from "../../utils/subscription";
import Post from "./Post";
import Loading from "../tests/Loading";

export default function PostList({ friends, specificUser }) {
  const [list, setList] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  // use allIds so that it does not only get user posts but also friends one
  const allList = specificUser ? [specificUser] : friends;
  const allIds = allList.map((e) => {
    return e.id;
  });

  const functionSetList = async () => {
    const { data } = await supabase
      .from("posts")
      .select("id, created_at, content, user_id (username, avatar_url)")
      .order("created_at", { ascending: false })
      .in("user_id", allIds);

    const output = await Promise.all(
      data.map(async (post) => {
        const { count } = await supabase
          .from("comments")
          .select("*", { count: "exact" })
          .eq("post_id", post.id);

        return { ...post, count };
      })
    );

    setList(output);
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
    <div className="flex flex-col gap-2 pt-[1%] px-[1%] mb-[5vh] ">
      {list ? (
        list != [] &&
        list.map((e, i) => {
          return <Post key={"post" + i + e.created_at} post={e} />;
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}
