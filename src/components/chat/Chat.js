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
    }
    else {
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
  };

  return (
    <div className="mx-auto rounded-md flex flex-col">
      {conversation && (
        <>
          <ReceiverBar user={receiver}/>
          <MessageList conversation={conversation} sender={sender} receiver={receiver} />
          <NewText sendMessage={sendMessage} />
        </>
      )}
    </div>
  );
}
