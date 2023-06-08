import Image from "next/image";

export default function NavHomeButton({ onClick }) {
  return (
    <div className="grow flex" onClick={() => onClick()}>
      <div className="relative m-auto">
        <Image src="/icons/home.png" alt="home button" height={20} width={20} />
      </div>
    </div>
  );
}
