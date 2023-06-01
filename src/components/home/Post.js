import Image from "next/image";
import { postTime } from "../../utils/time";

export default function Post({ post }) {
  const timeDiff = postTime(post.created_at);
  const image_source = post.user_id.avatar_url
    ? post.user_id.avatar_url
    : "/profile/blank.png";

  return (
    <div className="w-full flex flex-row gap-2 border-b p-3">
      <div className="rounded-xl w-fit">
        <Image
          className="rounded-full"
          src={image_source}
          width={30}
          height={30}
          alt="profile pic"
        />
      </div>
      <div className="flex flex-col max-w-[80%]">
        <p>
          {post.user_id.username}{" "}
          <span className="text-gray-400"> - {timeDiff}</span>
        </p>
        <br />
        <p>{post.content}</p>
      </div>
    </div>
  );
}
