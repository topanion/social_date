import { useSupabaseClient } from "@supabase/auth-helpers-react";
import TestButton from "@/components/tests/TestButton";

export default function Page() {
  const supabase = useSupabaseClient();

  return (
    <>
      <TestButton onClick={() => supabase.auth.signOut()}>Sign Out</TestButton>
    </>
  );
}
