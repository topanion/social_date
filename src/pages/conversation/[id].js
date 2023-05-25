import Chat from "@/components/chat/Chat";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";

export default function Page() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session && router.isReady) router.push("/");
  }, [router.isReady, session]);

  return (
    <div className="w-screen h-[100vh] flex px-[5%]">
      {router.isReady && <Chat id={router.query.id} />}
    </div>
  );
}
