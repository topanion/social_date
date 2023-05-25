import MessageList from "./MessageList";
import NewText from "./NewText";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

export default function Chat({ id }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [conversation, setConversation] = useState(null);
  const [receiver_id, setReceiverId] = useState(null);

  useEffect(() => {
    if (!conversation && user) getConversation();
  }, [conversation, user]);

  const getConversation = async () => {
    const { data, error } = await supabase
      .from("conversation")
      .select("*")
      .eq("id", id)
      .single();
    setConversation(data);
    if (error) return "oh shit";
    if (user.id === data.user_1) setReceiverId(data.user_2);
    else setReceiverId(data.user_1);
  };

  const sendMessage = async (msg) => {
    const { data, error } = await supabase
      .from("tchat_message")
      .insert({
        conversation_id: conversation.id,
        content: msg,
        source_id: user.id,
        receiver_id: receiver_id,
      })
      .select("*")
      .single();
  };

  return (
    <div className="m-auto border rounded-md px-3 flex flex-col">
      {conversation && (
        <>
          <MessageList conversation_id={conversation.id} />
          <NewText sendMessage={sendMessage} />
        </>
      )}
    </div>
  );
}
