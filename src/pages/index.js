import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, createContext } from "react";
import Login from "../components/Login";
import { useRouter } from "next/router";
import { setUsernameIfNull } from "@/utils/rls/db";
import Head from "next/head";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (session && user && router.isReady) {
      checkUsername();
    }
  }, [session, router, router.isReady]);

  const checkUsername = async () => {
    await setUsernameIfNull(supabase, user.id).then(() => {
      router.push("/feed");
    });
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <div className="h-[100vh] w-screen flex">
          <div className="m-auto">{!session && <Login />}</div>
        </div>
      </main>
    </>
  );
}
