export const addLikeToPost = async (supabase, user_id, post_id) => {
  const { data, error } = await supabase
    .from("like")
    .insert({
      user_id: user_id,
      post_id: post_id,
    })
    .select();

  if (data) return data;
  else if (error) return error;
};

export const writeComment = async (supabase, text, user_id, post_id) => {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      user_id: user_id,
      post_id: post_id,
      text: text,
    })
    .select();

  if (data) return data;
  else if (error) return error;
};
