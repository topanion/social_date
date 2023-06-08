import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import NewPost from "./NewPost";
import { useState, useEffect } from "react";
import PostList from "./PostList";
import FeedTop from "./FeedTop";
import { getAllFriends, getProfileById } from "../../utils/rls/db";

export default function Feed() {
  const [friends, setFriends] = useState(null);
  const user = useUser();
  const [profile, setProfile] = useState(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (user && !friends) {
      getAllFriends(user, supabase).then((e) => {
        setFriends(e);
      });

      if (user && !profile) {
        getProfileById(supabase, user.id).then((e) => {
          setProfile(e);
        });
      }
    }
  }, [friends, profile]);

  const sendPost = async (post) => {
    if (!post) return null;
    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        content: post,
      })
      .select("*")
      .single();

    if (error) console.log("error : ", error);
    if (data) return data;
  };

  return (
    <div className="w-full flex flex-col">
      {user && profile && (
        <div className="mt-[7vh]">
          <FeedTop user={user.user_metadata} profile={profile} />
        </div>
      )}
      <NewPost sendPost={sendPost} />

      {friends && <PostList friends={friends} />}
    </div>
  );
}
