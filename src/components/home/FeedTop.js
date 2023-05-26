import Image from "next/image";

export default function FeedTop({user}) {
    const image_source = user.avatar_url
    ? user.avatar_url
    : "/profile/blank.png";

    return (
        <div className="fixed top-0 bg-white w-full p-2 border-b-2 flex flex-row gap-2 items-center">
        <Image className="rounded-full" src={image_source} width={40} height={40} alt="profile pic" />
<p>{user.username}</p>
        </div>
    )
}