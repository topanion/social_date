import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NewBio({ profile, close }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [input, setInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleType = (event) => {
    setInput(event.target.value);
  };

  const handleConfirm = async () => {
    if (input) {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          bio: input,
        })
        .eq("id", profile.id);
      close();
    }
  };

  return (
    <div className="m-auto flex flex-col gap-2">
      <textarea
        className="border rounded-xl p-1 text-center"
        onChange={(e) => handleType(e)}
      />
      <p className="text-sm text-red-600 font-bold">{errorMessage}</p>
      <button
        type="button"
        className="rounded-xl p-1 border"
        onClick={() => handleConfirm()}
      >
        Change bio
      </button>
    </div>
  );
}
