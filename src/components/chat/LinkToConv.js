import Image from "next/image";
import UserIcon from "../tests/UserIcon";
import Ping from "../tests/Ping";

export default function LinkToConv({ conversation, onClick, user }) {
  const image_source = conversation.receiver.avatar_url
    ? conversation.receiver.avatar_url
    : "/profile/blank.png";

  return (
    <div
      className="relative w-full flex gap-4 flex-row content-center p-2 hover:bg-gray-300 "
      onClick={onClick}
    >
      {conversation.ping_for === user.id && (
        <Ping number={conversation.ping_nb} />
      )}
      <UserIcon source={image_source} />
      <p className="my-auto text-lg font-bold">
        {conversation.receiver.username}
      </p>
    </div>
  );
}
