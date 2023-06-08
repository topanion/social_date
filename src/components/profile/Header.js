import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import EditProfile from "./header/EditProfile";
import OtherUserHeader from "./header/OtherUserHeader";
import Image from "next/image";
import FriendRequestButton from "./friend-requests/FriendRequestButton";
import Friends from "./friends/Friends";
import ImagePreview from "../image/ImagePreview";

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
    <div className="w-full flex flex-col">
      {/**banner */}
      <div className="h-[20vh] w-full relative" style={bannerStyle}>
        <ImagePreview source={profile.header_url} />
      </div>
      {/**profile */}
      <div className="relative w-[100vw] min-h-[20vh] border-b-2 mb-1 lg:pt-[15vh] flex flex-col gap-1 px-6 pb-[2vh]">
        {/**Profile avatar */}
        <div className="absolute top-[-5vh] lg:top-[-10vh] p-1 w-[10vh] h-[10vh] lg:w-[10vw] lg:h-[10vw] ml-1 rounded-full bg-white border border-white">
          <div className="w-full h-full rounded-full z-30" style={avatarStyle}>
            <ImagePreview source={profile.avatar_url} />
          </div>
        </div>
        {/*rest of the header */}
        <div className="w-full flex flex-row justify-between mt-[5vh] lg:mt-[0vh]">
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
                <div
                  className="border rounded-full p-2"
                  onClick={() => {
                    setEditModalVisible(true);
                  }}
                >
                  <Image
                    src="/icons/edit.png"
                    alt="edit button"
                    width={20}
                    height={20}
                  />
                </div>
                <FriendRequestButton />
              </>
            ) : (
              <OtherUserHeader profile={profile} />
            )}
          </div>
        </div>
        <div className="text-sm">{profile.bio}</div>
        <Friends user={profile} />
      </div>
    </div>
  );
}
