export const createUpdateSubscription = (
  supabase,
  channelName,
  event,
  table,
  condition = "",
  onChange
) => {
  return supabase
    .channel(channelName)
    .on(
      "postgres_changes",
      {
        event: event,
        schema: "public",
        table: table,
        condition: condition,
      },
      () => {
        onChange();
      }
    )
    .subscribe();
};
