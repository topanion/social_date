import TestButton from "../tests/TestButton";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import NewImageUpload from "./NewImageUpload";

export default function Header({ profile }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [imageModalMode, setImageModalMode] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
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

  const imageModes = {
    avatar: {
      bucket: "avatars",
      imageName: "profile_image",
      profile_parameter: "avatar_url",
    },
    header: {
      bucket: "header",
      imageName: "profile_header",
      profile_parameter: "header_url",
    },
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
        <div className="w-full px-3 grid grid-cols-2">
          <p className="text-3xl text-gray-800 font-bold">{profile.username}</p>
          <div className="flex flex-row gap-1">
            {user && user.id === profile.id && (
              <>
                {imageModalVisible && (
                  <NewImageUpload
                    {...imageModes[imageModalMode]}
                    onSet={() => setImageModalVisible(false)}
                    profile={profile}
                  />
                )}
                <TestButton
                  onClick={() => {
                    setImageModalMode("header");
                    setImageModalVisible(true);
                  }}
                >
                  New Header
                </TestButton>
                <TestButton
                  onClick={() => {
                    setImageModalMode("avatar");
                    setImageModalVisible(true);
                  }}
                >
                  New Avatar
                </TestButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
