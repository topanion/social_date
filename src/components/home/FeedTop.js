import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function FeedTop({ user, profile }) {
  const router = useRouter();
  const image_source = profile.avatar_url
    ? profile.avatar_url
    : "/profile/blank.png";

  return (
    <div className="fixed top-0 bg-white w-full p-1 border-b-2 flex flex-row gap-2 items-center">
      <Image
        className="rounded-full"
        src={image_source}
        width={40}
        height={40}
        alt="profile pic"
        onClick={() => router.push(`/${profile.username}`)}
      />
      <p>{user.username}</p>
    </div>
  );
}
