import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import TestButton from "../tests/TestButton";
import { useRouter } from "next/router";

export default function PostDeleteModal({ post_id, close, username }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const deletePost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", post_id);

    if (error) console.log("error ! ", error);
    else router.push(`/${username}`);
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen bg-black/80 z-50 flex"
      onClick={() => close()}
    >
      <div
        className="m-auto w-[50%] rounded-xl p-3 bg-white flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="grow text-center">Options</p>
        <TestButton
          onClick={() => {
            setConfirmVisible(!confirmVisible);
          }}
        >
          Delete this post
        </TestButton>
        {confirmVisible && (
          <div className="flex flex-col gap-1">
            <p className="text-red-600 font-bold">
              Are you sure you want to delete this post ?
            </p>
            <div className="flex flex-row gap-1 justify-between">
              <div
                onClick={() => deletePost()}
                className="rounded-xl p-1 border bg-red-500 grow text-center hover:cursor-pointer hover:bg-red-700 text-white"
              >
                Yes
              </div>
              <div
                onClick={() => setConfirmVisible(false)}
                className="rounded-xl p-1 border bg-gray-200 grow text-center hover:cursor-pointer hover:bg-gray-500"
              >
                No
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
