import { useSession } from "next-auth/react";
import Image from "next/image";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation";
const PromptCart = ({ post, handleTagClick }) => {
  const { data: session } = useSession();
  const route = useRouter();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(copied);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  const handleProfile = () => {
    route.push(`/profile/${post?.creator?._id}`);
  };
  return (
    <div
      className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
      // onClick={handleProfile}
    >
      <Image
        src={post?.creator?.image}
        alt="user_image"
        width={40}
        height={40}
        className="rounded-full object-contain"
      />
      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-gray-900">
          <div>{post.creator?.username}</div>
          <div>{post.creator?._id}</div>
          <div onClick={handleCopy} className="h-6 w-6 text-gray-500">
            <DocumentDuplicateIcon />
          </div>
        </h3>
        <h3 className="font-satoshi font-semibold text-gray-900">
          {post.prompt}
        </h3>
      </div>{" "}
    </div>
  );
};

export default PromptCart;
