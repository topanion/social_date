import Image from "next/image";
import ImagePreview from "../image/ImagePreview";
import { useRouter } from "next/router";

export default function PostDisplay({ post, user }) {
  const router = useRouter();
  const image_source = user.avatar_url ? user.avatar_url : "/profile/blank.png";
  const time = new Date(post.created_at);
  const displayTime = time.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="w-[90%] flex flex-col gap-2 w-screen mx-auto mt-[5vh] border-b-2 py-3 px-5">
      <div className="flex flex-row gap-2">
        <div
          onClick={() => router.push(`/${user.username}`)}
          className="rounded-full max-w-[40px] max-h-[40px] overflow-hidden w-fit"
        >
          <Image
            className="rounded-full"
            src={image_source}
            width={40}
            height={40}
            alt="profile pic"
          />
        </div>
        <p className="text-xl">{user.username} </p>
      </div>
      <div className="flex flex-col">
        <p className="text-xl">{post.content}</p>
      </div>
      {post.image === true && (
        <div
          className="relative h-[40vh] rounded-xl overflow-hidden"
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
      <div>{displayTime}</div>
    </div>
  );
}
