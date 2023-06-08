import { useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createUpdateSubscription } from "@/utils/subscription";
import Ping from "../tests/Ping";
import Image from "next/image";

export default function NavProfileButton({ onClick }) {
  const [ping, setPing] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (user) {
      const updateSubscription = createUpdateSubscription(
        supabase,
        "checking change on friendship request from nav",
        "*",
        "user_friend",
        `user2.eq.${user.id}`,
        () => {
          pingOrNot();
        }
      );

      if (ping === null) pingOrNot();

      return () => {
        // Unsubscribe from the channel when the component unmounts
        updateSubscription.unsubscribe();
      };
    }
  }, [ping, user]);

  const pingOrNot = async () => {
    const { count } = await supabase
      .from("user_friend")
      .select("count", { count: "exact" })
      .match({ user2: user.id, status: "pending" });

    if (count > 0) {
      setPing(true);
    } else setPing(false);
  };

  return (
    <div className="grow flex" onClick={() => onClick()}>
      <div className="relative m-auto">
        {ping && <Ping />}
        <Image
          src="/icons/profile.png"
          alt="profile button"
          height={20}
          width={20}
        />
      </div>
    </div>
  );
}
