import { uploadPostImage } from "@/utils/rls/db";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function NewPost({ sendPost, placeholder, type = "posts" }) {
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const supabase = useSupabaseClient();

  return (
    <div className="p-2 border-b-2">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const post = await sendPost(body);
          if (file && post) {
            uploadPostImage(supabase, file, post.id, type).then((e) => {
              console.log(e);
            });
          }
          setBody("");
          setFile(null);
        }}
        className="flex items-center space-x-3"
      >
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          placeholder={placeholder ? placeholder : "Post something..."}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="flex-1 p-2 h-[7vh] rounded bg-[#2222263f] focus:border-[#222226] focus:outline-none text-white placeholder-white"
        />
        <div className="flex flex-row gap-1">
          <button
            type="submit"
            className="bg-[#3c8baa] rounded-full h-[30px] w-[30px] flex font-medium text-white  text-lg"
            disabled={!body}
          >
            <span className="m-auto">►</span>
          </button>
          <label
            className={`${
              file ? "bg-orange-400" : "bg-[#3c8baa]"
            } rounded-full h-[30px] w-[30px] flex`}
          >
            <span className="m-auto">📎</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              hidden
            />
          </label>
        </div>
      </form>
    </div>
  );
}
