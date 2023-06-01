import { messageTime } from "../../utils/time";
import { useState, useEffect } from "react";

export default function UserMessage({ message, time_bool }) {
  const time = messageTime(message.created_at);
  const [displayTime, setDisplayTime] = useState(time_bool);

  useEffect(() => {}, [time_bool]);

  return (
    <div
      className={`grid justify-items-end`}
      onClick={() => setDisplayTime(!displayTime)}
    >
      <div className="flex flex-col max-w-[90%]">
        <div
          className={`max-w-[85vw] break-words border rounded-2xl bg-[#3d94ce] text-white py-2 px-3`}
        >
          {message.content}
        </div>
        {displayTime && <div className={`text-xs text-right mr-2`}>{time}</div>}
      </div>
    </div>
  );
}
