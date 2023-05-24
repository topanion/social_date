export default function TestButton({ children, onClick }) {
  return (
    <button
      className="rounded-xl bg-slate-500 p-2 text-white"
      type="button"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
