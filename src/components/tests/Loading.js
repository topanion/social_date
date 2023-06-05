import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-full w-full flex">
      <div className="m-auto animate-spin">
        <Image
          priority={true}
          src="/icons/loading.png"
          width={40}
          height={40}
          alt="loading icon"
        />
      </div>
    </div>
  );
}
