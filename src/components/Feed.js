import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import TestButton from "./tests/TestButton";

export default function Feed() {
  const user = useUser();
  const supabase = useSupabaseClient();

  return (
    <div className="border rounded-md p-3 flex flex-col gap-3">
      <TestButton onClick={() => console.log(user)}>Click bitch</TestButton>
      <TestButton onClick={() => supabase.auth.signOut()}>Log Out</TestButton>
    </div>
  );
}
