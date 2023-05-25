import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import TestButton from "@/components/tests/TestButton";
import { useRouter } from "next/router";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Post from "@/components/post/Post";

export default function Page() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const session = useSession();
  const [post, setPost] = useState(null);

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

  return (
    <div className="m-auto p-5 flex flex-col border rounded-md gap-6">
      <Post post={post} />
      <TestButton onClick={() => testDB()}>Test get</TestButton>
      <TestButton onClick={() => console.log(user)}>User</TestButton>
      <TestButton onClick={() => supabase.auth.signOut()}>Sign Out</TestButton>
    </div>
  );
}
