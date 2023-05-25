import Image from "next/image";

export default function Post({ post }) {
  if (!post) return <></>;

  console.log("post is ", post);

  const image_source = post.image_source
    ? post.image_source
    : "/profile/blank.png";

  return (
    <div className="w-full flex flex-row gap-2 rounded border p-3">
      <div className="rounded-xl w-fit">
        <Image src={image_source} width={40} height={40} />
      </div>
      <div className="flex flex-col">
        <p>{post.user_id.username}</p>
        <br />
        <p>{post.content}</p>
      </div>
    </div>
  );
}
