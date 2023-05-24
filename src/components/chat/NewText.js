import { useState } from "react";

export default function NewText({ sendMessage }) {
  const [body, setBody] = useState("");

  return (
    <div className="border-t p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(body);
          setBody("");
        }}
        className="flex items-center space-x-3"
      >
        <input
          autoFocus
          id="message"
          name="message"
          placeholder="Write a message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="flex-1 p-2 rounded bg-[#222226] border border-[#222226] focus:border-[#222226] focus:outline-none text-white placeholder-white"
        />
        <button
          type="submit"
          className="bg-[#3c8baa] rounded-2xl font-medium text-white px-2 py-1  text-lg border border-transparent hover:bg-[#363739] transition"
          disabled={!body}
        >
          ►
        </button>
      </form>
    </div>
  );
}
