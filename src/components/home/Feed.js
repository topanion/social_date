import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import NewPost from "./NewPost";
import { useState, useEffect } from "react";
import PostList from "./PostList";
import FeedTop from "./FeedTop";
import { getAllFriends } from "../utils/db";

export default function Feed() {
  const [friends, setFriends] = useState(null);
  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (user && !friends) {
      getAllFriends(user, supabase).then((e) => {
        setFriends(e);
      })
    }
  }, [friends]);



  const sendPost = async (post) => {
    const { data: newPost, error: postError } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        content: post,
      })
      .select("*")
      .single();

  };

  return (
    <div className="w-full flex flex-col">
      {user && <FeedTop user={user.user_metadata}/>}
      <NewPost sendPost={sendPost} />

      {friends && <PostList friends={friends} />}
    </div>
  );
}
