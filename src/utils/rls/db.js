export const getAllFriends = async (user, supabase) => {
  const { data, error } = await supabase
    .from("user_friend")
    .select("*, profile1:profiles!user1(*), profile2:profiles!user2(*)")
    .or(
      "and(user1.eq." +
        user.id +
        ",status.eq.approved),and(user2.eq." +
        user.id +
        ",status.eq.approved)"
    );
  if (error) console.log(error);
  if (!data) return null;

  const allFriends = data.map((e) => {
    return e.user1 === user.id ? e.profile2 : e.profile1;
  });
  return allFriends;
};

export const getAllFriendsWithLinks = async (user, supabase) => {
  const { data, error } = await supabase
    .from("user_friend")
    .select("*, profile1:profiles!user1(*), profile2:profiles!user2(*)")
    .or(
      "and(user1.eq." +
        user.id +
        ",status.eq.approved),and(user2.eq." +
        user.id +
        ",status.eq.approved)"
    );
  if (error) console.log(error);
  if (!data) return null;

  const allLinks = data.map((e) => {
    return {
      link: e,
      friend: e.profile1.id === user.id ? e.profile2 : e.profile1,
    };
  });
  return allLinks;
};

export const getAllSuggestions = async (supabase, user) => {
  const { data: friends } = await supabase
    .from("user_friend")
    .select("*, profile1:profiles!user1(*), profile2:profiles!user2(*)")
    .or("user1.eq." + user.id + ",user2.eq." + user.id);

  const ids = friends.map((e) => {
    return e.user1 === user.id ? e.user2 : e.user1;
  });
  const withUser = [].concat(ids, user.id);

  const newArray = JSON.stringify(withUser).replace("[", "(").replace("]", ")");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .not("id", "in", newArray);

  if (error) {
    console.log(error);
    return error;
  }
  if (!data) return null;
  else return data;
};

export const getAllFriendRequests = async (user, supabase) => {
  const { data, error } = await supabase
    .from("user_friend")
    .select("*, profile1:profiles!user1(*), profile2:profiles!user2(*)")
    .match({ user2: user.id, status: "pending" });
  if (error) console.log(error);
  if (!data) return null;

  return data;
};

export const getAllConv = async (user, supabase) => {
  const { data, error } = await supabase
    .from("conversation")
    .select("*, profile1:profiles!user1(*), profile2:profiles!user2(*)")
    .or("user1.eq." + user.id + ", user2.eq." + user.id);

  const allConversations = data.map((e) => {
    return {
      id: e.id,
      sender: user.id,
      receiver: e.user1 === user.id ? e.profile2 : e.profile1,
      ping_for: e.ping_for,
      ping_nb: e.ping_nb,
    };
  });
  return allConversations;
};

export const getConversation = async (supabase, id1, id2) => {
  const { data, error } = await supabase
    .from("conversation")
    .select("*")
    .or(
      `and(user1.eq.${id2},user2.eq.${id1}),and(user1.eq.${id1},user2.eq.${id2})`
    )
    .single();
  if (error) return error;
  if (data) return data;
};

export const getUser = async (id, supabase) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (data) return data;
  else return null;
};

export const getProfileByUsername = async (supabase, username) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error) console.log("no user found with username");
  if (data) {
    return data;
  }
};

export const getProfileById = async (supabase, id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.log("no user found with id");
  if (data) {
    return data;
  }
};

export const checkFriendStatus = async (supabase, id1, id2) => {
  let { data, error } = await supabase
    .from("user_friend")
    .select("*, profile1:profiles!user1(*), profile2:profiles!user2(*)")
    .or(
      `and(user1.eq.${id2},user2.eq.${id1}),and(user1.eq.${id1},user2.eq.${id2})`
    );

  if (error) console.log(error.message);
  if (!data[0]) return null;
  else return data[0];
};

export const addFriend = async (supabase, id1, id2) => {
  const { data, error } = await supabase
    .from("user_friend")
    .insert({
      user1: id1,
      user2: id2,
      status: "pending",
    })
    .select()
    .single();

  if (error) return error;
  else return data;
};

export const acceptFriend = async (supabase, link) => {
  const { data, error } = await supabase
    .from("user_friend")
    .update({
      status: "approved",
    })
    .eq("id", link.id);

  const { data: newConvo, error: newError } = await supabase
    .from("conversation")
    .insert({
      user1: link.user2.id,
      user2: link.user1.id,
      user_friend_id: link.id,
    });

  if (error) return error;
  else return data;
};

export const declineFriend = async (supabase, link) => {
  const { data, error } = await supabase
    .from("user_friend")
    .delete()
    .eq("id", link.id);

  if (error) return error;
  else return data;
};

export const deleteFriend = async (supabase, id1, id2) => {
  const { data, error } = await supabase
    .from("user_friend")
    .delete()
    .or(
      `and(user1.eq.${id2},user2.eq.${id1}),and(user1.eq.${id1},user2.eq.${id2})`
    );

  if (error) return "bite";
  else return data;
};

export const setUsernameIfNull = async (supabase, user_id) => {
  const possibleUsername = user_id.slice(0, 12);
  const response = await supabase
    .from("profiles")
    .update({
      username: possibleUsername,
    })
    .eq("id", user_id)
    .filter("username", "is", "null")
    .select();
  return response;
};

export const uploadPostImage = async (supabase, file, post_id, type) => {
  const publicUrl =
    "https://stilftnvhmqkbysfvptr.supabase.co/storage/v1/object/public/image_posts/";

  const { data, error } = await supabase.storage
    .from("image_posts")
    .upload(
      `post_${post_id}.image.${file.name.substring(
        file.name.lastIndexOf(".") + 1
      )}`,
      file,
      { upsert: true }
    );
  if (error) return "error during upload";
  else {
    const {
      data: update,
      error: updateError,
      statusText,
    } = await supabase
      .from(type)
      .update({ image: true, link: `${publicUrl}${data.path}` })
      .eq("id", post_id)
      .select("*");

    console.log(statusText);
    if (updateError) {
      console.log("error is ", updateError);
      return updateError;
    } else if (update) {
      return update;
    }
  }
};
