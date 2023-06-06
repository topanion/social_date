import Image from "next/image";
import { postTime } from "../../utils/time";
import { useRouter } from "next/router";

export default function Post({ post }) {
  const timeDiff = postTime(post.created_at);
  const image_source = post.user_id.avatar_url
    ? post.user_id.avatar_url
    : "/profile/blank.png";
  const router = useRouter();

  return (
    <div
      className="w-full flex flex-row gap-2 border-b px-2 py-4"
      onClick={() => router.push(`/post/${post.id}`)}
    >
      <div className="rounded-full w-fit max-w-[40px] max-h-[40px] overflow-hidden">
        <Image
          className="rounded-full"
          src={image_source}
          width={40}
          height={40}
          alt="profile pic"
        />
      </div>
      <div className="flex flex-col max-w-[80%]">
        <p>
          {post.user_id.username}{" "}
          <span className="text-gray-500"> - {timeDiff}</span>
        </p>
        <p className="text-sm text-gray-500 mt-2">{post.content}</p>
        <div className="w-full flex justify-between mt-2">
          <div className="flex flex-row gap-1 opacity-60">
            <Image
              src="/icons/comment.png"
              width={20}
              height={20}
              alt={"comment icon"}
            />
            {post.count === 0 ? "" : post.count}
          </div>
        </div>
      </div>
    </div>
  );
}
