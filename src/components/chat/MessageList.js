import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createUpdateSubscription } from "../utils/subscription";
import Message from "./Message";

export default function MessageList({ conversation_id }) {
  const [list, setList] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  const functionSetList = async () => {
    const { data } = await supabase
      .from("tchat_message")
      .select("*, source_id(id, username), receiver_id(id, username)")
      .order("created_at", { ascending: false })
      .eq("conversation_id", conversation_id);

    setList(data);
  };

  useEffect(() => {
    const updateSubscription = createUpdateSubscription(
      supabase,
      "realtime changes on tchat_message",
      "*",
      "tchat_message",
      `source_id.eq.${user.id}.or.receiver_id.eq.${user.id}`,
      () => functionSetList()
    );

    if (!list) functionSetList();

    return () => {
      // Unsubscribe from the channel when the component unmounts
      updateSubscription.unsubscribe();
    };
  }, [list]);

  return (
    <div className="overflow-y-scroll flex flex-col-reverse gap-1 w-[100%] h-[80vh]">
      {list &&
        list != [] &&
        list.map((e) => {
          return <Message key={e.created_at} message={e} userId={user.id} />;
        })}
    </div>
  );
}
