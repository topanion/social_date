import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import TestButton from "@/components/tests/TestButton";
import { useRouter } from "next/router";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Post from "@/components/home/Post";
import Feed from "@/components/home/Feed";
import Navbar from "@/components/Navbar";

export default function Page() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const session = useSession();

  useEffect(() => {
    if (!session && router.isReady) router.push("/");
  }, [router.isReady, session]);

  return (
    <div className="m-auto flex flex-col gap-6">
      {session && (
        <>
          <Feed />
          <Navbar />
        </>
      )}
    </div>
  );
}
