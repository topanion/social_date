import MessageList from "./MessageList";
import NewText from "./NewText";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import ReceiverBar from "./ReceiverBar";

export default function Chat({ id }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [conversation, setConversation] = useState(null);
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    if (!conversation && user) getConversation();
  }, [conversation, user]);

  const getConversation = async () => {
    const { data, error } = await supabase
      .from("conversation")
      .select("*, user1(*), user2(*)")
      .eq("id", id)
      .single();
    setConversation(data);
    if (error) return "Error while fetching the conversation informations.";
    if (user.id === data.user1.id) {
      setReceiver(data.user2);
      setSender(data.user1);
    } else {
      setReceiver(data.user1);
      setSender(data.user2);
    }
  };

  const sendMessage = async (msg) => {
    const { data, error } = await supabase
      .from("tchat_message")
      .insert({
        conversation_id: conversation.id,
        content: msg,
        source_id: user.id,
        receiver_id: receiver.id,
      })
      .select("*")
      .single();

    // verify if ping already exists
    const { data: checkingPing, error: noPing } = await supabase
      .from("conversation")
      .select("*")
      .match({ id: conversation.id, ping_for: receiver.id });

    // if it does, just increment
    if (checkingPing.length != 0) {
      const { data: updatePing, error: nopdate } = await supabase
        .from("conversation")
        .update({
          ping_nb: checkingPing[0].ping_nb + 1,
        })
        .match({ id: conversation.id, ping_for: receiver.id });
    } else {
      // otherwise, it sets ping_nb to 1 and add the ping_for
      const { data: newPing, error: noNewPing } = await supabase
        .from("conversation")
        .update({
          ping_for: receiver.id,
          ping_nb: 1,
        })
        .eq("id", conversation.id);
    }
  };

  return (
    <div className="mx-auto rounded-md flex flex-col h-[100vh]">
      {conversation && (
        <>
          <ReceiverBar user={receiver} />
          <MessageList
            conversation={conversation}
            sender={sender}
            receiver={receiver}
          />
          <NewText sendMessage={sendMessage} />
        </>
      )}
    </div>
  );
}
