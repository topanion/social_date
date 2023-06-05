import Image from "next/image";

export default function PostDisplay({ post, user }) {
  const image_source = user.avatar_url ? user.avatar_url : "/profile/blank.png";
  const time = new Date(post.created_at);
  const displayTime = time.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="w-[90%] flex flex-col gap-2 w-screen mx-auto mt-[5vh] border-b-2 p-3">
      <div className="flex flex-row gap-2">
        <div className="rounded-full max-w-[30px] max-h-[30px] overflow-hidden w-fit">
          <Image
            className="rounded-full"
            src={image_source}
            width={30}
            height={30}
            alt="profile pic"
          />
        </div>
        <p className="text-xl">{user.username} </p>
      </div>
      <div className="flex flex-col w-full">
        <p className="text-xl">{post.content}</p>
      </div>
      <div>{displayTime}</div>
    </div>
  );
}
