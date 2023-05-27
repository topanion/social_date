import { useState } from "react";

export default function NewText({ sendMessage }) {
  const [body, setBody] = useState("");

  return (
    <div className="fixed bottom-0 w-full bg-white border-t p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(body);
          setBody("");
        }}
        className="flex space-x-3 h-full py-1"
      >
        <input
          autoFocus
          id="message"
          name="message"
          placeholder="Write a message..."
          value={body}
          autoComplete="off"
          onChange={(e) => setBody(e.target.value)}
          className="flex-auto px-3 py-2 text-base h-[4vh] min-h-[30px] rounded-full bg-gray-400 focus:border-[#222226] focus:outline-none text-white placeholder-white"
        />
        <button
          type="submit"
          className="bg-[#3c8baa] rounded-full font-medium text-white px-3 text-lg border border-transparent hover:bg-[#363739] transition"
          disabled={!body}
        >
          ►
        </button>
      </form>
    </div>
  );
}
