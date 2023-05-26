export const getAllFriends = async (user, supabase) => {
    const { data, error } = await supabase
      .from("user_friend")
      .select("*")
      .or("user1.eq." + user.id + ",user2.eq." + user.id);

    const allFriends = data.map((e) => {
      return e.user1 === user.id ? e.user2 : e.user1;
    });
    return(allFriends);
  };

  export const getAllConv = async (user, supabase) => {


    const {data,  error} = await supabase
    .from("conversation")
    .select("*, user1(*), user2(*)")
    .or("user1.eq." + user.id + ", user2.eq." + user.id);


    const allConversations = data.map((e) => {
        return ({
            id : e.id,
            sender : user.id,
            receiver: (e.user1.id === user.id ? e.user2 : e.user1)
        })
      });
      return(allConversations);
  }