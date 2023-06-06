import Image from "next/image";

export default function UserIcon({ source, border = false }) {
  return (
    <div
      className={`rounded-full max-h-[40px] max-w-[40px] overflow-hidden p-1 ${
        border && "border-2"
      }`}
    >
      <Image
        className="rounded-full"
        src={source}
        width={40}
        height={40}
        alt="profile pic"
      />
    </div>
  );
}
