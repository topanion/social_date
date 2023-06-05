import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/tests/Loading";

export default function Page() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const redirect = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (data) router.push(`/${data.username}`);
  };

  useEffect(() => {
    if (user && router.isReady) {
      redirect();
    }
  }, [user, router.isReady]);
  return (
    <div className="h-screen w-screen">
      <Loading />
    </div>
  );
}
