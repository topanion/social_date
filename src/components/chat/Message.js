export default function Message({ message, userId }) {
  const source = message.source_id === userId;
  const time = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`grid p-2 w-full ${
        source ? "justify-items-end" : "justify-items-start"
      }`}
    >
      <div className="flex flex-col">
        <div
          className={`border rounded-md ${
            source ? "bg-[#3d94ce]" : "bg-[#6aa9d3]"
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
