import Image from "next/image"

export default function LinkToConv({conversation, onClick}) {
    const image_source = conversation.receiver.avatar_url
    ? conversation.receiver.avatar_url
    : "/profile/blank.png";

    return (<div className="w-full flex gap-4 flex-row content-center p-2 hover:bg-gray-300 " onClick={onClick}>
        <Image className="rounded-full" src={image_source} width={40} height={40} alt="profile pic" />
<p className="my-auto text-lg font-bold">{conversation.receiver.username}</p>
    </div>)
}