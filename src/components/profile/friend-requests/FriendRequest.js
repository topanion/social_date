import Image from "next/image";
import UserIcon from "@/components/tests/UserIcon";
import { useRouter } from "next/router";
import RequestButton from "./RequestButton";

export default function FriendRequest({ request, onClick, user }) {
  const router = useRouter();
  const image_source = request.user1.avatar_url
    ? request.user1.avatar_url
    : "/profile/blank.png";

  return (
    <div className="relative w-full flex gap-4 flex-row content-center justify-between p-2">
      <a
        className="flex flex-row gap-2 content-center"
        href={`/${request.user1.username}`}
      >
        <UserIcon source={image_source} />
        <p className="my-auto text-lg font-bold">{request.user1.username}</p>
      </a>
      <RequestButton request={request} />
    </div>
  );
}
