import { acceptFriend, declineFriend } from "@/utils/rls/db";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function RequestButton({ request }) {
  const supabase = useSupabaseClient();

  const accept = async () => {
    acceptFriend(supabase, request);
  };

  const decline = async () => {
    declineFriend(supabase, request);
  };

  return (
    <div className="flex flex-row justify-between gap-1 content-center">
      <div
        onClick={() => accept()}
        className="rounded-full flex border h-[35px] w-[35px]"
      >
        <span className="m-auto">✓</span>
      </div>
      <div
        onClick={() => decline()}
        className="rounded-full flex border h-[35px] w-[35px]"
      >
        <span className="m-auto">✗</span>
      </div>
    </div>
  );
}
