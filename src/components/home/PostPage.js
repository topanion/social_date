import Loading from "../tests/Loading";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import ReceiverBar from "../chat/ReceiverBar";
import React, { useState, useEffect } from "react";
import PostDisplay from "./PostDisplay";
import PostDisplayTop from "./PostDisplayTop";
import NewPost from "./NewPost";
import CommentList from "./CommentList";
import Navbar from "../Navbar";

export default function PostPage({ post_id }) {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [post, setPost] = useState(null);
  const [postWriter, setPostWriter] = useState(null);

  useEffect(() => {
    if (!post && !postWriter) {
      setFunction();
    }
  }, [post, postWriter]);

  const setFunction = async () => {
    const { data: postData } = await supabase
      .from("posts")
      .select("*")
      .eq("id", post_id)
      .single();

    setPost(postData);

    const { data: writerData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", postData.user_id)
      .single();
    setPostWriter(writerData);
  };

  const writeComment = async (content) => {
    const { data } = await supabase
      .from("comments")
      .insert({
        text: content,
        user_id: user.id,
        post_id: post.id,
      })
      .select("*")
      .single();

    if (data) return data;
  };

  return (
    <>
      {post && postWriter ? (
        <>
          <PostDisplayTop user={postWriter} />
          <PostDisplay post={post} user={postWriter} />
          <CommentList post_id={post.id} />
          <div className="fixed bottom-[6vh] bg-white w-full px-[5%]">
            <NewPost
              sendPost={writeComment}
              placeholder={"Write a comment..."}
              type="comments"
            />
          </div>
          <Navbar />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
