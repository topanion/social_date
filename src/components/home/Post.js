import Image from "next/image";
import { postTime } from "../../utils/time";
import { useRouter } from "next/router";
import ImagePreview from "../image/ImagePreview";

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
      <div className="flex flex-col max-w-[80%] grow gap-1">
        <p className="px-1">
          {post.user_id.username}{" "}
          <span className="text-gray-500"> - {timeDiff}</span>
        </p>
        <p className="px-1 text-sm text-gray-500">{post.content}</p>
        {post.image === true && (
          <div
            className="relative h-[20vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={post.link}
              fill
              alt={`image for post ${post.id}`}
              style={{ objectFit: "cover" }}
            />
            <ImagePreview source={post.link} />
          </div>
        )}
        <div className="w-full flex justify-between grow mt-2">
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
