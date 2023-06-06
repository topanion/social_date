import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NewUsername({ profile, close }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [input, setInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleType = (event) => {
    setInput(event.target.value);
  };

  const handleConfirm = async () => {
    if (input) {
      if (input.length > 12) {
        setErrorMessage("username is too long, maximum 12 characters");
      } else {
        const { count, error } = await supabase
          .from("profiles")
          .select("*", { count: "exact" })
          .eq("username", input);

        if (count > 0) {
          setErrorMessage("username already taken");
        } else {
          const { data, error } = await supabase
            .from("profiles")
            .update({
              username: input,
            })
            .eq("id", profile.id);

          if (!error) {
            setTimeout(() => router.push(`/profile`), 300);
          }
        }
      }
    }
  };

  return (
    <div className="m-auto flex flex-col gap-2">
      <input
        className="border rounded-xl p-1 text-center"
        maxLength={12}
        onChange={(e) => handleType(e)}
      />
      <p className="text-sm text-red-600 font-bold">{errorMessage}</p>
      <button
        type="button"
        className="rounded-xl p-1 border"
        onClick={() => handleConfirm()}
      >
        Change username
      </button>
    </div>
  );
}
