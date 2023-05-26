import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import TestButton from "@/components/tests/TestButton";
import { useRouter } from "next/router";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Post from "@/components/post/Post";
import Feed from "@/components/home/Feed";

export default function Page() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const session = useSession();

  useEffect(() => {
    if (!session && router.isReady) router.push("/");
  }, [router.isReady, session]);

  const testDB = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("id, created_at, content, user_id (username)");

    console.log(data);
    setPost(data[0]);
  };

  const testFriend = async () => {
    const { data: friends, friendsError: error } = await supabase
      .from("user_friend")
      .select("*")
      .or("user1.eq." + user.id + ",user2.eq." + user.id);

    const allFriends = friends.map((e) => {
      return e.user1 === user.id ? e.user2 : e.user1;
    });
    console.log(allFriends);
  };

  return (
    <div className="m-auto p-5 flex flex-col border rounded-md gap-6">
      <Feed />
      <TestButton onClick={() => router.push("/conversation")}>
        Conversations
      </TestButton>

      <TestButton onClick={() => supabase.auth.signOut()}>Sign Out</TestButton>
    </div>
  );
}
