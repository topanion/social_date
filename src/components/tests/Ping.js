export default function Ping({ number }) {
  return (
    <div className="absolute right-[-20%] top-[-1px] h-[40%] w-[40%]">
      <div className="animate-pulse flex rounded-full h-full w-full bg-red-700">
        <p className="text-white text-xs m-auto">{number}</p>
      </div>
    </div>
  );
}
