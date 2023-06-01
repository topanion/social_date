import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { createUpdateSubscription } from "../../utils/subscription";
import Navbar from "../Navbar";
import PostList from "../home/PostList";
import Header from "./Header";
import ProfileTop from "./ProfileTop";

export default function Profile({ username }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const updateSubscription = createUpdateSubscription(
      supabase,
      "realtime changes on that profile",
      "*",
      `user.eq.${username}`,
      () => {
        getProfile();
      }
    );

    if (!profile) getProfile();

    return () => {
      updateSubscription.unsubscribe();
    };
  }, [profile, user]);

  const getProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (error) console.log("no user found with username");
    if (data) {
      setProfile(data);
    }
  };

  return (
    <div className="mx-auto rounded-md flex flex-col">
      {profile && (
        <>
          <ProfileTop username={username} />
          <Header profile={profile} />
          <PostList specificUser={profile} />
          <Navbar />
        </>
      )}
    </div>
  );
}