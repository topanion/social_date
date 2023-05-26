import Chat from "@/components/chat/Chat";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";

export default function Page() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    // if (!session && router.isReady) router.push("/");
  }, [router.isReady, session]);

  return (
    <div className="">
      {router.isReady && <Chat id={router.query.id} />}
    </div>
  );
}
