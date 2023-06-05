import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import PostPage from "@/components/home/PostPage";

export default function Page() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    // if (!session && router.isReady) router.push("/");
  }, [router.isReady, session]);

  return (
    <div className="w-screen h-screen">
      {router.isReady && <PostPage post_id={router.query.id} />}
    </div>
  );
}
