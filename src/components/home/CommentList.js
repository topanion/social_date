import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createUpdateSubscription } from "../../utils/subscription";
import Loading from "../tests/Loading";
import Comment from "./Comment";

export default function CommentList({ post_id }) {
  const [list, setList] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  const functionSetList = async () => {
    const { data } = await supabase
      .from("comments")
      .select("id, created_at, text, user_id (*))")
      .order("created_at", { ascending: true })
      .eq("post_id", post_id);

    setList(data);
  };

  useEffect(() => {
    const updateSubscription = createUpdateSubscription(
      supabase,
      "realtime changes on comments",
      "INSERT",
      "comments",
      `post_id.eq.${post_id}`,
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
    <div className="flex flex-col gap-2 mx-[3%] py-[1%]">
      {list ? (
        list != [] &&
        list.map((e, i) => {
          return <Comment key={"comment" + i + e.created_at} comment={e} />;
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}
