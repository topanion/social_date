import { useState, useEffect } from "react";
import NewImageUpload from "./NewImageUpload";
import NewUsername from "./NewUsername";
import NewBio from "./NewBio";

export default function EditProfile({ close, profile }) {
  const [mode, setMode] = useState("username");

  const changeMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen z-40 bg-black/60 flex"
      onClick={() => close()}
    >
      <div
        className="m-auto rounded-xl bg-white p-3 w-[80vw] min-h-[20vh]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col w-full gap-6">
          <select
            className="mx-auto w-fit"
            onChange={(e) => changeMode(e.target.value)}
          >
            <option value="username">Change username</option>
            <option value="bio">Change bio</option>
            <option value="avatar">Change avatar</option>
            <option value="banner">Change banner image</option>
          </select>
          <div className="flex w-full h-full">
            {mode === "bio" && <NewBio profile={profile} close={close} />}
            {mode === "username" && (
              <NewUsername profile={profile} close={close} />
            )}
            {mode === "avatar" && (
              <NewImageUpload
                bucket={"avatars"}
                imageName={"profile_image"}
                profile_parameter={"avatar_url"}
                profile={profile}
                close={close}
              ></NewImageUpload>
            )}
            {mode === "banner" && (
              <NewImageUpload
                bucket={"header"}
                imageName={"profile_header"}
                profile_parameter={"header_url"}
                profile={profile}
                close={close}
              ></NewImageUpload>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
