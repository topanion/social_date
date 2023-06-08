import Image from "next/image";
import { useRouter } from "next/router";

export default function PostDisplayTop({ user }) {
  const router = useRouter();

  return (
    <div className="fixed z-30 min-h-[35px] top-0 h-[5vh] bg-white w-full p-2 border-b-2 flex flex-row gap-2 items-center">
      {router && (
        <a
          className="p-1 flex mr-4 rounded-full hover:bg-gray-300 font-bold text-4xl my-auto"
          href="javascript:history.back()"
        >
          <Image
            width={20}
            height={20}
            src="/icons/arrow-go-back.svg"
            alt="previous page button"
          />
        </a>
      )}
    </div>
  );
}
