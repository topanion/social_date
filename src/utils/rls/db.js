export const getAllFriends = async (user, supabase) => {
  const { data, error } = await supabase
    .from("user_friend")
    .select("*")
    .or("user1.eq." + user.id + ",user2.eq." + user.id);

  const allFriends = data.map((e) => {
    return e.user1 === user.id ? e.user2 : e.user1;
  });
  return allFriends;
};

export const getAllConv = async (user, supabase) => {
  const { data, error } = await supabase
    .from("conversation")
    .select("*, user1(*), user2(*)")
    .or("user1.eq." + user.id + ", user2.eq." + user.id);

  const allConversations = data.map((e) => {
    return {
      id: e.id,
      sender: user.id,
      receiver: e.user1.id === user.id ? e.user2 : e.user1,
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
    .select("*")
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
      user1: link.user2,
      user2: link.user1,
    });

  if (error) return error;
  else return data;
};
