import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createUpdateSubscription } from "../../utils/subscription";
import UserMessage from "./UserMessage";
import ReceiverMessage from "./ReceiverMessage";
import {
  timeOrNot,
  timeDifference,
  getDay,
  differentDay,
} from "../../utils/time";
import Loading from "../tests/Loading";

export default function MessageList({ conversation, sender, receiver }) {
  const [list, setList] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  const functionSetList = async () => {
    const { data } = await supabase
      .from("tchat_message")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("conversation_id", conversation.id);

    setList(data);
  };

  useEffect(() => {
    const updateSubscription = createUpdateSubscription(
      supabase,
      "realtime changes on tchat_message",
      "*",
      "tchat_message",
      `source_id.eq.${user.id}.or.receiver_id.eq.${user.id}`,
      () => {
        functionSetList();
      }
    );

    if (!list) functionSetList();

    return () => {
      // Unsubscribe from the channel when the component unmounts
      updateSubscription.unsubscribe();
    };
  }, [functionSetList, list]);

  return (
    <div className="overflow-y-scroll gap-1 flex flex-col-reverse px-[3%] py-[2%] my-[3%] mt-[8vh] h-[84vh]">
      {list ? (
        list != [] &&
        list.map((e, i) => {
          // if it's the first message of the list, there's nothing to compare to so no time display
          const differentday =
            i === 0
              ? false
              : differentDay(list[i].created_at, list[i - 1].created_at);
          const time_bool = i === 0 ? true : timeOrNot(list[i], list[i - 1]);
          let message_output = null;
          let day = null;
          if (sender.id === e.source_id)
            message_output = (
              <UserMessage message={e} user={sender} time_bool={time_bool} />
            );
          else
            message_output = (
              <ReceiverMessage
                message={e}
                user={receiver}
                time_bool={time_bool}
              />
            );

          if (differentday) {
            day = (
              <div className="w-full text-center p-1">
                {getDay(list[i - 1].created_at)}
              </div>
            );
          }

          return (
            <div key={e.created_at}>
              {message_output}
              {day}
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}
