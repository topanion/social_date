import { useState } from "react";

export default function NewPost({ sendPost }) {
  const [body, setBody] = useState("");

  return (
    <div className="p-2 mt-[7vh] border-b-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendPost(body);
          setBody("");
        }}
        className="flex items-center space-x-3"
      >
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          placeholder="Post something..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="flex-1 p-2 rounded bg-[#2222263f] focus:border-[#222226] focus:outline-none text-white placeholder-white"
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
