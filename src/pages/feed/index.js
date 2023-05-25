import { useSupabaseClient } from "@supabase/auth-helpers-react";
import TestButton from "@/components/tests/TestButton";

export default function Page() {
  const supabase = useSupabaseClient();

  return (
    <div className="w-screen h-[100vh] flex">
      <TestButton onClick={() => supabase.auth.signOut()}>Sign Out</TestButton>
    </div>
  );
}
