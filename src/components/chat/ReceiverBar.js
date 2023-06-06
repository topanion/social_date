import Image from "next/image";
import { useRouter } from "next/router";
import UserIcon from "../tests/UserIcon";

export default function ReceiverBar({ user }) {
  const router = useRouter();
  const image_source = user.avatar_url ? user.avatar_url : "/profile/blank.png";

  return (
    <div className="fixed top-0 h-[8vh] bg-white w-full p-2 border-b-2 flex flex-row gap-2 items-center">
      {router && (
        <button
          className="p-1 flex mr-4 rounded-full hover:bg-gray-300 font-bold text-4xl my-auto"
          onClick={() => router.push("/conversation")}
        >
          <Image
            width={20}
            height={20}
            src="/icons/arrow-go-back.svg"
            alt="previous page button"
          />
        </button>
      )}
      <div
        className="flex flex-row gap-2"
        onClick={() => router.push(`/${user.username}`)}
      >
        <UserIcon source={image_source} />
        <p className="my-auto">{user.username}</p>
      </div>
    </div>
  );
}
