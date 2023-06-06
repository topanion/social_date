import { useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createUpdateSubscription } from "@/utils/subscription";
import Ping from "../tests/Ping";
import Image from "next/image";

export default function NavMessageButton({ onClick }) {
  const [ping, setPing] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (user) {
      const updateSubscription = createUpdateSubscription(
        supabase,
        "realtime changes on conversations",
        "*",
        "conversation",
        `ping_for.eq.${user.id}`,
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
      .from("conversation")
      .select("count", { count: "exact" })
      .eq("ping_for", user.id);

    if (count > 0) {
      setPing(true);
    } else setPing(false);
  };

  return (
    <div className="m-auto" onClick={() => onClick()}>
      <div className="relative">
        {ping && <Ping />}
        <Image
          src="/icons/mail.png"
          alt="message button"
          height={20}
          width={20}
        />
      </div>
    </div>
  );
}
