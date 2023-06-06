import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllConv, getAllFriends, getAllSuggestions } from "@/utils/rls/db";
import LinkToConv from "@/components/chat/LinkToConv";
import Navbar from "@/components/Navbar";
import Loading from "@/components/tests/Loading";
import ManageFriend from "@/components/profile/friends/ManageFriend";

export default function Page() {
  const [list, setList] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (user && !list) {
      getSuggestions();
    }
  }, [user, list, router.isReady, session]);

  const getSuggestions = async () => {
    getAllSuggestions(supabase, user).then((e) => {
      console.log(e);
      setList(e);
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-[80%] mx-[10%] text-xl font-bold py-[5%] border-b-2 mb-3">
        Friend suggestions
      </div>
      <div className="mx-auto w-[80%] flex flex-col max-h-[70vh] gap-3">
        {user && list ? (
          list.map((e, i) => (
            <ManageFriend
              key={"suggestion nb " + i}
              friend={e}
              defaultStatus="deleted"
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
      <Navbar />
    </div>
  );
}
