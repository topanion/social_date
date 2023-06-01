import Image from "next/image";
import { useRouter } from "next/router";

export default function ProfileTop({ username }) {
  const router = useRouter();

  return (
    <div className="fixed top-0 h-[5vh] bg-white w-full p-2 flex flex-row gap-2 items-center">
      {router && (
        <button
          className="p-1 flex mr-4 rounded-full hover:bg-gray-300 font-bold text-4xl my-auto"
          onClick={() => router.push("/feed")}
        >
          <Image
            width={20}
            height={20}
            src="/icons/arrow-go-back.svg"
            alt="previous page button"
          />
        </button>
      )}
      <p>{username}</p>
    </div>
  );
}
