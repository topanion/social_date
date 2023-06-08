import Image from "next/image";
import ImagePreview from "../image/ImagePreview";
import { postTime } from "../../utils/time";
import { useRouter } from "next/router";

export default function Comment({ comment }) {
  const timeDiff = postTime(comment.created_at);
  const image_source = comment.user_id.avatar_url
    ? comment.user_id.avatar_url
    : "/profile/blank.png";
  const router = useRouter();

  return (
    <div className="w-full flex flex-row gap-2 border-b p-3">
      <div
        onClick={() => router.push(`/${comment.user_id.username}`)}
        className="rounded-full max-w-[30px] max-h-[30px] overflow-hidden w-fit"
      >
        <Image
          className="rounded-full"
          src={image_source}
          width={30}
          height={30}
          alt="profile pic"
        />
      </div>
      <div className="flex flex-col max-w-[80%]">
        <div className="flex flew-row">
          <p>{comment.user_id.username} </p>
          <span className="text-gray-500 ml-1"> - {timeDiff}</span>
        </div>

        <p className="text-sm text-gray-500">{comment.text}</p>
        {comment.image === true && (
          <div
            className="relative h-[20vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={comment.link}
              fill
              alt={`image for post ${comment.id}`}
              style={{ objectFit: "cover" }}
            />
            <ImagePreview source={comment.link} />
          </div>
        )}
      </div>
    </div>
  );
}
