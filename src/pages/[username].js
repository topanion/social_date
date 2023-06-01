import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Profile from "@/components/profile/Profile";

export default function Page() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // redirect if not logged
    if (!session && router.isReady) {
      router.push("/");
    }
  }, [session, router.isReady]);

  return (
    <main>
      {session && router.isReady && (
        <Profile username={router.query.username} />
      )}
    </main>
  );
}
