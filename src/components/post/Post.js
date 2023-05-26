import Image from "next/image";

export default function Post({ post }) {
  const image_source = post.image_source
    ? post.image_source
    : "/profile/blank.png";

  return (
    <div className="w-full flex flex-row gap-2 rounded border p-3">
      <div className="rounded-xl w-fit">
        <Image src={image_source} width={30} height={30} alt="profile pic" />
      </div>
      <div className="flex flex-col max-w-[80%]">
        <p>{post.user_id.username}</p>
        <br />
        <p>{post.content}</p>
      </div>
    </div>
  );
}
