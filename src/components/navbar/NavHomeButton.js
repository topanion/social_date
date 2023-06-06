import Image from "next/image";

export default function NavHomeButton({ onClick }) {
  return (
    <div className="m-auto" onClick={() => onClick()}>
      <div className="relative">
        <Image src="/icons/home.png" alt="home button" height={20} width={20} />
      </div>
    </div>
  );
}
