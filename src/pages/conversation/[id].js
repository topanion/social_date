import Chat from "@/components/chat/Chat";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {}, [router.isReady]);

  return (
    <div className="w-screen h-[100vh] flex px-[5%]">
      {router.isReady && <Chat id={router.query.id} />}
    </div>
  );
}
