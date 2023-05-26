import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import NewPost from "./NewPost";
import { useState, useEffect } from "react";
import PostList from "./PostList";

export default function Feed() {
  const [friends, setFriends] = useState(null);
  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (user && !friends) getAllFriends();
  }, [user, friends]);

  const getAllFriends = async () => {
    const { data: friends, friendsError: error } = await supabase
      .from("user_friend")
      .select("*")
      .or("user1.eq." + user.id + ",user2.eq." + user.id);

    const allFriends = friends.map((e) => {
      return e.user1 === user.id ? e.user2 : e.user1;
    });
    setFriends(allFriends);
  };

  const sendPost = async (post) => {
    const { data: newPost, error: postError } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        content: post,
      })
      .select("*")
      .single();

    console.log("posted ", newPost);
  };

  return (
    <div className="w-full flex flex-col">
      <NewPost sendPost={sendPost} />

      {friends && <PostList friends={friends} />}
    </div>
  );
}
