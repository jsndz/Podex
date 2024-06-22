import { useSession } from "next-auth/react";
import Image from "next/image";
const PromptCart = ({ post, handleTagClick }) => {
  const { data: session } = useSession();
  return (
    <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
      <Image
        src={post?.creator?.image}
        alt="user_image"
        width={40}
        height={40}
        className="rounded-full object-contain"
      />

      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-gray-900">
          {post.creator?.username}
          {post.prompt}
        </h3>
      </div>
    </div>
  );
};

export default PromptCart;
