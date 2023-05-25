export default function Message({ message, userId }) {
  const source = message.source_id.id === userId;

  const time = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`grid p-1 ${
        source ? "justify-items-end" : "justify-items-start"
      }`}
    >
      <div className="flex flex-col  max-w-[90%]">
        <div
          className={`border rounded-md ${
            source ? "bg-[#3d94ce]" : "bg-[#3e0e75]"
          } text-white py-1 px-2`}
        >
          {message.content}
        </div>
        <div className={`text-xs ${source ? "text-right" : "text-left"}`}>
          {time}
        </div>
      </div>
    </div>
  );
}
