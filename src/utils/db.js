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
