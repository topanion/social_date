import TestButton from "../tests/TestButton";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import NewImageUpload from "./header/NewImageUpload";
import EditProfile from "./header/EditProfile";
import OtherUserHeader from "./header/OtherUserHeader";

export default function Header({ profile }) {
  const user = useUser();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const bannerStyle = profile.header_url
    ? {
        backgroundImage: `url('${profile.header_url}')`,
        backgroundSize: `cover`,
      }
    : null;

  const avatarStyle = {
    backgroundImage: `url('${
      profile.avatar_url ? profile.avatar_url : "/profile/blank.png"
    }')`,
    backgroundSize: `cover`,
  };

  return (
    <div className="w-full flex flex-col mt-[5vh]">
      {/**banner */}
      <div className="h-[15vh] w-full" style={bannerStyle}></div>
      {/**profile */}
      <div className="w-[100vw] min-h-[20vh] border-b-2 mb-1 pt-[5vh] flex flex-col gap-2 px-3">
        {/**Profile avatar */}
        <div className="absolute top-[15vh] p-1 left-3 lg:top-[12vh] w-[20vw] h-[20vw] lg:w-[10vw] lg:h-[10vw] ml-1 rounded-full bg-white border border-white z-10">
          <div
            className="w-full h-full rounded-full "
            style={avatarStyle}
          ></div>
        </div>
        {/*rest of the header */}
        <div className="w-full px-3 flex flex-row justify-between">
          <p className="text-3xl text-gray-800 font-bold">{profile.username}</p>
          <div className="flex flex-row gap-1">
            {user && user.id === profile.id ? (
              <>
                {editModalVisible && (
                  <>
                    <EditProfile
                      close={() => setEditModalVisible(false)}
                      profile={profile}
                    />
                  </>
                )}
                <TestButton
                  onClick={() => {
                    setEditModalVisible(true);
                  }}
                >
                  Edit profile
                </TestButton>
              </>
            ) : (
              <OtherUserHeader profile={profile} />
            )}
          </div>
        </div>
        <div className="text-sm">{profile.bio}</div>
      </div>
    </div>
  );
}
