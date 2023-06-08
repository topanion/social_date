import Image from "next/image";
import { useRouter } from "next/router";

export default function ProfileTop({ username }) {
  const router = useRouter();

  return (
    <div className="fixed min-h-[35px] top-0 h-[5vh] z-20 w-full p-2 flex flex-row gap-2 items-center">
      {router && (
        <a
          className="flex mr-4 rounded-full h-[30px] w-[30px] bg-gray-800/80 font-bold my-auto"
          href="javascript:history.back()"
        >
          <span className="m-auto text-xl text-white">←</span>
        </a>
      )}
    </div>
  );
}
