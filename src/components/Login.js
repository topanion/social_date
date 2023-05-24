import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Login() {
  const supabase = useSupabaseClient();

  return (
    <div className="border rounded-md p-3">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        theme="dark"
      />
    </div>
  );
}
